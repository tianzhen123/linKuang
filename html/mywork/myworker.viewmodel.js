
//待办pageIndex
var pendingPageIndex = 0;

//已办pageIndex
var alreadyPageIndex = 0;

var pageSize = 9;
var liIndex=0;

//localStorage.userid = '6e4026fc-d606-4198-96a0-5c1e8533e084';

var pendingArray = new Array();

var alreadyArray = new Array();


var viewModel;

summerready = function(){
	viewModel = {
		data0:ko.observableArray([]),
		data1:ko.observableArray([])
	}
	
	localStorage.modelIndex = $("#approvalPending").attr("index");
    $("[name='approval']").on('click',function(){
    	localStorage.modelIndex = $(this).attr("index");
    });
	
	getPendingDataList();
	getAlreadyDataList();

	initViewModel();
	
	
}

//下拉刷新
function dataListpullDown(modelIndex){
	if(modelIndex == 0){
		viewModel.data0.removeAll();
		pendingPageIndex = 0;
		getPendingDataList();
	}
	if(modelIndex == 1){
		viewModel.data1.removeAll();
		alreadyPageIndex = 0;
		getAlreadyDataList();
	}
}

/**
 * 获取待办列表 
 */
function getPendingDataList(){
	var obj = {}
	obj.userId = localStorage.userid;
	obj.pageIndex = pendingPageIndex;
	obj.pageSize = pageSize;
	obj.busiType = $("#select1").val();
	obj.name = $("#name").val();
	$.ajax({
		type:'post',
		url:serviceUrl+'/approval/pendingList',
		data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json', 
		success:function(res){
			console.log(res);
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
					examplejsondata.lastUpdateTime = list[i].createTime;
					examplejsondata.lastUserName = list[i].createUserName;
					examplejsondata.flowId = list[i].flowId;
					examplejsondata.taskMode = list[i].taskMode;
					
					pendingArray.push(examplejsondata);
					
					
				}
				viewModel.data0(pendingArray);
			}
		},
		error:function(er){
			console.log(er)
		}
	});
}

/**
 * 获取待办上拉
 */
function getPendingDataListPush(){
	pendingPageIndex++;
	
	var gejsonArray = new Array();
	
	var obj = {}
	obj.userId = localStorage.userid;
	obj.pageIndex = pendingPageIndex;
	obj.pageSize = pageSize;
	obj.busiType = $("#select1").val();
	obj.name = $("#name").val();
	$.ajax({
		type:'post',
		url:serviceUrl+'/approval/pendingList',
		data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
		success:function(res){
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
					examplejsondata.lastUpdateTime = list[i].createTime;
					examplejsondata.lastUserName = list[i].createUserName;
					examplejsondata.flowId = list[i].flowId;
					examplejsondata.taskMode = list[i].taskMode;
					
					gejsonArray.push(examplejsondata);  
					
					pendingArray.push(examplejsondata);
				}
				
				var viewModelObj = viewModel.data0;
				
				for(var i=0; i<gejsonArray.length; i++){
					viewModelObj.push(gejsonArray[i]); 
				}
			}
		},
		error:function(er){
			console.log(er)
		}
	});
}


/**
 *获取已办列表 
 */
function getAlreadyDataList(){
	var obj = {}
	obj.userId = localStorage.userid;
	obj.pageIndex = alreadyPageIndex;
	obj.pageSize = pageSize;
	obj.busiType = $("#select1").val();
	obj.name = $("#name").val();
	$.ajax({
		type:'post',
		url:serviceUrl+'/approval/handleList',
		data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json', 
		success:function(res){
			console.log(res);
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
					examplejsondata.lastUpdateTime = list[i].createTime;
					examplejsondata.lastUserName = list[i].createUserName;
					examplejsondata.approvalStateName = list[i].approvalStateName;
					alreadyArray.push(examplejsondata);
				}
				viewModel.data1(alreadyArray);
			}
		},
		error:function(er){
			console.log(er)
		}
	});
}
/**
 *获取已办列表上拉
 */
function getAlreadyDataListPush(){

	alreadyPageIndex ++;
	
	var gejsonArray = new Array();
	
	var obj = {}
	obj.userId = localStorage.userid;
	obj.pageIndex = alreadyPageIndex;
	obj.pageSize = pageSize;
	obj.busiType = $("#select1").val();
	obj.name = $("#name").val();
	$.ajax({
		type:'post',
		url:serviceUrl+'/approval/handleList',
		data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json', 
		success:function(res){
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
					examplejsondata.lastUpdateTime = list[i].createTime;
					examplejsondata.lastUserName = list[i].createUserName;
					examplejsondata.approvalStateName = list[i].approvalStateName;
					
					gejsonArray.push(examplejsondata);  
					
					alreadyArray.push(examplejsondata);
				}
				
				var viewModelObj = viewModel.data1;
				
				for(var i=0; i<gejsonArray.length; i++){
					viewModelObj.push(gejsonArray[i]); 
				}
			}
		},
		error:function(er){
			console.log(er)
		}
	});
}


function initViewModel(){
	
	ko.applyBindings(viewModel);
	
	var listView0 = UM.listview("#listview0");	
	var listView1 = UM.listview("#listview1");   
	
	listView0.on("pullDown", function (sender) {
		dataListpullDown(0);
        sender.refresh();
    });
    listView1.on("pullDown", function (sender) {
    	dataListpullDown(1);
        sender.refresh();
    });
    
    listView0.on("pullUp", function (sender) {
    	getPendingDataListPush();
    	sender.refresh();
    });
    listView1.on("pullUp", function (sender) {
    	getAlreadyDataListPush();
    	sender.refresh(); 
    });
    listView0.on("itemClick", function (sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        /*新闻详情页面的渲染*/
        $('#newsDetail .um-content').empty();
        $('#newsDetail .um-content').scrollTop(0);
        $('#index .um-empty').click();
        var newsItem = pendingArray[args.rowIndex];
        
        localStorage.xuanze = 'myWork';
        localStorage.flowId = newsItem.flowId;
        localStorage.taskMode = newsItem.taskMode;
        localStorage.title = '审批';
        
        forwordApproval(newsItem.busiTypeVlue,newsItem.approvalId,newsItem.taskId);
    });
    listView1.on("itemClick", function (sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        /*新闻详情页面的渲染*/
        $('#newsDetail .um-content').empty();
        $('#newsDetail .um-content').scrollTop(0);
        $('#index .um-empty').click();
        var newsItem = alreadyArray[args.rowIndex];
        
        localStorage.xuanze = 'handle';
        localStorage.title = '审批';
        forwordApproval(newsItem.busiTypeVlue,newsItem.approvalId,newsItem.taskId);
    });
}

