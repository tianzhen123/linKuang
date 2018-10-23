var pageIndex = 0;
var pageSize = 15;
var liIndex=0;

var viewModel;
var userId = localStorage.userid;
//var userId = '606aca3d-22fb-47c8-98fd-4480b6344eae';

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
		type:'get',
		url:serviceUrl+'/workersAppeal/myDrafesList?userId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize,
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
				//examplejsondata.type = "诉求类别："+list[i].type;
				examplejsondata.state = list[i].state;
				if('DRAFT'==list[i].state){
				examplejsondata.stateName ='待评价';
				}else{
				examplejsondata.stateName = list[i].stateName;
				}
				
				examplejsondata.orgName = list[i].orgName;
				examplejsondata.appealUserName = list[i].appealUserName;
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
		url:serviceUrl+'/workersAppeal/myDrafesList?userId='+userId+'&pageIndex='+pageIndex+'&pageSize='+pageSize,
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
				examplejsondata.state = list[i].state;
				if('DRAFT'==list[i].state){
				examplejsondata.stateName ='待评价';
				}else{
				examplejsondata.stateName = list[i].stateName;
				}				
				examplejsondata.type = "诉求类别："+list[i].type;
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