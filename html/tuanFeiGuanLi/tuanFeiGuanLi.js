var ViewModel = function() {
};
var viewModel = new ViewModel();
var jsonArray = [];
var pageIndex = 0;
var pageSize = 20;
summerready = function() {
	hp_slide();//滑动事件，放在最前面
	init();


	viewModel.data = ko.observableArray([]);
	
	refresh(0);
	ko.applyBindings(viewModel);
	
	var listview = UM.listview("#listview");
	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		currentRowIndex = args.rowIndex;
		summer.openWin({
			"id" : "tuanFeiXiangQing",
			"url" : "html/tuanFeiGuanLi/tuanFeiXiangQing.html",
			"isKeep" : true,
			"addBackListener":true,
			"pageParam" : {				
				"currentRowIndex" : args.rowIndex,
				"timeOfSelected" : getTimeOfSelected(),
				"jsonArray":jsonArray,
				"pageIndex":pageIndex,
				"pageSize":pageSize,
			}
		});
	});	
	
	listview.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		title = "";
		pageIndex = 0;
		refresh(0);
		sender.refresh();
	});
	
	
	listview.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		title = "";
		pageIndex = pageIndex+1;
		refresh(1);
		sender.refresh();
	});
	
}

function function_rightSlide(){
	summer.closeWin();
}

function refresh(type) {
	var temp = $("#time").val();
	var time = time_substr(temp);
	//$summer.alert(time);
	
	//var url = "http://10.176.2.69:8080/partyconstrutproject/fee/list";
	
	var url = ""+getHttpPro()+"fee/list";
	
	
	//获取列表
	summer.get(url, {
		"search_def2":time,//查询条件为  时间
		
		"pageIndex":pageIndex,//分页
		"pageSize":pageSize,
	}, {
		"Content-Type" : "application/x-www-form-urlencoded",
	}, //url地址
	function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if(type==0){
			viewModel.data.removeAll();
			jsonArray = [];
		}
		if (data.success == "success") {
			var temp_jsonArray = data.detailMsg.data.content;
			var count = temp_jsonArray.length;
			for (var k = 0; k < count; k++) {
				viewModel.data.push(temp_jsonArray[k]);
				jsonArray.push(temp_jsonArray[k]);
			}
			//$summer.alert(viewModel.data());
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert("请求失败");
	});
}

function init(){
	/*初始化时间*/
	var time = getCurrentDate();
	$('#time').attr("value",time);
}

function getCurrentDate() {
	var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
   	//拼时间
    var currentdate = date.getFullYear() + "年" + addZero(month) + "月"; 
    return currentdate;
}
function addZero(time){
	if(parseInt(time) < 10){  
        time = '0'+time;  
     }  
     return time;
}



/**
 *关闭窗口
 */
function backClick() {
	summer.closeWin({});
}

