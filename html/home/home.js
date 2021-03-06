﻿var reg = registID();
summerready = function () {

			var flag = 0,//判断下拉刷新
			userInfo=summer.getStorage("lk_userInfo");
			$('.um-list').hide();
			$('.item-list').hide();
				
			var mescroll = new MeScroll("mescroll", {
				down: {
					auto: true, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
					callback: downCallback //下拉刷新的回调
				},
				up: {
						lazyLoad: {
				        	use: true, // 是否开启懒加载,默认false
					        attr: 'data-echo', // 网络图片地址的属性名 (图片加载成功会自动移除改属性): <img imgurl='网络图  src='占位图''/>
					        showClass: 'mescroll-lazy-in', // 图片加载成功的显示动画: 渐变显示,参见mescroll.css
					        delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
					        offset: 200 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
				    	}
					}
				
			});
			
			app.initialize(); //注册推送服务
			/*下拉刷新的回调 */
			function downCallback(){
				//联网加载数据
				//flag <1 ? getList(): getNewsList();
				getList();
			}
				
             var jsonArray_menu = [],jsonArray_list = [];
                  
            	/*列表 start*/
                //Knockout绑定
	            
               var shopModal = function() {
					var self = this;
					self.data_menu = ko.observableArray(jsonArray_menu);
					
					itemClick= function(data, e){
						 
						 var itemData = data;
						summer.openWin({
                            "id" : itemData.url,
                            "url" : itemData.url,
                            "pageParam" : {
                                "param" : itemData
                            }
                        });						 
					}
					
					moreClick= function(data, e){
						
						var itemData = data;
						summer.openWin({
                            "id" : itemData.url,
                            "url" : itemData.url,
                            "pageParam" : {
                                "param" : itemData
                            }
                        });	
						event.stopPropagation();
					}
					
					listItemClick=function(data, e){
						if(data.infoData == null ||data.infoData == undefined || data.infoData == "undefined"){
							return;
						}
						data.infoData.pageTitle = data.name;
	        			   summer.openWin({
	                           "id" : "newsPropagandaDet",
	                           "url" : "html/newsDet/newsPropagandaDet.html",
	                           "pageParam" : {
	                               "param" : data.infoData
	                           }
	                       });
					}
					
				}
				var viewModel = new shopModal();
        			viewModel.data_list = ko.observableArray(jsonArray_list);
				viewModel.data_menu = ko.observableArray(jsonArray_menu);
				ko.applyBindings(viewModel);
			
				
			/**请求列表信息**/
			function getList(){
               var requestMain = getHttpPro()+"resource/moblieUrl"; 
               summer.ajax({
                   "header":{Authorization: "OAuth2: token"},//可选参数，方便开发者设置请求的header
                   "type":"post",//请求方式
                   "url":requestMain,//url地址
                   "param":{user:userInfo},//可选参数，post请求的要写入的条件数据，须为json对象 
               }, function(response){//成功回调
               		flag++;
               		var data = $summer.strToJson(response.data);
                   	viewModel.data_menu.removeAll();
	                var menus = data.data1;
	                menus.sort(compare('sort'));
	                
					var list = menus.slice(0,8);
					viewModel.data_menu(menus);
					mescroll.endSuccess();
					$('.item-list').show();
	                loadSlider();
	                getNewsList();
               }, function(response){//失败回调
                   mescroll.endErr();
                   summer.toast({
                        "msg" : "加载失败" 
                   })
               });
        	}
    		//获取新闻列表
			function getNewsList(){
			
				var requestIp = getHttpPro()+"resource/moblieData";	
				
				summer.ajax({
                    "header":{Authorization: "OAuth2: token"},//可选参数，方便开发者设置请求的header
                    "type":"post",//请求方式
                    "url":requestIp,//url地址
                    "param":{user:userInfo},//可选参数，post请求的要写入的条件数据，须为json对象 
                }, function(response){//成功回调
                    var data = $summer.strToJson(response.data);
                    mescroll.endSuccess();
                    viewModel.data_list(data.data);
					$('.um-list').show();
                }, function(response){//失败回调
                    mescroll.endErr();
					summer.toast({
                        "msg" : "加载失败" 
                   })
                });
			}
        		
}
            
function loadSlider (){
	/*图标 start*/
	 var slider = Swipe(document.getElementById('slider'), {
	    startSlide: 0,  //起始图片切换的索引位置
		auto: false, //设置自动切换时间，单位毫秒
		continuous: false,  //无限循环的图片切换效果
		disableScroll: false,  //阻止由于触摸而滚动屏幕
		stopPropagation: false,  //停止滑动事件
		callback: function(index, element) {},  //回调函数，切换时触发
		transitionEnd: function(index, element) {}  //回调函数，切换结束调用该函数。
	});
	/*图标 end*/	
}

/**
 *	格式化服务器传来的时间
 */
function formatDate(str) {
	var date = new Date(str);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    
   	//拼时间
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + addZero(strDate);
              //  + " " + addZero(strHours) + seperator2 + addZero(strMinutes) + seperator2 + addZero(strSeconds);
    return currentdate;
}
/**
 * 时间为单位数时,前面加0
 */
function addZero(time){
	if(parseInt(time) < 10){
        time = '0'+time;  
     }  
     return time;
}

function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function nofind(_this,type){
    src = "../../img/placeholder.jpg"
    _this.src = src
    _this.onerror=null;
}
function nofind2(_this,type){
    src = "../../img/icon_placeholder.png"
    _this.src = src
    _this.onerror=null;
}
