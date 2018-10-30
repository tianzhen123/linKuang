var pageIndex = 1;
var pageSize = 9;
var liIndex=0;

var ViewModel = function () {
};

var viewModel = new ViewModel();


summerready = function(){
	viewModel = {
		data0:{},
		data1:{}
	}
	
	getDataList("SUB_BUSI_TYPE_GE_MODEL",0);
	getDataList("SUB_BUSI_TYPE_GE_ADVANCED",1);

	ko.applyBindings(viewModel);
	
	var listView0 = UM.listview("#listview0");	
	var listView1 = UM.listview("#listview1");   
	
	listView0.on("pullDown", function (sender) {
		getDataListPush("SUB_BUSI_TYPE_GE_MODEL",0);
	
        sender.refresh();
    });
    listView1.on("pullDown", function (sender) {
    	getDataListPush("SUB_BUSI_TYPE_GE_ADVANCED",1);
        sender.refresh();
    });
    listView0.on("pullUp", function (sender) {
    	getDataListPush("SUB_BUSI_TYPE_GE_MODEL",0);
    	sender.refresh();
    });
    listView1.on("pullUp", function (sender) {
    	getDataListPush("SUB_BUSI_TYPE_GE_ADVANCED",1);
    	sender.refresh(); 
    });
}


 
$(document).ready(function(){


	UM.picker("#select1", {preset:"select"});

});

function getDataList(busiType, modelIndex){
	var gejsonArray = new Array();
	
	var jsonData = {};
	jsonData.userId = localStorage.userid;
	jsonData.publicityType = busiType;
	jsonData.currentPage = pageIndex+"";
	jsonData.pageSize = pageSize+"";
	$.ajax({
		type:"POST",
		url:serviceUrl + "/goodExample/goodExampleList",
		datatype:'json',
		data:JSON.stringify(jsonData),
		contentType: 'application/json;charset=utf-8',  
		async : false,
		success:function(res){
			
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.goodExampleList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.name = list[i].name;
				examplejsondata.companyName = list[i].companyName;
				examplejsondata.photoUrl = webserver + "/" + list[i].photoUrl;
				examplejsondata.geType = list[i].geType;
				
				gejsonArray.push(examplejsondata);  
			}
			
			if(modelIndex == 0){
				viewModel.data0 = ko.observableArray(gejsonArray);
			}
			if(modelIndex == 1){
				viewModel.data1 = ko.observableArray(gejsonArray);
			}
			
		},
		error:function(er){
		}
	});
}
function getDataListPush(busiType, modelIndex){
	pageIndex ++;

	var gejsonArray = new Array();
	
	var jsonData = {};
	jsonData.userId = localStorage.userid;
	jsonData.publicityType = busiType;
	jsonData.currentPage = pageIndex+"";
	jsonData.pageSize = pageSize+"";
	$.ajax({
		type:"POST",
		url:serviceUrl + "/goodExample/goodExampleList",
		datatype:'json',
		data:JSON.stringify(jsonData),
		contentType: 'application/json;charset=utf-8',  
		async : false,
		success:function(res){
			
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.goodExampleList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.name = list[i].name;
				examplejsondata.companyName = list[i].companyName;
				examplejsondata.photoUrl = webserver + "/" + list[i].photoUrl;
				examplejsondata.geType = list[i].geType;
				
				gejsonArray.push(examplejsondata);  
			}
			
			var viewModelObj;
			if(modelIndex == 0){
				viewModelObj = viewModel.data0;
			}
			if(modelIndex == 1){
				viewModelObj = viewModel.data1;
			}
			
			for(var i=0; i<gejsonArray.length; i++){
				viewModelObj.push(gejsonArray[i]); 
			}
			
		},
		error:function(er){
		}
	});
}


