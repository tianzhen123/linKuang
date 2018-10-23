var pageIndex = 0;
var pageSize = 9;
var liIndex=0;

var viewModel;

var gejsonArray = new Array();

$(function (){
	
	$("#searchBtn").click(function(){
		viewModel.data.removeAll();
	
		pageIndex = 0;
		
		getDataList();
	});
	
})

summerready = function(){
	viewModel = {
		data:ko.observableArray([]),
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
        var newsItem = gejsonArray[args.rowIndex];
        var param = localStorage.param ;
        if(param == 'zg'){
	        localStorage.superviseId = newsItem.id;
	        localStorage.supervisenName = newsItem.name;
        }else if(param == 'fc'){
        	localStorage.superviseIdFc = newsItem.id;
	        localStorage.supervisenNameFc = newsItem.name;
        }
        
        
        if('SP' == localStorage.busiTypeSp){
			if('QJ' == localStorage.approvalLink){
		        summer.openWin({  
				    "id" : "problemModification",
				    "url" : "html/securityproblem/groupLeader.html"
				});
        	}else if('GQ' == localStorage.approvalLink){
        		summer.openWin({  
				    "id" : "problemModification",
				    "url" : "html/securityproblem/workArea.html"
				});
        	}else if('AJ' == localStorage.approvalLink){
        		summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/securityproblem/modification.html"
				});
        	}
        }else if('MS' == localStorage.busiTypeSp){
        	if('GQ' == localStorage.approvalLink){
        		//先做跳转
		        summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/rectification.html"
				});
        	}else if('AJ' == localStorage.approvalLink){
        		summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/safetySupervision.html"
				});
        	}
	        
        }
    });
}

//下拉刷新
function pullDown(){

	viewModel.data.removeAll();
	
	pageIndex = 0;
	
	getDataList();
}


function getDataList(){
	var name = $("#name").val();
	$.ajax({
		type:'get',
		url:serviceUrl+'/workersController/superviseList?pageIndex='+pageIndex+'&pageSize='+pageSize+'&userId='+localStorage.userid+"&queryType="+localStorage.queryType+"&search_searchParam="+name,
		success:function(res){
			console.log(res);
			if(res.sCode != 200){
				return;
			}
			var list = res.rsMap.superviseList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.id = list[i].id;
				examplejsondata.code = list[i].code;					
				examplejsondata.name = list[i].name;
				examplejsondata.organization_name = list[i].organization_name;
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

	var name = $("#name").val();
	
	pageIndex ++;

	var gejsonArray0 = new Array();
	
	$.ajax({
		type:'get',
		url:serviceUrl+'/workersController/superviseList?pageIndex='+pageIndex+'&pageSize='+pageSize+'&userId='+localStorage.userid+'&userId='+localStorage.userid+"&queryType="+localStorage.queryType+"&search_searchParam="+name,
		success:function(res){
			console.log(res);
			if(res.sCode != 200){
				return;
			}
			var list = res.rsMap.superviseList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.id = list[i].id;
				examplejsondata.code = list[i].code;					
				examplejsondata.name = list[i].name;
				examplejsondata.organization_name = list[i].organization_name;
				gejsonArray0.push(examplejsondata);
				gejsonArray.push(examplejsondata);
			}
			
			var viewModelObj = viewModel.data;
			
			for(var i=0; i<gejsonArray0.length; i++){
				viewModelObj.push(gejsonArray0[i]); 
			}
			
		},
		error:function(er){
			console.log(er)
		}
	});
}