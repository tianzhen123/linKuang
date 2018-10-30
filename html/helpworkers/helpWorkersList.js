var pageIndex = 1;
var pageSize = 9;
var liIndex=0;

var viewModel;

//localStorage.userid = 'c7800a53-3b98-4979-b4d1-e6e2fd4eba24';

summerready = function(){
	viewModel = {
		data0:ko.observableArray([]),
		data1:ko.observableArray([])
	}
	
	getDataList("BUSI_TYPE_HW",0);
	getDataList("BUSI_TYPE_HS",1);

	ko.applyBindings(viewModel);
	
	var listView0 = UM.listview("#listview0");	
	var listView1 = UM.listview("#listview1");   
	
	listView0.on("pullDown", function (sender) {
		pullDown("BUSI_TYPE_HW",0);
	
        sender.refresh();
    });
    listView1.on("pullDown", function (sender) {
    	pullDown("BUSI_TYPE_HS",1);
        sender.refresh();
    });
    listView0.on("pullUp", function (sender) {
    	getDataListPush("BUSI_TYPE_HW",0);
    	sender.refresh();
    });
    listView1.on("pullUp", function (sender) {
    	getDataListPush("BUSI_TYPE_HS",1);
    	sender.refresh(); 
    });
    listView0.on("itemClick", function (sender, args) {
        var item = gejsonArray0[args.rowIndex];
        localStorage.approvalId = item.approvalId;
        forword("details","html/helpworkers/approcal.html"); 
    });
    listView1.on("itemClick", function (sender, args) {
        var item = gejsonArray1[args.rowIndex];
        localStorage.approvalId = item.approvalId;
        forword("details","html/helpworkers/approcal.html"); 
    }); 
    
    
    $("#nav ul li").click(function(){
    	var liIndex=Number($(this).attr("index"));
    });
    
    var date = new Date();
    var yearInt = Number(date.getFullYear());
    $("#select1").append("<option value='"+yearInt+"'>"+yearInt+"</option>");
    for(var i=1;i<5;i++){
    	$("#select1").append("<option value='"+ (yearInt - i) +"'>"+(yearInt - i)+"</option>");
    }
    
    $("#select1").on("change",function(){
    	viewModel.data0.removeAll();
    	viewModel.data1.removeAll();
		
    	getDataList("BUSI_TYPE_HW",0);
		getDataList("BUSI_TYPE_HS",1);
    });
    
    var pickerObj = UM.picker("#select1", {preset:"select"});
	
}

//下拉刷新
function pullDown(busiType, modelIndex){
	
	if(modelIndex == 0){
		viewModel.data0.removeAll();
	}
	if(modelIndex == 1){
		viewModel.data1.removeAll();
	}
	pageIndex = 1;
	
	getDataList(busiType, modelIndex);
}

var gejsonArray0 = new Array();
var gejsonArray1 = new Array();;

function getDataList(busiType, modelIndex){

	var publicityYear = $("#select1").val();
	
	var jsonData = {};
	
	
	//jsonData.userId = "7800a53-3b98-4979-b4d1-e6e2fd4eba24";
	jsonData.userId = localStorage.userid;
	jsonData.busiType = busiType;
	jsonData.currentPage = pageIndex+"";
	jsonData.pageSize = pageSize+"";
	
	if(publicityYear != "-1"){
		jsonData.publicityYear = publicityYear;
	}
	
	$.ajax({
		type:"POST",
		url:serviceUrl + "/goodExample/goodExampleList",
		datatype:'json',
		data:JSON.stringify(jsonData),
		contentType: 'application/json;charset=utf-8',  
		success:function(res){
			
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.goodExampleList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.name = list[i].name;
				if(list[i].companyName.length>7){
					examplejsondata.companyName = list[i].companyName.substring(0,6);
				}else{
					examplejsondata.companyName = list[i].companyName;
				}
				if("BUSI_TYPE_HS" == busiType){
					examplejsondata.photoUrl = "./img/fallill.png";
				}else{
					examplejsondata.photoUrl = "./img/defficulty.png";
				}
				
				examplejsondata.geType = list[i].geType;
				
				if(modelIndex == 0){
					gejsonArray0.push(examplejsondata); 
				}else if(modelIndex == 1){
					gejsonArray1.push(examplejsondata); 
				} 
			}
			
			if(modelIndex == 0){
				viewModel.data0(gejsonArray0);
			}
			if(modelIndex == 1){
				viewModel.data1(gejsonArray1);
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
		success:function(res){
			
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.goodExampleList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.name = list[i].name;
				if(list[i].companyName.length>7){
					examplejsondata.companyName = list[i].companyName.substring(0,6);
				}else{
					examplejsondata.companyName = list[i].companyName;
				}
				if("BUSI_TYPE_HS" == busiType){
					examplejsondata.photoUrl = "./img/fallill.png";
				}else{
					examplejsondata.photoUrl = "./img/defficulty.png";
				}
				examplejsondata.geType = list[i].geType;
				
				gejsonArray.push(examplejsondata);  
				
				if(modelIndex == 0){
					gejsonArray0.push(examplejsondata); 
				}else if(modelIndex == 1){
					gejsonArray1.push(examplejsondata); 
				} 
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