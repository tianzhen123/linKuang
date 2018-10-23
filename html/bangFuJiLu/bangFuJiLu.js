var ViewModel = function() {
	};
var viewModel = new ViewModel();//用于ko绑定
var jsonArray = [];//暂存传来的json数组，调用的时候容易，viewModel也可以（繁琐）
summerready = function() {
	viewModel.data = ko.observableArray(jsonArray);
 	myRefresh(0);
	//Knockout绑定

	ko.applyBindings(viewModel);

	var listview = UM.listview("#listview");

	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "bangFuJiLuXiangQing",
			"url" : "html/bangFuJiLuXiangQing/bangFuJiLuXiangQing.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data
			}
		});
	});
	
}

/**
 * 刷新 
 */
function myRefresh(type) {
	/**var url = "http://"+summer.getStorage("host")+"partyconstrutproject/message/list";**/
	//var url = "http://10.176.2.88:8080/partyconstrutproject/difficultymember/list";
	var url = getHttpPro()+"difficultymember/list";//yang_f
	//$summer.alert("获取列表");
	
	summer.get(url,{
		"pageIndex":0,
		"pageSize":20,
		"sortDirection":"desc",
		"sortField":"time"
	}, {
		"Content-Type" : "application/x-www-form-urlencoded",
	}, //url地址
	function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if(type==0){//
			viewModel.data.removeAll();
		}		
		//$summer.alert(data);
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
		$summer.alert("请求失败");
	});

}

function backClick(){
    //返回按钮
  	summer.closeWin({});  	
    } ;















