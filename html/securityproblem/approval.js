function shareCancle() {
    UM.share.close();
}

$(function () {
	//控制是从我的工作进入的详情页还是公司列表进入的详情页
    if("myWork" == xuanze){
		$("#fillReportBtn").show()
	}else if("busitypesp" == xuanze || "handle" == xuanze){
		$("#fillReportBtn").hide()
	}
	
	var flowId = localStorage.flowId;
    var xuanze = localStorage.xuanze;
	
	if("myWork" == xuanze){
    	if(flowId == activiti.sp_groupLeader_approval){//群监组长处理界面
			$("#fillReportBtn").show();
			groupLeader();
    	}else if(flowId == activiti.sp_union_approval){//工区管理人员处理
			$("#fillReportBtn").show();
			workArea();
    	}else if(flowId == activiti.sp_supervision_approval){//安监部门审批
			$("#fillReportBtn").show();
			safetySupervision();
		}else if(flowId == activiti.sp_rectify_approval || flowId == activiti.sp_rectify_approval1){//整改人审批
			$("#handleBtn").show();
			handleBtn();
		}else if(flowId == activiti.sp_review_approval_1 || flowId == activiti.sp_review_approval_2 || flowId == activiti.sp_review_approval_3){//复查人审批
			$("#reviewBtn").show();
			reviewBtn();
		}
	}else if("busitypesp" == xuanze || "handle" == xuanze){
		$("#fillReportBtn").hide();
		$("#handleBtn").hide();
		$("#reviewBtn").hide();
	}
});

//群监组长处理
function groupLeader(){
	$('#fillReportBtn').on('click', function () {
		//每次点击选择清空已选整改人和复查人
		localStorage.removeItem('superviseId');
		localStorage.removeItem('supervisenName');
		localStorage.removeItem('superviseIdFc');
		localStorage.removeItem('supervisenNameFc');
	    UM.actionsheet({
	        title: '',  
	        items: ['上报','结束','整改'],
	        callbacks: [function () {
	        	localStorage.agreeOrDisagree = 'REPORTED';
	        	localStorage.operateType = '4'; //上报
	        	localStorage.title = '问题上报';
	            summer.openWin({  
				    "id" : "problemModification",
				    "url" : "html/securityproblem/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'FINISH';//关闭
	        	localStorage.operateType = '5';
	        	localStorage.title = '结束';
	            summer.openWin({  
				    "id" : "problemModification",
				    "url" : "html/securityproblem/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'RECTIFY';//整改
	        	localStorage.operateType = '9';//管理员整改发布
	           summer.openWin({  
				    "id" : "problemModification",
				    "url" : "html/securityproblem/groupLeader.html"
				});
	        }]
	    });
	})
}
//工区管理人员处理
function workArea(){
	$('#fillReportBtn').on('click', function () {
		//每次点击选择清空已选整改人和复查人
		localStorage.removeItem('superviseId');
		localStorage.removeItem('supervisenName');
		localStorage.removeItem('superviseIdFc');
		localStorage.removeItem('supervisenNameFc');
	    UM.actionsheet({
	        title: '',  
	        items: ['上报','结束','整改'],
	        callbacks: [function () {
	        	localStorage.agreeOrDisagree = 'REPORTED';
	        	localStorage.operateType = '4'; //上报
	        	localStorage.title = '问题上报';
	            summer.openWin({  
				    "id" : "problemModification",
				    "url" : "html/securityproblem/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'FINISH';//关闭
	        	localStorage.operateType = '5';
	        	localStorage.title = '结束';
	            summer.openWin({  
				    "id" : "problemModification",
				    "url" : "html/securityproblem/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'RECTIFY';//整改
	        	localStorage.operateType = '1';//管理员整改发布
	           summer.openWin({  
				    "id" : "problemModification",
				    "url" : "html/securityproblem/workArea.html"
				});
	        }]
	    });
	})
}

//安监部门选择
function safetySupervision(){
	$('#fillReportBtn').on('click', function () {
	    UM.actionsheet({
	        title: '',  
	        items: ['结束','整改'],
	        callbacks: [function () {
	        	localStorage.agreeOrDisagree = 'FINISH';
	        	localStorage.operateType = '5';
				localStorage.title = '结束';
	            summer.openWin({  
				    "id" : "rectification",
				    "url" : "html/securityproblem/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'AGREE';
	        	localStorage.operateType = '7';
	        	localStorage.removeItem('superviseIdFc');
				localStorage.removeItem('supervisenNameFc');
				localStorage.removeItem('supervisenNames');
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/securityproblem/modification.html"
				});
	        }]
	    });
	})
}

//整改人处理
function handleBtn(){
	$('#handleBtn').on('click', function () {
	    UM.actionsheet({
	        title: '',  
	        items: ['处理'],
	        callbacks: [function () {
	        	//localStorage.agreeOrDisagree = 'FINISH';
	        	//localStorage.operateType = '5';
				//summer.openWin({ 
				//    "id" : "rectification",
				//    "url" : "html/securityproblem/opinion.html"
				//});
	        	localStorage.agreeOrDisagree = 'AGREE';
	        	localStorage.operateType = '2';//整改
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/securityproblem/opinion.html"
				});
	        }, function () {
	        }]
	    });
	})
}

//复查人处理
function reviewBtn(){
	$('#reviewBtn').on('click', function () {
	    UM.actionsheet({
	        title: '',  
	        items: ['驳回','通过'],
	        callbacks: [function () {
	        	localStorage.agreeOrDisagree = 'DISAGREE';
				localStorage.operateType = '6';
				localStorage.title = '驳回';
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/securityproblem/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'AGREE';
	        	localStorage.operateType = '4';
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/securityproblem/reviewOpinion.html"
				});
	        }]
	    });
	})
}
