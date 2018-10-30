$(function () {
	UM.picker("#select1", {preset:"select"});
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

/**
function forwordApproval(busiType,approvalId){
	localStorage.approvalId = approvalId;
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
*/
