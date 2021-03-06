function backClick(){
	summer.closeWin();
}

var viewModel;
var pageIndex = 0;
var mescroll;
var title;
summerready = function(){
			viewModel = {
				data:ko.observableArray([]),
				totalPage : ko.observable(1),
				openWin:function(data){
					console.log(data);
					summer.openWin({
                        "id" : "recordDet",
                        "url" : "html/xinFangRecord/recordDet.html",
                        "pageParam" : {
                            "param" : data
                        }
                    });
				},
			}
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
		
}
//上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
function upCallback(page) {
	var pageIndex = page.num-1;
	function_pullUp();
}
/**
 * 下拉执行的方法
 */
function function_pullDown(){
	title = document.getElementById("sear").value;
	pageIndex = 0;
	pageLoad(title);
}
/**
 * 上拉执行的方法
 */
function function_pullUp(){
	title = document.getElementById("sear").value;
	pageLoad(title);
}
//搜索的方法
function searchClick(){
	title = document.getElementById("sear").value;
	pageIndex = 0;//请求页置为1
	pageLoad(title);
}
function pageLoad(title){
	var url = ""+getHttpPro()+"personnel/mlist?searchParams="+title+"";
	summer.get(url, {}, 
				{
					"Content-Type" : "application/x-www-form-urlencoded", 
				},//url地址 
                function(response){//成功回调
                    var data = $summer.strToJson(response.data);
					if (data.success == "success") {
						
						jsonArray = data.detailMsg;
						var count = jsonArray.data.content.length;
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
