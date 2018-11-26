var ViewModel = function () {
                };	
var viewModel = new ViewModel();
var pageIndex,type,mescroll,param;
function nofind(_this,type){
    src = "../../img/placeholder.jpg"
    _this.src = src
    _this.onerror=null;
}
summerready = function(){
		param = summer.pageParam.param;
		type = summer.pageParam.type;
		var pageTitle= param.name;
		document.getElementById("pageTitle").innerHTML = pageTitle;
		
		viewModel ={
			data:ko.observableArray([]),
			totalPage : ko.observable(1),
			openWin:function(data){
				console.log(data);
				if(type*1 ==1){//已审批
					data.infocolumn_name = pageTitle;
					summer.openWin({
						"id" : "newPropagandaDet",
						"url" : "html/newsPropaganda/newsPropagandaDet.html",
						"isKeep" : true,
						"pageParam" : {
							"count" : data,
						}
					});
				}else{
					if(param.tag == 'cgx'){
						summer.openWin({
							"id" : "editNews",
							"url" : "html/xuanChuanFaBu/editNews.html",
							"isKeep" : true,
							"addBackListener":"true",
							"pageParam" : {
								"type" : "edit",
								"content" : data,
								"pageTitle":pageTitle,
							}
						});
					}else{//待审批
						data.infocolumn_name = pageTitle;
						summer.openWin({
							"id" : "newPropagandaDet",
							"url" : "html/newsPropaganda/newsPropagandaDet.html",
							"isKeep" : true,
							"pageParam" : {
								"count" : data,
							}
						});
					}
				}
			}
		};
		ko.applyBindings(viewModel);
		
	 	mescroll = new MeScroll("mescroll", {//第一个参数"mescroll"对应上面布局结构div的id
       		//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
       		//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
			down: {
					callback: function_pullDown //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
				},
			up: {
				callback: upCallback , //上拉加载的回调
				isBounce: false, //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
				noMoreSize:4,
				empty: {
							icon: "", //图标,默认null
							tip: "暂无相关数据", //提示
							btntext: "", //按钮,默认""
							btnClick: ""
						},
				auto:false,
				clearEmptyId: "dataList",
				lazyLoad: {
				        	use: true, // 是否开启懒加载,默认false
					        attr: 'data-echo', // 网络图片地址的属性名 (图片加载成功会自动移除改属性): <img imgurl='网络图  src='占位图''/>
					        showClass: 'mescroll-lazy-in', // 图片加载成功的显示动画: 渐变显示,参见mescroll.css
					        delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
					        offset: 200 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
				    	},
			}
		});
}

//上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
function upCallback(page) {
	pageIndex = page.num-1;
	netService();
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
	pageIndex = 0;
	mescroll.resetUpScroll(true);
	netService();
}

/**
 * 上拉执行的方法
 */
function function_pullUp(){
	netService();
}

//网络请求
function netService(){
	var usercode = summer.getStorage("usercode");
	var url;
	if(type*1 == 1){
		url = getHttpPro()+"infoMobile/ylist?userCode="+usercode+"&infocolumn="+param.infocolumn+"&pageIndex="+pageIndex+"&pageSize=10&sortField=ts&sortDirection=desc";
	}else{
		url = getHttpPro()+"infoMobile/mlist?userCode="+usercode+"&tag="+param.tag+"&pageIndex="+pageIndex+"&pageSize=10&sortField=ts&sortDirection=desc";
	}
				summer.get(url, {}, {
							    "Content-Type" : "application/x-www-form-urlencoded", 
							},//url地址 
                function(response){//成功回调
                    var data = $summer.strToJson(response.data);
					if (data.success == "success") {
						
						dsp = data.detailMsg.data.dsp;
						var count = dsp.content.length;
						viewModel.totalPage(dsp.totalPages);
						/**
						for (var k = 0; k < count; k++) {
							var ts = dsp.content[k].ts;
							//var ts = jsonArray.data.content[k].publishtime;
							dsp.content[k].publishtime = getMyDate(ts);
							//jsonArray.data.content[k].fimage = jsonArray.data.content[k].fimage == null?"../../img/placeholder.jpg":jsonArray.data.content[k].fimage;//添加默认图片
						}
						**/
						var array = dsp.content;
						if (pageIndex == 0) {
							mescroll.endSuccess(array.length,true);
					        viewModel.data(array);
					    } else {
					        viewModel.data(viewModel.data().concat(array));
					    	mescroll.endByPage((viewModel.data()).length, viewModel.totalPage());
					    }
						 
					} else {
						mescroll.endErr();
					}
				}, function(response) {//失败回调
					mescroll.endErr();
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
	if(param.tag == 'cgx'){
		var jsfun = 'netWork();';
		summer.execScript({
		    winId: 'html/xuanChuanFaBu/xuanChuanFaBu.html',
		    script: jsfun
		});
	}
  	summer.closeWin({});
}
