var infocolumn = "01010302";
var ViewModel = function () {
                };	
var viewModel = new ViewModel();
var pageIndex = 0;
var title="";
var mescroll;
function nofind(_this,type){
    src = "../../img/placeholder.jpg"
    _this.src = src
    _this.onerror=null;
}
summerready = function(){
		$summer.fixStatusBar($summer.byId('header'));
		//var param = summer.pageParam.param;
		var param = {
			id:"119",
			infocolumn:"01010201",
			logoUrl:"https://dj.lykyjt.com:8898/image/icon/icon_lianzhengfangyuan.png",
			name:"要论摘编",
			sort:"41",
			url:"html/newsPropaganda/newsPropaganda.html",
			urlType:"200"
		}
		infocolumn = param.infocolumn;
		pageTitle= param.name;
		//var pageTitle= "普惠服务";
		document.getElementById("pageTitle").innerHTML = pageTitle;
		
		viewModel ={
			data:ko.observableArray([]),
			totalPage : ko.observable(1),
			openWin:function(data){
				console.log(data);
				summer.openWin({
				"id" : "theoryAbstractDetail",
				"url" : "html/partySchool/theoryAbstract/theoryAbstractDetail.html",
				"isKeep" : true,
				"pageParam" : {
					"count" : data,
					"pageTitle":pageTitle,
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
	var pageIndex = page.num-1;
	function_pullUp();
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
	//title = document.getElementById("sear").value;
	title = "";
	pageIndex = 0;
	netService(infocolumn,title);
	//net();
}

/**
 * 上拉执行的方法
 */
function function_pullUp(){
	//title = document.getElementById("sear").value;
	title = "";
	netService(infocolumn,title);
	//net();
}

//搜索的方法
function searchClick(){
	title = document.getElementById("sear").value;
	pageIndex = 0;//请求页置为1
	netService(infocolumn,title);
}
function net(){
	
	var array  =[{"fimage":"../../img/dang1.jpg","title":"塑料袋凤凰山路口的积分","ts":"2017-09-09 16:11:11"},
		{"fimage":"","title":"塑料袋凤凰山路口蓝色大海开放老家哈桑了的空间发哈了会计师电话费的积分塑料袋快疯施蒂利克放假了空间水电费了","ts":"2017-09-09 16:11:11"},
		{"fimage":"../../img/ceshi.jpg","title":"塑料袋凤凰山路口的积分","ts":"2017-09-09 16:11:11"},
		{"fimage":"../../img/dang1.jpg","title":"塑料袋凤凰山路口的积分","ts":"2017-09-09 16:11:11"},
		{"fimage":"","title":"塑料袋凤凰山路口蓝色大海开放老家哈桑了的空间发哈了会计师电话费的积分塑料袋快疯施蒂利克放假了空间水电费了","ts":"2017-09-09 16:11:11"},
		{"fimage":"../../img/ceshi.jpg","title":"塑料袋凤凰山路口的积分","ts":"2017-09-09 16:11:11"},
		{"fimage":"../../img/dang1.jpg","title":"塑料袋凤凰山路口的积分","ts":"2017-09-09 16:11:11"},
		{"fimage":"","title":"塑料袋凤凰山路口蓝色大海开放老家哈桑了的空间发哈了会计师电话费的积分塑料袋快疯施蒂利克放假了空间水电费了","ts":"2017-09-09 16:11:11"},
		{"fimage":"../../img/ceshi.jpg","title":"塑料袋凤凰山路口的积分","ts":"2017-09-09 16:11:11"},
		{"fimage":"../../img/dang1.jpg","title":"塑料袋凤凰山路口的积分","ts":"2017-09-09 16:11:11"},
		{"fimage":"","title":"塑料袋凤凰山路口蓝色大海开放老家哈桑了的空间发哈了会计师电话费的积分塑料袋快疯施蒂利克放假了空间水电费了","ts":"2017-09-09 16:11:11"},
		{"fimage":"../../img/ceshi.jpg","title":"塑料袋凤凰山路口的积分","ts":"2017-09-09 16:11:11"}];
		
	
        viewModel.data(viewModel.data().concat(array));
        mescroll.endByPage((viewModel.data()).length, viewModel.totalPage());
        //mescroll.endSuccess();
}
//网络请求
function netService(infocolumn,title){
	var url = ""+getHttpPro()+"Api/info/list?infocolumn="+infocolumn+"&title="+title+"&pageIndex="+pageIndex+"&pageSize=10&sortField=ts&sortDirection=desc";
	//var url = "http://172.20.10.4:8080/partyconstrutproject/Api/info/list?infocolumn="+infocolumn+"&title="+title+"&pageIndex="+pageIndex+"&pageSize=10&sortField=ts&sortDirection=desc";
				summer.get(url, {}, {
							    "Content-Type" : "application/x-www-form-urlencoded", 
							},//url地址 
                function(response){//成功回调
                    var data = $summer.strToJson(response.data);
					if (data.success == "success") {
						
						jsonArray = data.detailMsg;
						var count = jsonArray.data.content.length;
						viewModel.totalPage(jsonArray.data.totalPages);
						for (var k = 0; k < count; k++) {
							var ts = jsonArray.data.content[k].ts;
							//var ts = jsonArray.data.content[k].publishtime;
							jsonArray.data.content[k].publishtime = getMyDate(ts);
							//jsonArray.data.content[k].fimage = jsonArray.data.content[k].fimage == null?"../../img/placeholder.jpg":jsonArray.data.content[k].fimage;//添加默认图片
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
function filterClick(){
	if($("#classify").css("display")=="none"){
		$("#classify").show();
	}else{
		$("#classify").hide();
	}
}
