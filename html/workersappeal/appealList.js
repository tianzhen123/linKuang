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
        forword("approval","html/workersappeal/handleDetail.html"); 
    });
    
    var pickerObj = UM.picker("#select1", {preset:"select"});
	
}

//点击申请跳转到起草页面
function apply(){
	summer.openWin({
	    "id" : "drafes",
	    "url" : "html/workersappeal/drafes.html"
	});
}

//我发起的点击事件
function launched(){
	summer.openWin({
	    "id" : "launched",
	    "url" : "html/workersappeal/mylaunch.html"
	});
}

//下拉刷新
function pullDown(){

	viewModel.data.removeAll();
	
	pageIndex = 0;
	
	getDataList();
}

var gejsonArray = new Array();

function getDataList(){
	$.ajax({
		type:'post',
		url:serviceUrl+'/workersAppeal/getPublishList?userId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize,
		success:function(res){
			console.log(res);
			
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.workersAppealList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.approvalTime = list[i].approvalTime;					
				examplejsondata.title = list[i].title;					
				examplejsondata.type = "诉求类别："+transWaTypeName(list[i].type);
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
		type:'post',
		url:serviceUrl+'/workersAppeal/getPublishList?userId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize,
	    async : false,
		success:function(res){
			console.log(res);
			
			if(res.sCode != 200){
				return;
			}
			
			var list = res.rsMap.workersAppealList;
			for(var i = 0 ; i < list.length; i++){
				var examplejsondata = {};
				examplejsondata.approvalId = list[i].approvalId;
				examplejsondata.approvalTime = list[i].approvalTime;					
				examplejsondata.title = list[i].title;					
				examplejsondata.type = "诉求类别："+transWaTypeName(list[i].type);
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

function transWaTypeName(waType){
    var name="";
	if('traffic'==waType){
		name="交通";
	}else if('safe'==waType){
		name="安全生产";
	}else if('life'==waType){
		name="群众生活";
	}
	return name;
}