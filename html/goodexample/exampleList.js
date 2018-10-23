var pageIndex = 1;
var pageSize = 6;
var liIndex=0;

var viewModel;

//localStorage.userid = 'f35be3e6-c42b-489f-956c-5d491e7c5fb0';

summerready = function(){

	
  
	
	
    
    
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
	
	console.log(gejsonArray0);
	
	jsonData.userId = localStorage.userid;
	jsonData.publicityType = busiType;
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
			console.log("------------------");
			console.log(res);
			
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.goodExampleList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.name = list[i].name;
				examplejsondata.companyName = list[i].companyName;
				if(null == list[i].photoUrl || '' == list[i].photoUrl || undefined == list[i].photoUrl){
					examplejsondata.photoUrl = "../../img/pic_init.png";
				}else{
					examplejsondata.photoUrl = webserver + "/" + list[i].photoUrl;
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
			console.log(er)
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
			console.log(res);
			
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.goodExampleList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.name = list[i].name;
				examplejsondata.companyName = list[i].companyName;
				if(null == list[i].photoUrl || '' == list[i].photoUrl || undefined == list[i].photoUrl){
					examplejsondata.photoUrl = "../../img/pic_init.png";
				}else{
					examplejsondata.photoUrl = webserver + "/" + list[i].photoUrl;
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
			console.log(er)
		}
	});
}