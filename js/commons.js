//var serviceUrl = "http://183.3.221.132:8080/pctservice";
//var serviceUrl = "http://192.168.0.102:8080/pctservice";
//var webserver = "http://183.3.221.132/upload";
var serviceUrl = "https://dj.lykyjt.com:8898/pctservice";
var webserver = "https://dj.lykyjt.com:8898/approveupload";


function backClick(){
  	summer.closeWin({});
}

function forword(id, url){
	summer.openWin({
	    "id" : id,
	    "url" : url
	});
}

function getOrgLevel(){
	var obj={};
   	obj.userId=localStorage.userid;
   	obj.approvalId=localStorage.approvalId;
   	obj.postId='1';
   	obj.opinion = '';
   	$.ajax({//意见
		type: "POST",
		url:serviceUrl + "/baseController/getOrgLevel", 
		data:JSON.stringify(obj),
		contentType: 'application/json;charset=utf-8',
		dataType: 'json',
		async : false,  
		success: function (res) {
			console.log(res);
			if(res.sCode == 200){
				obj.orgLevel = res.rsMap.orgLevel;
			}else if(res.sCode == 401){
				alert("当前账户无级别");
			}else{
				alert("系统错误");
			}
		}
	});
	
	return obj;   
}

//诉求类别
function waType(selectId){
	$.ajax({
	    type: "POST",
	    url: serviceUrl + "/enumController/enumList?typeId=WA_TYPE",
	    //data:JSON.stringify(obj),
	    async:false,
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
	    success: function (res) {
	    	var list = res.rsMap.enumList;
	    	var html = '';
	    	if(undefined != list && null != list && list.length>0){
		    	for(var i = 0; i < list.length; i++){
		    		html += '<option value="'+list[i].id+'" selected>'+list[i].name+'</option>';
		    	}
		    	$("#"+selectId).html(html);
	    	}
	    } 
	});
}



//选人公共方法
function rectificationName(param,queryType,busiType, approvalLink){
	localStorage.queryType = queryType;
	localStorage.param = param;
	localStorage.busiTypeSp = busiType; //存取当前是青安岗选人还是群众安全选人
	localStorage.approvalLink = approvalLink; //群监组长   工区  安监部门
	
	localStorage.rectifyUserName = $("#rectifyUserName").val(); //群众安全存放输入的整改人
	localStorage.supervisenNames = $("#supervisenName").val(); //青安岗存放输入的整改人
	
	//forword("superviseList","html/mywork/superviseList.html");
	/**
	summer.openWin({ 
	    "id" : "superviseList",
	    "url" : "html/mywork/superviseList.html"
	});
	*/
	
	window.location.href = '../mywork/superviseList.html';
}

//青安岗审批
function busiTypeSpApproval(submitId,flowId,agreeOrDisagree){
	
	//回显选人
	$("#superviseId").val(undefined ==localStorage.superviseId || ''? '' : localStorage.superviseId);
	$("#supervisenName").text(undefined ==localStorage.supervisenName ? '' : localStorage.supervisenName);
	$("#superviseIdFc").val(undefined ==localStorage.superviseIdFc ? '' : localStorage.superviseIdFc);
	$("#supervisenNameFc").text(undefined ==localStorage.supervisenNameFc ? '' : localStorage.supervisenNameFc);
	
	//操作类型：1:管理员整改发布 2:整改 3:复查 4:上报5:关闭 6:驳回
	var operateType = localStorage.operateType;
	
	var obj = {}
	obj.userId=localStorage.userid;
	obj.approvalId=localStorage.approvalId;
   	obj.taskId = localStorage.taskId;
   	obj.operateType=operateType;
   	obj.state=agreeOrDisagree;
   	
	//提交审批意见
	$('#'+submitId).on('click',function(){
		if(flowId == activiti.sp_groupLeader_approval || flowId == activiti.sp_union_approval){//群监组长或工区管理
			if('4' == operateType ||'5' == operateType){
				obj.opinion = $("#opinion").val();//审判意见
			}else if('9' == operateType ||'1' == operateType){
		   		obj.rectifyUserId=$("#superviseId").val(); //整改人
		   		obj.finishTime=$("#finishTime").val();//要求整改时间
				obj.demand=$("#demand").val();//整改要求
				obj.reviewUserId=$("#superviseIdFc").val();//复查人
			}
		}else if(flowId == activiti.sp_supervision_approval){//安监部门
		   	obj.rectifyUserName=$("#supervisenName").val(); //整改人
		   	obj.finishTime=$("#finishTime").val();//要求完成时间
			obj.demand=$("#demand").val();//整改要求
		   	obj.reviewUserId=$("#superviseIdFc").val();//复查人
		   	obj.requestTime=$("#requestTime").val();//复查完成时间
		   	obj.measure=$("#measure").val(); //整改措施详情
		}else if(flowId == activiti.sp_rectify_approval || flowId == activiti.sp_rectify_approval1){//整改人
			obj.requestTime=$("#requestTime").val();//复查完成时间
		   	obj.measure=$("#measure").val(); //整改措施详情
		}else if(flowId == activiti.sp_review_approval_1 || flowId == activiti.sp_review_approval_2 || flowId == activiti.sp_review_approval_3){//复查人
			obj.requestTime=$("#requestTime").val();//复查完成时间
		   	obj.opinion=$("#opinion").val(); //审批意见
		}
    	$.ajax({//意见
			type: "POST",
			url:serviceUrl + "/securityProblem/submitOpinion",
			data:JSON.stringify(obj),
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			success: function (res) {
				if(res.sCode == 200){
					forword("geApproval","html/mywork/myworker.html"); 
				}else{
					alert(res.msg);
				}
			}
		});
    });
}


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
 * 业务类型：大病帮困
 */
var BUSI_TYPE_HS = "BUSI_TYPE_HS";
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
	}else if(busiType == BUSI_TYPE_HW){//职工帮困
		forword("hwApproval","html/helpworkers/approcal.html?type=2");
	}else if(busiType == BUSI_TYPE_MS){
		forword("msApproval","html/massessecurity/approval.html");
	}else if(busiType == BUSI_TYPE_WA){
		forword("waApproval","html/workersappeal/approval.html");
	}else if(busiType == BUSI_TYPE_SP){ 
		forword("spApproval","html/securityproblem/approval.html");
	}else if(busiType == BUSI_TYPE_HS){// 大病帮扶
		forword("hwApproval","html/helpworkers/approcal.html?type=1");
	}
}
function getOpinionStateName(opinionState){
                  var opinionStateName='通过';
		         if(opinionState=='FINISH'){
		        	 opinionStateName='结束';
		         }
		         if(opinionState=='DISAGREE'){
		        	 opinionStateName='驳回';
		         }
		         if(opinionState=='REPORTED'){
		        	 opinionStateName='上报';
		         }
		         if(opinionState=='RECTIFY'){
		        	 opinionStateName='整改';
		         }
		 return opinionStateName;
}
		  

//--------------------------------流程环节id--------------------------------------------------------------

var activiti={};
//先进劳模
activiti.ge_apply="_3";//三级工会申请
activiti.ge_union_approval="_4";//二级工会审批
activiti.ge_group_approval="_5";//集团工会审批
//金秋助学
activiti.sa_apply="_3";//金秋助学申请
activiti.sa_union_approval="_4";//二级工会审批
activiti.sa_group_approval="_5";//集团工会审批
activiti.sa_union_approval_3 = "_13";//三级工会审批
activiti.sa_union_approval_4 = "_18";//四级工会审批

//群众安全
activiti.ms_apply="_3";//群监员申请
activiti.ms_union_approval="_4";//工区管理审批
activiti.ms_rectify_approval="_5";//整改人处理
activiti.ms_review_approval_1="_6";//复查人处理
activiti.ms_supervision_approval="_7";//安监部门审批
activiti.ms_review_approval_2="_8";//复查人处理

//困难帮扶
activiti.hw_apply="_3";//三级工会申请
activiti.hw_union_approval="_4";//二级工会审批
activiti.hw_group_approval="_5";//集团工会审批

//大病帮扶
activiti.hs_apply="_3";//三级工会申请
activiti.hs_union_approval="_4";//二级工会审批
activiti.hs_medical_approval="_5";//医保中心审批
activiti.hs_group_approval="_6";//集团工会审批

//青安岗
activiti.sp_apply="_3";//问题录入
activiti.sp_groupLeader_approval="_4";//群监组长审批
activiti.sp_rectify_approval="_5";//整改人处理
activiti.sp_review_approval_1="_6";//复查人处理
activiti.sp_union_approval="_7";//工区管理审批
activiti.sp_rectify_approval1="_8";//整改人处理
activiti.sp_review_approval_2="_9";//复查人处理
activiti.sp_supervision_approval="_10";//安监部门审批
activiti.sp_review_approval_3="_11";//复查人处理

//职工诉求
activiti.wa_apply="_3";//职工提报
activiti.wa_union_approval_1="_4";//二级工会回复
activiti.wa_group_approval="_5";//集团工会回复
activiti.wa_union_approval_2="_6";//二级工会回复


