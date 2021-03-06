var ViewModel = function() {
	};
var viewModel = new ViewModel();
var searchType = "";
$(function() {
	/*导航更换js*/
	$('ul.um-tabbar-switch  Li').click(function() {
		$(this).addClass('active').siblings('.active').removeClass('active');
		var tar = $(this).attr('data-tar');
		$(tar).addClass('active').siblings('.active').removeClass('active');
		document.getElementById("sear").value = "";
		searchType = tar;
		refush(tar);
	});

	//Knockout绑定
	
	/*渲染的数据*/
	var jsonArray = [];

	viewModel.data = ko.observableArray(jsonArray);
	viewModel.data2 = ko.observableArray(jsonArray);
	viewModel.data3 = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel);

	var listview = UM.listview("#listview");
	var listview2 = UM.listview("#listview2");
	var listview3 = UM.listview("#listview3");

	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "shuZhiShuZePingFen",
			"url" : "html/shuZhiShuZe/shuZhiShuZePingFen.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data
			}
		});
	});
	listview2.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data2()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "shuZhiShuZeXQ",
			"url" : "html/shuZhiShuZe/shuZhiShuZeXQ.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data
			}
		});
	});
	listview3.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		/*新闻详情页面的渲染*/
		var item = viewModel.data2()[args.rowIndex];
		var data = JSON.stringify(item);
		 data = $summer.strToJson(data);
		if(data.status == 0 || data.status=="0"){
					summer.openWin({
					"id" : "shuZhiShuZePingFen",
					"url" : "html/shuZhiShuZe/shuZhiShuZePingFen.html",
					"isKeep" : true,
					"pageParam" : {
						"count" : data
					}
				});
		}else{
				summer.openWin({
					"id" : "shuZhiShuZeXQ",
					"url" : "html/shuZhiShuZe/shuZhiShuZeXQ.html",
					"isKeep" : true,
					"pageParam" : {
						"count" : data
					}
				});
		}
	});

	var requestid = ""+getHttpPro()+"debriefingMobile/list";
	
	var json = {
		"billstatus" : "0"
	}
	
	/**
	summer.post(requestid,  json , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		$summer.alert(response);
		var data = $summer.strToJson(response.data);
		viewModel.data.removeall();
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				viewModel.data.push(jsonArray.data.content[k]);
			}

		} else {
			$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		$summer.alert("网络错误");
	});
	**/
	searchType = ".news";
	refush(".news");

});

/**
 * 点击选项卡之后的请求操作
 * @param {Object} button
 */
function refush(button) {

	var requestid = ""+summer.getStorage("host")+"partyconstrutproject/debriefingMobile/list";

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
			case ".game":
					type = 2;
					viewmodel = viewModel.data3;
				
				break;
	}
	var json = {
		"billstatus" : type
	}
	summer.post(requestid, json , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		viewmodel.removeAll();
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				viewmodel.push(jsonArray.data.content[k]);
			}

		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert(response);
	});

}
//搜索事件
function searchClick(){
	var requestid = "http://10.176.2.185:9999/partyconstrutproject/debriefingMobile/list";

	var viewmodel = "";
	
	var type = 0;

	switch (searchType) {
			case ".news":
					type=0;
					viewmodel = viewModel.data;
				
				break;
			case ".product":
					type = 1;
					viewmodel = viewModel.data2;
				
				break;
			case ".game":
					type = 2;
					viewmodel = viewModel.data3;
				
				break;
	}
	var parameter = document.getElementById("sear").value;
	var json = {
		"billstatus" : type,
		"queryCond" : parameter,
	}
	summer.post(requestid, json , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		viewmodel.removeAll();
		$summer.alert(data);
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				viewmodel.push(jsonArray.data.content[k]);
			}

		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert(response);
	});
	
}
