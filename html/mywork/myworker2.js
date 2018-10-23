$(function () {
	UM.picker("#select1", {preset:"select"});
	
	$("#approvaled").click(function(){
		summer.openWin({
		    "id" : "myworker2",
		    "url" : "html/mywork/myworker2.html"
		}); 
	});
	
	$("#approvalPending").click(function(){
		summer.openWin({
		    "id" : "myworker",
		    "url" : "html/mywork/myworker.html"
		});
	});

	$("#searchBtn").click(function(){
		examplejsonArray = new Array();
		
		//点击查询需要把pageIndex置位0  否者会获取最原先的pageIndex大小
		obj.pageIndex = 0;
		obj.busiType = $("#select1").val();
		obj.name = $("#name").val();
		
		//首先把绑定的值删除
		$("#listview").html('');
		
		//然后把之前存放的html从新拼接
		$("#listview").html(html);
		
		//从新new一个listview
		listview = UM.listview("#listview");
		$.ajax({
			type:'post',
			url:serviceUrl+'/approval/handleList',
			data:JSON.stringify(obj),
		    contentType: 'application/json;charset=utf-8',
		    dataType: 'json', 
		    async : false,
			success:function(res){
				//筛选之后列表 首次上拉刷新需要pageIndex+1  要不然会从0开始
				pageIndex = parseInt(res.rsMap.currentPage)+1; 
				if(res.sCode == 200){
					var list = res.rsMap.approvalList;
					for(var i = 0 ; i < list.length; i++){
						var examplejsondata = {};
						examplejsondata.approvalId = list[i].approvalId;
						examplejsondata.busiTypeVlue = list[i].busiTypeVlue;					
						examplejsondata.busiType = list[i].busiType;
						examplejsondata.orgName = list[i].orgName;					
						examplejsondata.ico = "../../img/busi_ico/"+list[i].busiTypeVlue+".png";					
						//if(list[i].lastUpdateTime == 'undefined' || undefined == list[i].lastUpdateTime){
							examplejsondata.lastUpdateTime = list[i].createTime;
						//}else{
						//	examplejsondata.lastUpdateTime = list[i].lastUpdateTime;
						//}
						//if(list[i].lastUserName == 'undefined' || undefined == list[i].lastUserName){
							examplejsondata.lastUserName = list[i].createUserName;
						//}else{
						//	examplejsondata.lastUserName = list[i].lastUserName;
						//}
						examplejsonArray.push(examplejsondata);
					}
					initViewModel();
				}
			},
			error:function(er){
				console.log(er)
			}
		});
	});

});

/**
 * 业务类型：先进劳模 
 */
var BUSI_TYPE_GE = "BUSI_TYPE_GE";
/**
 * 业务类型：金秋助学
 */
var BUSI_TYPE_SA = "BUSI_TYPE_SA";
/**
 * 业务类型：职工帮扶 
 */
var BUSI_TYPE_HW = "BUSI_TYPE_HW";
/**
 * 业务类型：群众安全  
 */
var BUSI_TYPE_MS = "BUSI_TYPE_MS";
/**
 * 业务类型：职工诉求 
 */
var BUSI_TYPE_WA = "BUSI_TYPE_WA";
/**
 * 业务类型：青安岗工作 
 */
var BUSI_TYPE_SP = "BUSI_TYPE_SP"; 

function forwordApproval(busiType,approvalId,taskId){
	localStorage.approvalId = approvalId;
	localStorage.taskId = taskId;
	if(busiType == BUSI_TYPE_GE){
		forword("geApproval","html/goodexample/approval.html");
	}else if(busiType == BUSI_TYPE_SA){
		forword("saApproval","html/studyaid/approval.html");
	}else if(busiType == BUSI_TYPE_HW){
		forword("hwApproval","html/helpworkers/approval.html");
	}else if(busiType == BUSI_TYPE_MS){
		forword("msApproval","html/massessecurity/approval.html");
	}else if(busiType == BUSI_TYPE_WA){
		forword("waApproval","html/workersappeal/approval.html");
	}else if(busiType == BUSI_TYPE_SP){ 
		forword("spApproval","html/securityproblem/approval.html");
	}
	
}

