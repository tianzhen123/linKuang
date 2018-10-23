$(document).ready(function(){

	var flowId = localStorage.flowId;
    var xuanze = localStorage.xuanze;
    
    if("myWork" == xuanze){
    	if(flowId == activiti.ms_union_approval ){//工区管理
			$("#fillReportBtn").show();
			workAreaBtn();
    	}else if(flowId == activiti.ms_supervision_approval){//安监部门
			$("#fillReportBtn").show();
			safetySupervision();
    	}else if(flowId == activiti.ms_rectify_approval){//整改人
			$("#handleBtn").show();
			handleBtn();
		}else if(flowId == activiti.ms_review_approval_1 || flowId == activiti.ms_review_approval_2){//复查人
			$("#reviewBtn").show();
			reviewBtn()
		}
	}else if("busitypems" == xuanze || "handle" == xuanze){
		$("#fillReportBtn").hide();
		$("#handleBtn").hide();
		$("#reviewBtn").hide();
	}
});

//工区管理人选择
function workAreaBtn(){
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
	        	localStorage.operateType = '4';
	        	localStorage.title = '问题上报';
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'FINISH';//关闭
	        	localStorage.operateType = '5';
	        	localStorage.title = '结束';
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'RECTIFY';//整改
	        	localStorage.operateType = '1';//管理员整改发布
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/rectification.html"
				});
	        }]
	    });
	})
}

//安监部门选择
function safetySupervision(){
	$('#fillReportBtn').on('click', function () {
		localStorage.removeItem('superviseIdFc');
		localStorage.removeItem('supervisenNameFc');
	    UM.actionsheet({
	        title: '',  
	        items: ['结束','整改'],
	        callbacks: [function () {
	        	localStorage.agreeOrDisagree = 'FINISH';
	        	localStorage.operateType = '5';
				localStorage.title = '结束';
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'AGREE';
	        	localStorage.operateType = '7';//管理员整改发布
	        	localStorage.removeItem('rectifyUserName');
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/safetySupervision.html"
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
				//    "url" : "html/massessecurity/reorganizerHandle.html"
				//});
	        	localStorage.agreeOrDisagree = 'AGREE';
	        	localStorage.operateType = '2';//整改
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/reorganizerHandle.html"
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
				    "url" : "html/massessecurity/report.html"
				});
	        }, function () {
	        	localStorage.agreeOrDisagree = 'AGREE';
	        	localStorage.operateType = '4';
				summer.openWin({ 
				    "id" : "rectification",
				    "url" : "html/massessecurity/reexaminationHandle.html"
				});
	        }]
	    });
	})
}

function backClick(){
  	summer.closeWin({});
}