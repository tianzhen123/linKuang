var ViewModel = function() {};	
var viewModel = new ViewModel();
var searchType = "";
var pageIndex = 0;
var tp = "";//搜索内容
summerready = function() {
	hp_slide();//滑动事件，放在最前面
	/*导航更换js*/
	 $('ul.um-tabbar-switch  Li').click(function(){
		$(this).addClass('active').siblings('.active').removeClass('active');
		var tar=$(this).attr('data-tar');
		$(tar).addClass('active').siblings('.active').removeClass('active');
	    document.getElementById("sear").value = "";
		searchType = tar;
		pageIndex=0;
		tp = "";
	    refush(tar,tp,0);
	    listview.config.pullUpEnable=ture;
	    listview2.config.pullUpEnable=ture;
	 });  
                 
                 

	var jsonArray = [];
	viewModel.data=ko.observableArray(jsonArray);
    ko.applyBindings(viewModel);   
    
    searchType = ".news";
    refush(".news",tp,0); 
    
    var listview = UM.listview("#listview");
	var listview2 = UM.listview("#listview2");
	/*var listview3 = UM.listview("#listview3");*/
    
    

    //添加控件方法
    listview.on("itemClick", function (sender, args) {                       
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "xianJinLaoMoXiangQing",
			"url" : "html/xianJinLaoMo/xianJinLaoMoXiangQing.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data			
			}
		});
		});
		
		
   listview2.on("itemClick", function (sender, args) {                       
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "xianJinLaoMoXiangQing",
			"url" : "html/xianJinLaoMo/xianJinLaoMoXiangQing.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data			
			}
		});
		});
	/*	
    listview3.on("itemClick", function (sender, args) {                       
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "xianFengTeamXiangQing",
			"url" : "html/xianFengTeam/xianFengTeamXiangQing.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data			
			}
		});
		});
		
	 */
    
    listview.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		pageIndex = 0;
		tp = document.getElementById("sear").value;
		refush(searchType,tp,0);
		sender.refresh();
	});
        		
	listview.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		pageIndex = pageIndex+1;
		tp = document.getElementById("sear").value;
		refush(searchType,tp,1);
		sender.refresh();
	});
	
    listview2.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		pageIndex = 0;
		tp = document.getElementById("sear").value;
		refush(searchType,tp,0);
		sender.refresh();
	});
        		
	listview2.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		pageIndex = pageIndex+1;
		tp = document.getElementById("sear").value;
		refush(searchType,tp,1);
		sender.refresh();
	});	
	/*
    listview3.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		pageIndex = 0;
		tp = document.getElementById("sear").value;
		refush(searchType,tp,0);
		sender.refresh();
	});
        		
	listview3.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		pageIndex = pageIndex+1;
		tp = document.getElementById("sear").value;
		refush(searchType,tp,1);
		sender.refresh();
	});
	*/
}
/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}
function searchClick(){
	tp = document.getElementById("sear").value;
	pageIndex = 0;
	refush(searchType,tp,0)
} 
	
function refush(button,tp,load) {
	var requestid = ""+getHttpPro()+"xjlaomo/list";
	var viewmodel =viewModel.data;
	var type = 1;
	switch (button) {
			case ".news":
					type = 1;//劳动模范
			break;
			case ".product":
					type = 2;//先进个人
			break;
			/*case ".game":
					type = 3;
			break;*/
	}
	var json = {
				"search_param": type,
				"search_searchParam":tp,
				"pageIndex":pageIndex,
				"pageSize":30,
				}
	//summer.get(requestid, {"json":json} , //可选参数，方便开发者设置请求的header
	summer.get(requestid,json,
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		console.log(data);		
		if(load == 0){
			viewmodel.removeAll();
		}
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				var huodeshijian=new Date(jsonArray.data.content[k].huodeshijian);
				jsonArray.data.content[k].huodeshijian=huodeshijian.toLocaleDateString();
				
				var tupian=jsonArray.data.content[k].tupian;
				jsonArray.data.content[k].tupian=pictureInit(tupian);//无图片，显示默认图片
				
				viewmodel.push(jsonArray.data.content[k]);
			}
			//$summer.alert(viewmodel());
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert(response);
	});

}    

    	
function backClick(){
  	summer.closeWin({});
}
