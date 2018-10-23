var pageIndex = 0;
var pageSize = 15;
var liIndex=0;

var viewModel;

var userId = localStorage.userid;
//var userId = '13ded8eb-e15f-49e3-a8e8-4581e758edd1';

summerready = function(){
	viewModel = {
		data:ko.observableArray([])
	}
	
	getDataList();

	ko.applyBindings(viewModel);
	
	var listView = UM.listview("#listview");	
	
	listView.on("pullDown", function (sender) {
		pullDown();
        sender.refresh();
    });
    listView.on("pullUp", function (sender) {
    	getDataListPush();
    	sender.refresh();
    });
    listView.on("itemClick", function (sender, args) {
        var item = gejsonArray[args.rowIndex];
        localStorage.approvalId = item.approvalId;
		localStorage.addOrUpdate = 'update';
		if(item.approvalState == 'DRAFT'){
        	localStorage.title = '编辑';
	        forword("update","html/massessecurity/drafes.html");
        }else{
	        localStorage.title = '详情';
        	localStorage.xuanze = "busitypems";
        	forword("approval","html/massessecurity/approval.html");
        }
    });
	
}


//下拉刷新
function pullDown(){

	viewModel.data.removeAll();
	
	pageIndex = 0;
	
	getDataList();
}

$(function(){
	localStorage.title = '群众安全工作';
	localStorage.addOrUpdate = 'add';
	$("#addsupervisionProblemBtn").on("click",function(){
		summer.openWin({
		    "id" : "drafes",
		    "url" : "html/massessecurity/drafes.html"
		});
	});
});

var gejsonArray = new Array();

function getDataList(){

	$.ajax({
		type:'get',
		url:serviceUrl+'/massesSecurity/myDrafesList?userId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize,
		success:function(res){
			console.log(res);
			var draftFlag = res.rsMap.draftFlag;
			if(draftFlag){
				$("#addsupervisionProblemBtn").show();
			}else{
				$("#addsupervisionProblemBtn").hide();
			}
			if(res.sCode != 200){
				return;
			}
			var list = res.rsMap.massesSecurityList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				if(list[i].problemValue == 'MS_PROBLEM_TYPE_HT'){
					examplejsondata.ico = "../../img/ico_yhwt.png";
				}else if(list[i].problemValue == 'MS_PROBLEM_TYPE_OS'){
					examplejsondata.ico = "../../img/ico_hlhjy.png";
				}
				examplejsondata.problemTypeName = list[i].problemType;					
				examplejsondata.name = list[i].name;					
				examplejsondata.submitTime = list[i].submitTime;
				examplejsondata.problemDesc = list[i].problemDesc;	
				examplejsondata.busiTypeVlue = list[i].busiTypeVlue;	
				examplejsondata.approvalState = list[i].approvalState;
				examplejsondata.state = list[i].state;			
				gejsonArray.push(examplejsondata); 
			}
			viewModel.data(gejsonArray);
		},
		error:function(er){
			console.log(er)
		}
	});
}
function getDataListPush(){
	pageIndex ++;

	var gejsonArray0 = new Array();
	
	$.ajax({
		type:'get',
		url:serviceUrl+'/massesSecurity/myDrafesList?userId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize,
	    async : false,
		success:function(res){
			console.log(res);
			var draftFlag = res.rsMap.draftFlag;
			if(draftFlag){
				$("#addsupervisionProblemBtn").show();
			}else{
				$("#addsupervisionProblemBtn").hide();
			}
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.massesSecurityList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				if(list[i].problemValue == 'MS_PROBLEM_TYPE_HT'){
					examplejsondata.ico = "../../img/ico_yhwt.png";
				}else if(list[i].problemValue == 'MS_PROBLEM_TYPE_OS'){
					examplejsondata.ico = "../../img/ico_hlhjy.png";
				}
				examplejsondata.problemTypeName = list[i].problemType;					
				examplejsondata.name = list[i].name;					
				examplejsondata.submitTime = list[i].submitTime;
				examplejsondata.problemDesc = list[i].problemDesc;	
				examplejsondata.busiTypeVlue = list[i].busiTypeVlue;
				examplejsondata.approvalState = list[i].approvalState;
				examplejsondata.state = list[i].state;
				
				gejsonArray.push(examplejsondata);  
				
				gejsonArray0.push(examplejsondata); 
			}
			
			var	viewModelObj = viewModel.data;
			for(var i=0; i<gejsonArray0.length; i++){
				viewModelObj.push(gejsonArray0[i]); 
			}
			
		},
		error:function(er){
			console.log(er)
		}
	});
}