var pageIndex = 0;
var pageSize = 15;
var liIndex=0;

var viewModel;

var userId = localStorage.userid;

summerready = function(){
	viewModel = {
		data:ko.observableArray([]),
	}
	
	getDataList();

	ko.applyBindings(viewModel);
	
	//跳转到该页面在显示对应内容
	$("#listview").show();
	
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
	        forword("approval","html/studyaid/drafes.html"); 
        }else{
        	localStorage.xuanze = "SAVIEW";
        	localStorage.title = '详情';
        	forword("approval","html/studyaid/approval.html");
        }
    });
    
    var pickerObj = UM.picker("#select1", {preset:"select"});
	
}

var gejsonArray = new Array();

//下拉刷新
function pullDown(){

	viewModel.data.removeAll();
	
	pageIndex = 0;
	
	getDataList();
}

function getDataList(){
	$.ajax({
		type:'GET',
		url:serviceUrl+'/studyAid/myDrafesList?userId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize,
		success:function(res){
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.studyAidList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.approvalTime = list[i].approvalTime;					
				examplejsondata.name = list[i].name;					
				examplejsondata.orgName = list[i].orgName;
				examplejsondata.approvalState = list[i].approvalState;
				examplejsondata.state = list[i].state;
				gejsonArray.push(examplejsondata);
			}
			
			viewModel.data(gejsonArray);
			
		},
		error:function(er){
		}
	});
}
function getDataListPush(){
	pageIndex ++;

	var gejsonArray0 = new Array();
	
	$.ajax({
		type:'GET',
		url:serviceUrl+'/studyAid/myDrafesList?userId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize,
	    async : false,
		success:function(res){
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.studyAidList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.approvalTime = list[i].approvalTime;					
				examplejsondata.name = list[i].name;					
				examplejsondata.orgName = list[i].orgName;
				examplejsondata.approvalState = list[i].approvalState;
				examplejsondata.state = list[i].state;
				gejsonArray0.push(examplejsondata);
				gejsonArray.push(examplejsondata);
			}
			
			var viewModelObj = viewModel.data;
			
			for(var i=0; i<gejsonArray0.length; i++){
				viewModelObj.push(gejsonArray0[i]); 
			}
			
		},
		error:function(er){
		}
	});
}