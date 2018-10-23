var ViewModel = function() {
	};
var viewModel = new ViewModel();
var searchType = "";//选项卡
var pageIndex = 0;//访问页
var parameter = "";//搜索条件
summerready=function(){
	hp_slide();//滑动事件，放在最前面
	/*导航更换js*/
	$('ul.um-tabbar-switch  Li').click(function() {
		$(this).addClass('active').siblings('.active').removeClass('active');
		var tar = $(this).attr('data-tar');
		$(tar).addClass('active').siblings('.active').removeClass('active');
		document.getElementById("sear").value = "";
		searchType = tar;
		parameter = "";
		pageIndex = 0;
		refush(tar,parameter,0);
	});

	//Knockout绑定
	
	/*渲染的数据*/
	var jsonArray = [];

	viewModel.data = ko.observableArray(jsonArray);
	viewModel.data2 = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel);

	var listview = UM.listview("#listview");
	var listview2 = UM.listview("#listview2");

	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "lvZhiLvZePingFen",
			"url" : "html/lvZhiLvZePingFen/lvZhiLvZePingFen.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data
			}
		});
	});
	/*
	listview.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		pageIndex = 0;
		parameter = document.getElementById("sear").value;
		refush(".news",parameter,0);
		sender.refresh();
	});
      		
	listview.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		pageIndex = pageIndex+1;
		parameter = document.getElementById("sear").value;
		refush(".news",parameter,1);
		sender.refresh();
	});
	*/
	listview2.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data2()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "lvZhiLvZeXQ",
			"url" : "html/lvZhiLvZeXQ/lvZhiLvZeXQ.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data
			}
		});
	});
	/*
	listview2.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		pageIndex = 0;
		parameter = document.getElementById("sear").value;
		refush(".product",parameter,0);
		sender.refresh();
	});
        		
	listview2.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		pageIndex = pageIndex+1;
		parameter = document.getElementById("sear").value;
		refush(".product",parameter,1);
		sender.refresh();
	});
	*/
	searchType = ".news";
	refush(".news",parameter,0);
	
	hp_scroll();

}
/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}

/**
 * 下拉执行的方法
 */
function function_pullDown(){
	parameter = document.getElementById("sear").value;
	pageIndex = 0;
	refush(searchType,parameter,0);
}
/**
 * 上拉执行的方法
 */
function function_pullUp(){
	parameter = document.getElementById("sear").value;
	pageIndex = pageIndex+1;
	refush(searchType,parameter,1);
}

//搜索事件
function searchClick(){
	parameter = document.getElementById("sear").value;
	pageIndex = 0;
	refush(searchType,parameter,0);
}
/**
 * 点击选项卡之后的请求操作
 * @author tianzhen
 * @param {Object} button
 * 
 */
function refush(button,parameter,load) {
	//$summer.alert(button+"\n"+parameter+"\n"+pageIndex);
	var requestid = ""+getHttpPro()+"performdutyMobile/list";
	
	var viewmodel = "";
	var type = 0;

	switch (button) {
			case ".news":
					type=0;
					viewmodel = viewModel.data;
				
				break;
			case ".product":
					type = 1;
					viewmodel = viewModel.data2;
				
				break;
	}
	var json = {
		"performstatus" : type,
		"queryCond" : parameter,
		"pageIndex":pageIndex,
		"pageSize":30,
		"sortField":"ts",
		"sortDirection":"desc",
	}
	summer.post(requestid, json , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if(load == 0){
			viewmodel.removeAll();
		}
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				viewmodel.push(jsonArray.data.content[k]);
			}
			//$summer.alert(jsonArray.data.content);
			//$summer.alert(viewmodel());
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert(response);
	});

}


function backClick(){
	summer.closeWin();
}
