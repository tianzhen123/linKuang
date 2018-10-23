var ViewModel = function() {
};
var viewModel = new ViewModel();
//var jsonArray = [];
var pageIndex = 0;//起始页
var mobile;
summerready = function() {
	var userInfo = localStorage.getItem("userInfo");
	mobile = userInfo.mobile;
	
	hp_slide();//滑动事件，放在最前面
	
	viewModel.data = ko.observableArray([]);
	ko.applyBindings(viewModel);
	
	myRefresh(0);
	
	var listview = UM.listview("#listview");
	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "liuYanBanChaKan",
			"url" : "html/liuYanBan/liuYanBanChaKan.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data
			}
		});
	});
	listview.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		pageIndex = 0;
		myRefresh(0);
		sender.refresh();
	});
	
	
	listview.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		pageIndex = pageIndex+1;
		myRefresh(1);
		sender.refresh();
	});
	
}
function function_rightSlide(){
	summer.closeWin();
}

function myRefresh(type) {
	
	var url = ""+getHttpPro()+"message/list";
	
	//var url = "https://dj.lykyjt.com:8898/partyconstrutproject/message/list"
	
	summer.get(url, {
		"search_searchParam":mobile,	
		"pageIndex":pageIndex,
		"pageSize":20,
		"sortDirection":"desc",
		"sortField":"time"
	}, {
		"Content-Type" : "application/x-www-form-urlencoded",
	}, //url地址
	function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if(type==0){
			viewModel.data.removeAll();//清除
		}
		
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				var time = jsonArray.data.content[k].time;
				jsonArray.data.content[k].time = formatDate(Number(time));
				var ts = jsonArray.data.content[k].ts;
				jsonArray.data.content[k].ts = formatDate(ts);
					
				viewModel.data.push(jsonArray.data.content[k]);
			}
		
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert("请求失败");
		
	});

}
function formatDate(str) {
	var date = new Date(str);
	
    var seperator1 = "-";
    var seperator2 = ":";
   	var year =  date.getFullYear(); 
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    
    var currentdate = year + seperator1 + addZero(month) + seperator1 + addZero(strDate)
               + " " + addZero(strHours) + seperator2 + addZero(strMinutes) + seperator2 + addZero(strSeconds);
    
    
    return currentdate;
}
function addZero(time){
	if(parseInt(time) < 10){  
        time = '0'+time;  
     }  
     return time;
}
function backClick() {
	summer.closeWin({});
}

