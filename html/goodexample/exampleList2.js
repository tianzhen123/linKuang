var ViewModel = function () {
};

var gejsonArray = new Array();
var pageIndex = 0;
var pageSize = 15;


//jsonData.publicityYear = "ALL";
 
$(document).ready(function(){
	UM.picker("#select1", {preset:"select"});

	$(".GE_MODEL").click(function(){
		summer.openWin({
		    "id" : "modelDetails",
		    "url" : "html/goodexample/modelDetails.html"
		});
	});
	$(".GE_ADVANCED").click(function(){
		summer.openWin({
		    "id" : "advancedDetail",
		    "url" : "html/goodexample/advancedDetail.html"
		});
	});
	
	$("#GETYPE_ADVANCED").click(function(){
		summer.openWin({
		    "id" : "modelDetails",
		    "url" : "html/goodexample/exampleList2.html"
		}); 
	});
	
	$("#GETYPE_MODEL").click(function(){
		summer.openWin({
		    "id" : "modelDetails",
		    "url" : "html/goodexample/exampleList.html"
		});
	});
	
	getAdvancedExampleList("SUB_BUSI_TYPE_GE_ADVANCED");  
});

function getAdvancedExampleList(subBusiType){
	var jsonData = {};
	jsonData.userId = localStorage.userid;
	jsonData.publicityType = subBusiType;
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
			
			initModelView("advancedExampleView");
		},
		error:function(er){
		}
	});
}

function initModelView(listViewId){	
	var viewModel = new ViewModel();
    viewModel.data = ko.observableArray(gejsonArray);
    ko.applyBindings(viewModel);
    //构造控件实例
    var listview = UM.listview("#"+listViewId);
    //添加控件方法
    listview.on("pullDown", function (sender) {
        
        sender.refresh();
    });
    listview.on("pullUp", function (sender) {
        
        sender.refresh();
        
    });
    listview.on("itemDelete", function (sender, args) {
        
    });
    listview.on("itemClick", function (sender, args) {
        
        $('#newsDetail .um-content').empty();
        $('#newsDetail .um-content').scrollTop(0);
        $('#index .um-empty').click();
        var newsItem = examplejsonArray[args.rowIndex];
        forwordApproval(newsItem.busiTypeVlue,newsItem.approvalId);
    });
    listview.on("itemSwipeLeft", function (sender, args) {
        
    });
    listview.on("tapHold", function () {
       
    });
    listview.on("pullDownEnable", function(){
    
    });

}
