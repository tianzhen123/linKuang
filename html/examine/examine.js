var jsonArray_menu = [{"name":"待审批","type":"1","url":"infoMobile/approve"},
{"name":"已完成","type":"2","url":"infoMobile/finished"},{"name":"我发起的","type":"2","url":"infoMobile/createbyme"}];


var pageIndex = 0;
var viewModel;
var mescroll;
var curNavIndex=0;
var mescrollArr;
var swiper;
summerready = function(){
			viewModel = {
				data0:ko.observableArray([]),
				data1:ko.observableArray([]),
				data2:ko.observableArray([]),
				openWaitWin:function(data){
					console.log(data);
					summer.openWin({
						"id" : "waitExamine",
						"url" : "html/examine/waitExamine.html",
						"isKeep" : true,
						"pageParam" : {
							"content" : data,
						}
					});
				},
				openAlreadyWin:function(data){
					data.infocolumn_name = "已完成"
					var url = 'html/examine/examineDet.html'
					summer.openWin({
						"id" : "examineDet",
						"url" : url,
						"isKeep" : true,
						"pageParam" : {
							"count" : data			
						}
					});
				},
				openMyMin:function(data){
					data.infocolumn_name = "我发起的";
					summer.openWin({
						"id" : "newsPropaganda",
						"url" : "html/newsPropaganda/newsPropagandaDet.html",
						"isKeep" : true,
						"pageParam" : {
							"count" : data			
						}
					});
				}
			}
			
			ko.applyBindings(viewModel);
			
			var count = jsonArray_menu.length;
			
			for (var i = 0; i < count; i++) {
				var str;
				if(i){
					str='<li i="'+i+'">'+jsonArray_menu[i].name+'</li>';
				}else{
					str='<li class="active" i="'+i+'">'+jsonArray_menu[i].name+'</li>';
				}
				
				$('.header-list').append(str);
			}
			
			mescrollArr=new Array(3);//4个菜单所对应的4个mescroll对象
			
			//初始化首页
			mescrollArr[0]=initMescroll("mescroll0", "contentList0");
			
			/*初始化轮播*/
			swiper=new Swiper('#swiper', {
		        onTransitionEnd: function(swiper){
		        	var i=swiper.activeIndex;//轮播切换完毕的事件
		        	changePage(i);
			    }
		    });
		    
		    /*初始化菜单*/
			$("#nav ul li").click(function(){
				var i=Number($(this).attr("i"));
				swiper.slideTo(i);//以轮播的方式切换列表
			})
			
}
//var curNavIndex=0;
/*切换列表*/
var changeCount=0;
function changePage(i) {
	pageIndex = 0;
	if(curNavIndex!=i) {
		//更改列表条件
		var offsetArray = [];
		$("#nav ul li").each(function(n,dom){
			//console.log(dom.offsetLeft);
			offsetArray.push(dom.offsetLeft);
			if (dom.getAttribute("i")==i) {
				
				dom.classList.add("active");
			} else{
				dom.classList.remove("active");
			}
		})
		
		var screenWidth = window.innerWidth;
		var position = offsetArray[i] + screenWidth*0.333;
		if(position>=screenWidth){
			changeCount++;
			$('.header-list').scrollLeft(screenWidth*0.333);
		}
		if(i+1<=changeCount){
			changeCount--;
			$('.header-list').scrollLeft(-screenWidth*0.333);
		}
		
		//隐藏当前回到顶部按钮
		//mescrollArr[curNavIndex].hideTopBtn();
		//取出菜单所对应的mescroll对象,如果未初始化则初始化
		if(mescrollArr[i]==null){
			mescrollArr[i]=initMescroll("mescroll"+i, "contentList"+i);
		}
		//更新标记
		curNavIndex=i;
	}
}
			
/*创建MeScroll对象*/
function initMescroll(mescrollId,clearEmptyId){
	//创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;

		mescroll = new MeScroll(mescrollId, {
			//上拉加载的配置项
			down: {
						callback: function_pullDown //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
					},
			up: {
				callback: function_pullUp, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
				isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
				noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				empty: {
					icon: "", //图标,默认null
					tip: "暂无相关数据", //提示
					btntext: "", //按钮,默认""
					btnClick: ""
				},
				auto:false,
				clearEmptyId: clearEmptyId, //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
				lazyLoad: {
				        	use: true, // 是否开启懒加载,默认false
					        attr: 'data-echo', // 网络图片地址的属性名 (图片加载成功会自动移除改属性): <img imgurl='网络图  src='占位图''/>
					        showClass: 'mescroll-lazy-in', // 图片加载成功的显示动画: 渐变显示,参见mescroll.css
					        delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
					        offset: 200 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
				    	},	
				}
			});
			return mescroll;
}
function function_pullDown(){
	pageIndex = 0;
	mescroll.resetUpScroll(true);
	getListData(pageIndex);
}
function function_pullUp(page){
	var pageIndex = page.num-1;
	getListData(pageIndex);
}
function getListData(pageIndex){
	var viewmodel="";
	switch (curNavIndex) {
			case 0:
					viewmodel = viewModel.data0;
				break;
			case 1:
					viewmodel = viewModel.data1;
				break;
			case 2:
					viewmodel = viewModel.data2;
				break;
	}
	//联网加载数据
	var dataIndex=curNavIndex; //记录当前联网的nav下标,防止快速切换时,联网回来curNavIndex已经改变的情况;
	var usercode = summer.getStorage("usercode");
	var url = jsonArray_menu[dataIndex].url+"?userCode="+usercode+"";
	var requestid = ""+getHttpPro()+url;
	
	var json = {
		"pageIndex":pageIndex,
		"pageSize":10,
	}
	summer.get(requestid,json,
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				var ts = jsonArray.data.content[k].ts;
				jsonArray.data.content[k].ts2=getMyDate(ts);
			}
			var array = jsonArray.data.content;
			
			if (pageIndex == 0) {
				mescrollArr[curNavIndex].endSuccess(array.length,true);
		        for(var i=0;i<array.length;i++){
		        	viewmodel.push(array[i]);
		        }
		        
		    } else {
		    	mescrollArr[curNavIndex].endByPage((viewmodel()).length, jsonArray.data.totalPages);
		        viewmodel(viewmodel().concat(array));
		    	
		    }
			 
		    pageIndex++;
			
		} else {
			mescrollArr[curNavIndex].endErr();
		}
	}, function(response) {//失败回调
		mescrollArr[curNavIndex].endErr();
	});
}

function backClick(){
	summer.closeWin();
}
function getMyDate(str){
			//var oDate = new Date();  
            var oDate = new Date(str),
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
}
 //补0操作
function getzf(num){
	  if(parseInt(num) < 10){
	      num = '0'+num;  
	  }  
	  return num;  
}
function pictureInit(pic_url,curNavIndex){
	if(pic_url == null || pic_url.replace(/\s/g,'')==""){
		if(curNavIndex){
			pic_url = "../../img/placeholder.jpg";
		}else{
			pic_url = "../../img/pic_init.png";
		}
		
		return pic_url;
	}else{
		return pic_url;
	}
}