var jsonArray_menu = [];
var list = [];

var data,viewModel,mescroll,pageIndex = 0,flag = false;
summerready = function (){
		var param = summer.pageParam.param;//二级header显示文字
		console.log(param);
		window.id = param.id;
		$("#pageTitle").text(param.name);
		var imgUrl;
		switch(param.id*1){
			case 117:imgUrl = '../../img/jiJian_banner.png';break;
			case 112:imgUrl = '../../img/gQT_banner.png';break;
			default: imgUrl = '../../img/dx.png';break;
		}
		$('.banner').attr('src',imgUrl);
		mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
       		//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
       		//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
			down: {
					callback: pullDown //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
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
		
		viewModel = {
			data_menu : ko.observableArray([]),
			newsArray : ko.observableArray(),
			totalPage : ko.observable(5),
			itemClick : function(data,e){
				var string = data.url;//html/newsPropaganda/newsPropaganda.html
				var arry = string.split("/");//html newsPropaganda newsPropaganda.html
				var arry2 = arry[2].split(".");//newsPropaganda html
				var win_id = arry2[0];//newsPropaganda
				 summer.openWin({
		         	"id" : win_id,
		        	"url" : data.url,
		        	"isKeep" : true,
		        	"pageParam" : {
		        		"param" : data,
			            "infocolumn" :data.infocolumn,// 需求 传
	            		"pageTitle":data.name,// 需求 传
	    			},
				});
			},
			openWin : function(data){
				summer.openWin({
                   "id" : "newsPropagandaDet",
                   "url" : "html/newsDet/newsPropagandaDet.html",
                   "pageParam" : {
                       "param" : data
                   }
               });
			}
		}
		ko.applyBindings(viewModel);
}

function upCallback(page){
	pageIndex = page.num-1;
	function_pullUp();
}
/**
 * 下拉执行
 */
function pullDown(){
	pageIndex = 0;
	flag = false;
	mescroll.resetUpScroll(true);
	function_pullUp();
}

/**
 * 上拉执行的方法
 */
function function_pullUp(){
	flag ? getNewsList() : getIcon();
}
/**请求获取二级应用图标**/
function getIcon(){
	
        var requestMain = getHttpPro()+"resource/moblieUrl/"+window.id;  
        
		var userInfo=summer.getStorage("lk_userInfo");
		summer.ajax({
                   "header":{Authorization: "OAuth2: token"},//可选参数，方便开发者设置请求的header
                   "type":"post",//请求方式
                   "url":requestMain,//url地址
                   "param":{user:userInfo},//可选参数，post请求的要写入的条件数据，须为json对象 
               }, function(response){//成功回调
               		var data = $summer.strToJson(response.data);
               		jsonArray_menu = data.data;
				   viewModel.data_menu(jsonArray_menu);
				   flag = true;
				   getNewsList();
				   mescroll.endSuccess();
               },function(error){
               		mescroll.endErr();
	               summer.toast({
	                    "msg" : "加载失败" 
	               })
               });
}
/**
 * 请求数据
 */
function getNewsList(){
	var arr = [];
	for(var i=0;i<jsonArray_menu.length;i++){
		if(!isNull(jsonArray_menu[i].infocolumn)){
			arr.push(jsonArray_menu[i].infocolumn);
		}
	}
	if(arr.length<=0){
		mescroll.endByPage(0, 0);
		return;
	}
	
	var url = getHttpPro()+"/Api/info/elist?pageIndex="+pageIndex +"&pageSize=10&sortField=ts&sortDirection=desc";
	summer.ajax({
        "type":"post",//请求方式
        "url":url,//url地址
        "param":{arr:arr},
	    }, function(response){//成功回调
	        var data = $summer.strToJson(response.data);
	        viewModel.totalPage(data.detailMsg.data.totalPages);
	       	var array = data.detailMsg.data.content;
			if (pageIndex == 0) {
				mescroll.endSuccess(array.length,true);
		        viewModel.newsArray(array);
		    } else {
		        viewModel.newsArray(viewModel.newsArray().concat(array));
		    	mescroll.endByPage((viewModel.newsArray()).length, viewModel.totalPage());
		    }
	    }, function(response){//失败回调
	        mescroll.endErr();
           summer.toast({
                "msg" : "加载失败" 
           })
	    });
	
}
function backClick(){
	summer.closeWin({});
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