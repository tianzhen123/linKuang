//点击申请跳转到起草页面
function apply(){
	localStorage.title = '申请金秋助学';
	localStorage.addOrUpdate = 'add';
	summer.openWin({
	    "id" : "drafes",
	    "url" : "html/studyaid/drafes.html",
	    "create" : false
	});
}

//我发起的点击事件
function launched(){
	summer.openWin({
	    "id" : "launched",
	    "url" : "html/studyaid/launched.html",
	    "create" : false
	});
}



var pageIndex = 1;
var pageSize = 9;
var liIndex=0;

var viewModel;

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
        var item = gejsonArray[args.rowIndex];
        localStorage.approvalId = item.approvalId;
        localStorage.title = '详情';
        forword("approval","html/studyaid/approval.html"); 
    });
    
    var pickerObj = UM.picker("#select1", {preset:"select"});
	
}



//下拉刷新
function pullDown(){

	viewModel.data.removeAll();
	
	pageIndex = 0;
	
	getDataList();
}

var gejsonArray = new Array();

function getDataList(){
	var jsonData = {};
	
	jsonData.userId = localStorage.userid;
	jsonData.pageIndex = pageIndex+"";
	jsonData.pageSize = pageSize+"";
	$.ajax({
		type:'post',
		url:serviceUrl+'/studyAid/studyAidList',
		data:JSON.stringify(jsonData),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
		success:function(res){
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.goodStudyAidList;
			if(list.length > 0){
				for(var i = 0 ; i < list.length; i++){
					var examplejsondata = {};
					examplejsondata.approvalId = list[i].approvalId;
					if(list[i].examineeSex == 'M'){
						examplejsondata.ico = "./img/man.png";
						examplejsondata.sex = "男";
					//}else if(list[i].examineeSex == 'W'){
					}else{
						examplejsondata.ico = "./img/woman.png";
						examplejsondata.sex = "女";
					}
					examplejsondata.name = list[i].examineeName;	
					if('' == list[i].graduateSchool){
						examplejsondata.graduateSchool = '无';
					}else{
						examplejsondata.graduateSchool = list[i].graduateSchool;
					}
					gejsonArray.push(examplejsondata);
				}
			}else{
				$("#listview").hide();
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
	
	var jsonData = {};
	jsonData.userId = localStorage.userid;
	jsonData.pageIndex = pageIndex+"";
	jsonData.pageSize = pageSize+"";
	$.ajax({
		type:'post',
		url:serviceUrl+'/studyAid/studyAidList',
		data:JSON.stringify(jsonData),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
		success:function(res){
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.goodStudyAidList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				if(list[i].examineeSex == 'M'){
					examplejsondata.ico = "./img/man.png";
					examplejsondata.sex = "男";
				}else if(list[i].examineeSex == 'W'){
					examplejsondata.ico = "./img/woman.png";
					examplejsondata.sex = "女";
				}
				examplejsondata.name = list[i].examineeName;					
				examplejsondata.graduateSchool = list[i].graduateSchool;
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