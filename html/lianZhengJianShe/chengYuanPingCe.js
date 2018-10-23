var ViewModel = function () {
                };	
var viewModel = new ViewModel();
summerready=function(){
		viewModel.data = ko.observableArray([]);
        ko.applyBindings(viewModel);
	
		var listview = UM.listview("#listview");

		listview.on("itemClick", function(sender, args) {
			//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
			var item = viewModel.data()[args.rowIndex];
			var data = JSON.stringify(item);
			data = $summer.strToJson(data);
			data.examtype = 2;
			summer.openWin({
				"id" : "selectPro",
				"url" : "html/lianZhengJianShe/selectPro.html",
				"isKeep" : true,
				"pageParam" : {
					"count" : data,
					"title" : "领导班子成员评测"
				}
			});
		});
		
		UM.showLoadingBar({
            "text" : "加载中",
            "icons" : "ti-loading"
        });
		var url = ""+getHttpPro()+"psexamsub/listPerson";
		summer.get(url, {
							}, {
							    "Content-Type" : "application/x-www-form-urlencoded", 
							},//url地址 
                function(response){//成功回调
                	UM.hideLoadingBar();
                    var data = $summer.strToJson(response.data);
					if (data.success == "success") {
						jsonArray = data.detailMsg;
						viewModel.data(jsonArray.data.content);
					} else {
						$summer.alert("网络错误");
					}
				}, function(response) {//失败回调
					UM.hideLoadingBar();
					$summer.alert("请求失败");
				});
	
}

function backClick(){
	summer.closeWin();
}