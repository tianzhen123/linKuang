var infocolumn;
var ViewModel = function () {
                };	
var viewModel = new ViewModel();
var pageIndex = 0;
var title="";
var mescroll;
function nofind(_this,type){
    src = "../../../img/placeholder.jpg"
    _this.src = src
    _this.onerror=null;
}
summerready = function(){
		viewModel ={
			data:ko.observableArray([]),
			totalPage : ko.observable(1),
			openWin:function(data){
				console.log(data);
				summer.openWin({
				"id" : "techResearchDetail",
				"url" : "html/partySchool/techResearch/techResearchDetail.html",
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
				empty: {
							icon: "", //图标,默认null
							tip: "暂无相关数据", //提示
							btntext: "", //按钮,默认""
							btnClick: ""
						},
				auto:false,
				clearEmptyId: "dataList",
			}
		});
    
	
	function_pullDown();
	//function_pullUp();
}

//上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
function upCallback(page) {
	//$summer.alert(page);
	var pageIndex = page.num-1;
	title ="";
	netService(pageIndex,title);
}


/**
 * 下拉执行的方法
 */
function function_pullDown(){
	//title = document.getElementById("sear").value;
	title = "";
	pageIndex = 0;
	netService(pageIndex,title);
	//net();
}

//搜索的方法
function searchClick(){
	title = document.getElementById("sear").value;
	pageIndex = 0;//请求页置为1
	netService(pageIndex,title);
}

//网络请求
function netService(pageIndex,title){
	var url = ""+getHttpPro()+"kxbasic/list?title="+title+"&pageIndex="+pageIndex+"&pageSize=10&sortField=ts&sortDirection=desc";
	summer.get(url, {}, {
				    "Content-Type" : "application/x-www-form-urlencoded", 
				},//url地址 
    function(response){//成功回调
        var data = $summer.strToJson(response.data);
		if (data.success == "success") {
			
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			var content = jsonArray.data.content;
			viewModel.totalPage(jsonArray.data.totalPages);
			for (var k = 0; k < count; k++) {
				var create_time = jsonArray.data.content[k].ts;
				create_time = Number(create_time);
		        //重写时间格式
		        Date.prototype.toLocaleString = function() {
			      return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
			    };
				var newTime = new Date(create_time) ;
				create_time = newTime.toLocaleString();
				jsonArray.data.content[k].ts = create_time;
				//var content2 = jsonArray.data.content[k].content;
				
				/*if(content2.indexOf('<')!=-1){
			    	jsonArray.data.content[k].content = $('#frame').html(content2).text();
			    }else{
			    	$('#frame').html(content2);
			    }*/
				//imgCenter();
				
			}
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
function filterClick(){
	if($("#classify").css("display")=="none"){
		$("#classify").show();
	}else{
		$("#classify").hide();
	}
}
