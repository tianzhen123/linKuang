var infocolumn = "20000";
var ViewModel = function () {
                };	
var viewModel = new ViewModel();
var pageIndex = 0;
var title="";
/*
 * 搜索功能兼容上拉下拉：（调用刷新，加了搜索参数）
 * 刷新参数设置：搜索条件、请求页、请求数量、排序字段、排序顺序
 * 其中搜索字段、请求页需要变动
 * 上拉：获取搜索条件，请求页+1
 * 下拉：获取搜索条件，请求页置为0
 * 搜索：获取搜索条件，请求页置为0
 */
summerready = function(){
		hp_slide();//滑动事件，放在最前面
		viewModel.data = ko.observableArray([]);
		
		
		ko.applyBindings(viewModel);
		
		var listview = UM.listview("#listview");

		listview.on("itemClick", function(sender, args) {
			//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
			var item = viewModel.data()[args.rowIndex];
			var data = JSON.stringify(item);
			data = $summer.strToJson(data);
			summer.openWin({
				"id" : "minShengDongTaiDet",
				"url" : "html/minShengDongTai/minShengDongTaiDet.html",
				"isKeep" : true,
				"pageParam" : {
					"count" : data,
					"pageTitle":pageTitle,
				}
			});
		});

	   hp_scroll();//引用上下拉方法
	   
	   getUserInfo2();//先获取用户，再刷新	
       	//刷新（停用）	
		/*title = "";
		netService(infocolumn,title,0);*/
	
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
	title = document.getElementById("sear").value;
	pageIndex = 0;
	netService(infocolumn,title,0);
}
/**
 * 上拉执行的方法
 */
function function_pullUp(){
	title = document.getElementById("sear").value;
	pageIndex = pageIndex+1;
	netService(infocolumn,title,1);
}

//搜索的方法
function searchClick(){
	title = document.getElementById("sear").value;
	pageIndex = 0;//请求页置为0
	netService(infocolumn,title,0);
}
//网络请求
function netService(infocolumn,title,type){
	flag_ko =0;
	var url = ""+getHttpPro()+"Api/info/list";
	//var url = "http://10.176.2.90:8080/partyconstrutproject/Api/info/list";
	
				summer.get(url, {
							    "infocolumn":infocolumn,
							    "title":title,
							    "pageIndex":pageIndex,
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
						jsonArray = data.detailMsg;
						var count = jsonArray.data.content.length;
						//setTimeout('hidden_pull()',5000); 
						for (var k = 0; k < count; k++) {
							var ts = jsonArray.data.content[k].ts;
							jsonArray.data.content[k].ts = getMyDate(ts);
							viewModel.data.push(jsonArray.data.content[k]);
						}
						
					} else {
						//$summer.alert("网络错误");
						
						//setTimeout('hidden_pull()',5000);  
					}
				}, function(response) {//失败回调
					//$summer.alert("请求失败");
					//setTimeout('hidden_pull()',5000); 
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
  function backClick(){
  	summer.closeWin({});
  }
  function getUserInfo2(){
	summer.setStorage("host", getHttp());
	
	var code = summer.pageParam.code;
	//姓名name
	//电话mobile
	var requestip = ""+getHttpPro()+"friendspaceadaptorcontroller/getUserinfo";
	summer.post(requestip,{"code":code},//可选参数，方便开发者设置请求的header
        {
        "Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
        }, 
    	function(response){//成功回调
        	var data = $summer.strToJson(response.data);
        	data = data.data;
			//summer.setStorage("userInfo", data);
			localStorage.setItem("userInfo",data);
			//刷新
			title = "";
			netService(infocolumn,title,0);
        },
    	function(response){ //失败回调
    	
    });
}