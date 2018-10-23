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
			var url = "";
			if (item.exammode == 1)
			 {
			 	url = "html/sa/sa_partystyle.html"
			 }
			 else
			 {
			 	url = "html/sa/sa_partystyle2.html"
			 }
			var data = JSON.stringify(item);
			data = $summer.strToJson(data);
			summer.openWin({
				"id" : "sa_partystyle",
				"url" : url,
				"isKeep" : true,
				"pageParam" : {
					"count" : data,
				}
			});
		});
		
		
		//var url = "http://"+summer.getStorage("host")+"/partyconstrutproject/psexamsub/list";
		var url = getHttp()+"partyconstrutproject/psexamsub/list";
		summer.get(url, {
							}, {
							    "Content-Type" : "application/x-www-form-urlencoded", 
							},//url地址 
                function(response){//成功回调
                    var data = $summer.strToJson(response.data);
					if (data.success == "success") {
						jsonArray = data.detailMsg;
						var count = jsonArray.data.content.length;
						for (var k = 0; k < count; k++) {
							viewModel.data.push(jsonArray.data.content[k]);
						}
			
					} else {
						//$summer.alert("网络错误");
					}
				}, function(response) {//失败回调
					//$summer.alert("请求失败");
				});
	
}


function backClick(){
	summer.closeWin();
}