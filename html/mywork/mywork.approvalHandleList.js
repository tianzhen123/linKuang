var ViewModel = function () {
};

var examplejsonArray = new Array();
var pageIndex = 0;
var pageSize = 15;

var obj = {}
obj.userId = localStorage.userid;
obj.pageIndex = pageIndex;
obj.pageSize = pageSize;

//获取最原始html
var html = $("#listview").html();

var viewModel = new ViewModel();
$.ajax({
	type:'post',
	url:serviceUrl+'/approval/handleList',
	data:JSON.stringify(obj),
    contentType: 'application/json;charset=utf-8',
    dataType: 'json', 
	success:function(res){
		//页面增加pageIndex+1 为了上拉刷新
		pageIndex = parseInt(res.rsMap.currentPage)+1; 
		if(res.sCode == 200){
			var list = res.rsMap.approvalList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.busiTypeVlue = list[i].busiTypeVlue;					
				examplejsondata.busiType = list[i].busiType;
				examplejsondata.orgName = list[i].orgName;					
				examplejsondata.ico = "../../img/busi_ico/"+list[i].busiTypeVlue+".png";
				examplejsondata.taskId = list[i].taskId;						
				//if(list[i].lastUpdateTime == 'undefined' || undefined == list[i].lastUpdateTime){
					examplejsondata.lastUpdateTime = list[i].createTime;
				//}else{
				//	examplejsondata.lastUpdateTime = list[i].lastUpdateTime;
				//}
				//if(list[i].lastUserName == 'undefined' || undefined == list[i].lastUserName){
					examplejsondata.lastUserName = list[i].createUserName;
				//}else{
				//	examplejsondata.lastUserName = list[i].lastUserName;
				//}
				examplejsonArray.push(examplejsondata);
			}
			
			initViewModel();
		}
	},
	error:function(er){
	}
});
function initViewModel(){
	viewModel.data = ko.observableArray(examplejsonArray);
	ko.applyBindings(viewModel);
	
	//构造控件实例
	var listview = UM.listview("#listview");

	//添加控件方法
    listview.on("pullDown", function (sender) {
        //这是可以编写列表下拉加载逻辑，参数sender即为当前列表实例对象
        
        //viewModel.data.unshift(examplejsonArray);
        sender.refresh();
    });
    listview.on("pullUp", function (sender) {
        //这是可以编写列表上拉刷新逻辑，参数sender即为当前列表实例对象
        /*var row = {
         "img": ["../../img/news6.png","../../img/news6.png"],
         "title": "科幻成真？微软开发可预测未来犯罪应用",
         "time": '2015年12月25日11:41',
         "detail": "这种新技术可依据历史记录，预测哪些囚犯将在获释6个月内重新被捕。",
         "comments": 2633,
         "content":'<p>腾讯科技讯 12月17日，据国外媒体报道，在好莱坞科幻大片《少数派报告》中，预测和预防犯罪已经成为可能。如今，微软正开发一种应用，可以模仿电影中“预测者”(Pre Cogs)的能力，阻止囚犯成为惯犯。这种新技术可依据历史记录，预测哪些囚犯将在获释6个月内重新被捕。</p>' +
         '<p>微软高级项目经理杰夫·金（Jeff King）说：“这是一款有能力预测未来的软件。”这款应用还未被命名，它依然处于早期开发阶段，在概念证明阶段使用的数据也并非来自真正的囚犯。</p>' +
         '<p>这种应用的算法可分析每个囚犯的特殊数据，比如他们的罪行以及在被监禁期间的行为。金表示，他们的应用基于历史记录做出的判断，准确率高达91%。他解释称：“这些记录包括：罪犯是否有帮派关系？他们是否参加康复计划？在监狱中有多少违规行为？被关过多少小时紧闭？”</p>' +
         '<img src="./img/news6-two.png"/>'+
         '<p>微软过去也曾研发过预测技术，但只是用于预测游戏玩家的下一步动作。在视频游戏《Halo》中，微软的软件可以根据用户在以往类似情况下的反应，预测用户接下来的行为。</p>' +
         '<p>尽管对于警察来说，微软的新技术堪称利器，但许多民权组织认为这可能在某些社区创造出特定类别的嫌疑人，某些具备类似特征的人也将苦恼不堪。麻省理工学院的社会名誉学教授加里·马克斯（Gary Marx）解释称，这个想法堪称“暴政算法”。他认为这种技术将会促使警察不再依赖人类智慧，而更加依赖推测。随着时间推移，很可能出现数据与知识混淆的谬误。</p>' +
         '<p>美国公民自由联盟高级政策分析师杰伊·斯坦利（Jay Stanley）也质疑称，这种算法很可能导致出现大问题：人们会得到更多社会服务，还是受到更多监督以及更严厉刑事惩罚？</p>' +
         '<p>美国某些大城市已经拥有依赖数据的预测软件，帮助寻找未来罪犯。比如芝加哥，该市基于某些人在特定环境下的特定行为，将400名居民列入潜在受害者和有暴力倾向者名单。在将某个名字填入名单后，警方就会上门，警告这些人正受到密切监视。</p>' +
         '<p>芝加哥电子前沿协会律师汉尼·菲克豪利（Hanni Fakhoury）谈及此举时称：“我担心这些计划正创造出一种环境，警察可能随时以任何理由出现在某人家中。”类似计划也在帮助密苏里州堪萨斯市应对不断上升的自杀率。</p>' +
         '<p>微软并非首家开发犯罪预测软件的公司。9月份，日立的“预测犯罪分析”（PCA）软件显示出巨大潜力，可以预测最有可能发生犯罪的时间和地点。利用推文、CCTV摄像头、枪械探测器以及交通系统，这款软件可生成潜在犯罪热点地图，最终显示出最有可能发生哪类犯罪。</p>' ,
         };
         viewModel.data.push(row);
         sender.refresh();*/
        
        var pushJsonData = new Array();
        //每次上拉需要获取筛选条件
        obj.busiType = $("#select1").val();
		obj.name = $("#name").val();
    	obj.pageIndex = pageIndex;
        $.ajax({
			type:'post',
			url:serviceUrl+'/approval/handleList',
			data:JSON.stringify(obj),
	        contentType: 'application/json;charset=utf-8',
	        dataType: 'json', 
			async : false,
			success:function(res){
				//筛选之后pageIndex+1 为了下次上拉筛选
		    	pageIndex = parseInt(res.rsMap.currentPage)+1; 
				if(res.sCode == 200){
					var list = res.rsMap.approvalList;
					for(var i = 0 ; i < list.length; i++){
						var newExamplejsondata = {};
						newExamplejsondata.approvalId = list[i].approvalId;
						newExamplejsondata.busiTypeVlue = list[i].busiTypeVlue;					
						newExamplejsondata.busiType = list[i].busiType;
						newExamplejsondata.orgName = list[i].orgName;					
						newExamplejsondata.ico = "../../img/busi_ico/"+list[i].busiTypeVlue+".png";				
						newExamplejsondata.taskId = list[i].taskId;	
						//if(list[i].lastUpdateTime == 'undefined' || undefined == list[i].lastUpdateTime){
							newExamplejsondata.lastUpdateTime = list[i].createTime;
						//}else{
							//newExamplejsondata.lastUpdateTime = list[i].lastUpdateTime;
						//}
						//if(list[i].lastUserName == 'undefined' || undefined == list[i].lastUserName){
							newExamplejsondata.lastUserName = list[i].createUserName;
						//}else{
							//AnewExamplejsondata.lastUserName = list[i].lastUserName;
						//}
						pushJsonData.push(newExamplejsondata);
					}
				}
			},
			error:function(er){
			}
		});
        
        
        for(var i=0; i<pushJsonData.length; i++){
        	viewModel.data.push(pushJsonData[i]);   
        }
        
	        
        
        //viewModel.data.unshift(examplejsonArray);
        sender.refresh();
        
    });
    listview.on("itemDelete", function (sender, args) {
        //这是可以编写行删除逻辑，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        /*args.$target.slideUp(500,function(){
         var item = viewModel.data()[args.rowIndex];
         viewModel.data.remove(item);
         });*/
    });
    listview.on("itemClick", function (sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        /*新闻详情页面的渲染*/
        $('#newsDetail .um-content').empty();
        $('#newsDetail .um-content').scrollTop(0);
        $('#index .um-empty').click();
        var newsItem = examplejsonArray[args.rowIndex];
        forwordApproval(newsItem.busiTypeVlue,newsItem.approvalId,newsItem.taskId);
    });
    listview.on("itemSwipeLeft", function (sender, args) {
        //这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        //sender.showItemMenu(args.$target);
    });
    listview.on("tapHold", function () {
        //这里可以处理长按事件
        //console.log("您长按了列表！");
    });
	
	
}

function getApprovalhandleList(busiType, name){
	
}