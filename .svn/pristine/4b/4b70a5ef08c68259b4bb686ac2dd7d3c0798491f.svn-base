var ViewModel = function () {
                };	
var viewModel = new ViewModel();
var pageIndex = 0;
var title="";
var mescroll;
var id ;
function nofind(_this,type){
    src = "../../../img/placeholder.jpg"
    _this.src = src
    _this.onerror=null;
}
summerready = function(){
	data = summer.pageParam.count;
	console.log(data);
	//$summer.alert(data);
	id = data.id;
	//组织名称
	name = data.name;
	$("#name").text(name);
	//组织联系人
	contacts = data.contacts;
	$("#contacts").text(contacts);
	//组织联系人电话
	contactsphone = data.contactsphone;
	$("#contactsphone").text(contactsphone);
	//地址
	address = data.address;
	$("#address").text(address);
	viewModel ={
		data:ko.observableArray([]),
		totalPage : ko.observable(1),
		openWin:function(data){
			console.log(data);
			summer.openWin({
				"id" : "personDet",
				"url" : "html/partySchool/organization/personDet.html",
				"isKeep" : true,
				"pageParam" : {
					"count" : data,
				}
			});
		}
	};
	ko.applyBindings(viewModel);
	
 	mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
   		//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
   		//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
		up: {
			callback: upCallback , //上拉加载的回调
			isBounce: false, //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
			noMoreSize:4,
			auto:false,
		}
	});
    
	
	function_pullDown();
	//function_pullUp();
}

//上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
function upCallback(page) {
	
	var pageIndex = page.num-1;
	netService(pageIndex,title);
}


/**
 * 下拉执行的方法
 */
function function_pullDown(){
	
	//title = "";
	pageIndex = 0;
	netService(pageIndex,title);
	//net();
}



//网络请求
function netService(pageIndex,title){
	//$summer.alert(title);
	var url = ""+getHttpPro()+"partyschoolorg/slist?title="+title+"&id="+id+"&pageIndex="+pageIndex+"&pageSize=10&sortField=ts&sortDirection=desc";
	summer.get(url, {
			
	}, {
	    "Content-Type" : "application/x-www-form-urlencoded", 
	},//url地址 
    function(response){//成功回调
        var data = $summer.strToJson(response.data);
		if (data.success == "success") {
			
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			var content = jsonArray.data.content;
			viewModel.totalPage(jsonArray.data.totalPages);
			
			var array = jsonArray.data.content;
			
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


function backClick(){
  	summer.closeWin({});
}
