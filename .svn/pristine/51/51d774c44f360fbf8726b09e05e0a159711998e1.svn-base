var ViewModel = function() {};	
var viewModel = new ViewModel();
var searchType = "";
var pageIndex = 0;
var tp = "";//搜索内容
summerready = function() {
	hp_slide();//滑动事件，放在最前面

	var jsonArray = [];
	viewModel.data=ko.observableArray(jsonArray);
    ko.applyBindings(viewModel);   
    
    var listview = UM.listview("#listview");
    //添加控件方法
    listview.on("itemClick", function (sender, args) {                       
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "tuanYuanTuiYouXiangQing",
			"url" : "html/tuanYuanTuiYou/tuanYuanTuiYouXiangQing.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data			
			}
		});
	});
    listview.on("pullDown", function(sender) {
		//这是可以编写列表下拉加载逻辑，参数sender即为当前列表实例对象
		param = document.getElementById("sear").value;
		pageIndex = 0;
		loadData(param,0);
		sender.refresh();
	});
	listview.on("pullUp", function(sender) {
		//这是可以编写列表上拉刷新逻辑，参数sender即为当前列表实例对象
		param = document.getElementById("sear").value;
		pageIndex = pageIndex+1;
		loadData(param,1);
		sender.refresh();
	});
	param = "";
	loadData(param,0);
}
/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}
function searchClick(){
	param = document.getElementById("sear").value;
	pageIndex = 0;
	loadData(param,0);
}
	
function loadData(param,type){
	//$summer.alert(param+"\n"+pageIndex);
	var url = ""+getHttpPro()+"excellentTuanYuan/list";
	summer.get(url, {
		"pageIndex":pageIndex,
		"pageSize":10,
		"search_searchParam":param,
	}, {
		"Content-Type" : "application/json;charset=utf-8",
	}, function(response) {
		if(type==0){
			viewModel.data.removeAll();
		}
		var argsResultjson = $summer.strToJson(response.data);
		var projectjson = argsResultjson.detailMsg.data;
		for (var k = 0; k < projectjson.content.length; k++) {
			
			var photo=projectjson.content[k].photo;
			projectjson.content[k].photo=pictureInit(photo);//无图片，显示默认图片
			
			viewModel.data.push(projectjson.content[k]);
		}
		//$summer.alert(viewModel.data());
	}, function(response) {
		//$summer.alert(response);
	});
}

    	
function backClick(){
  	summer.closeWin({});
}

