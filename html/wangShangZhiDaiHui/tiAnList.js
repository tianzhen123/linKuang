var infocolumn = "";
var ViewModel = function () {
                };	
var viewModel = new ViewModel();
var pageIndex = 0;
var title="";
var _pageNum=0; 
summerready = function(){
				
		infocolumn = summer.pageParam.count;
		
		var pageTitle= summer.pageParam.pageTitle;
		
		viewModel.data = ko.observableArray([]);
			
        ko.applyBindings(viewModel);	
        
       	title = "";
       
		netService(infocolumn,title,0);
		
		 var listview = UM.listview("#listview");

		listview.on("itemClick", function(sender, args) {
			//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
			var item = viewModel.data()[args.rowIndex];
			var data = JSON.stringify(item);
			data = $summer.strToJson(data);
			summer.openWin({
				"id" : "zhiDaiHuiYiAn",
				"url" : "html/wangShangZhiDaiHui/zhiDaiHuiYiAn.html",
				"isKeep" : true,
				"pageParam" : {
					"count" : data,
					"pageTitle":pageTitle,
				}
			});
		});
		
		/**summer.window.setRefreshHeaderInfo({
            visible: true,
            textColor: '#4d4d4d',
            textDown: '放手啊，不想刷新别拉我(｡•ˇ‸ˇ•｡)',
            textUp: '够了啊，我赶着刷新呢(｡•ˇ‸ˇ•｡)',
            textDo: '别急，马上就好(｡•ˇ‸ˇ•｡)',
            showTime: false,
            style: "moli"     
    }, function (ret, err) {
                //从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
               _pageNum=0; 
               netService(infocolumn,title,0);
			  summer.refreshHeaderterLoadDone();
 	});**/
 	    /*上拉加载*/
    /**summer.setRefreshFooterInfo({
        visible: true,
	    textColor: '#4d4d4d',
	    textDown: '放手啊，不想刷新别拉我(｡•ˇ‸ˇ•｡)',
	    textUp: '够了啊，我赶着刷新呢(｡•ˇ‸ˇ•｡)',
	    textDo: '别急，马上就好(｡•ˇ‸ˇ•｡)',
	    showTime: false,
	    style: "moli"
    }, function (ret, err) {
    		_pageNum++;
        	 netService(infocolumn,title,1);
            summer.refreshFooterLoadDone();
    })**/
		listview.on("pullDown", function(sender) {
			//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
			title = "";
			pageIndex = 0;
			netService(infocolumn,title,0);
			sender.refresh();
		});
		
		
		listview.on("pullUp", function(sender) {
			//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
			title = "";
			pageIndex = pageIndex+1;
			netService(infocolumn,title,1);
			sender.refresh();
		});		
		
						
}

//搜索的方法
function searchClick(){
	title = document.getElementById("sear").value;
	netService(infocolumn,title,0);
}
//网络请求
function netService(infocolumn,title,type){
    /**var url = "http://192.168.1.110:9999/partyconstrutproject/proposalinfo/list";**/
	var url = getHttpPro()+"proposalinfo/list";
				summer.get(url, {
							    "infocolumn":infocolumn,
							    "title":title,
							    "pageIndex":_pageNum,
								"pageSize":10,
								"sortField":"ts",
								"sortDirection":"desc",
							}, {
							    "Content-Type" : "application/x-www-form-urlencoded", 
							},//url地址 
                function(response){//成功回调
                    var data = $summer.strToJson(response.data);
					if(type==0){//下拉刷新
						viewModel.data.removeAll();
					}
					if (data.success == "success") {
						jsonArray = data.detailMsg.data.content;
						var count = jsonArray.length;
						for (var k = 0; k < count; k++) {
							var ts = jsonArray[k].ts;
							jsonArray[k].ts = getMyDate(ts);
							viewModel.data.push(jsonArray[k]);
						}
			
					} else {
						//$summer.alert("网络错误");
					}
				}, function(response) {//失败回调
					//$summer.alert("请求失败");
				});
	
}

function getMyDate(str){  
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
        }; 
        //补0操作
  function getzf(num){  
      if(parseInt(num) < 10){  
          num = '0'+num;  
      }  
      return num;  
  }
