function shareCancle() {
    UM.share.close();
}

$(function () {
	var xuanze = localStorage.xuanze;
	var flowId = localStorage.flowId;
    //控制是从我的工作进入的详情页还是公司列表进入的详情页
    if("myWork" == xuanze){
		$("#fillReportBtn").show();
		//$("#bfje").hide();
	}else if("SAVIEW" == xuanze || "handle" == xuanze){
		$("#fillReportBtn").hide();
		//$("#bfje").show();
	}
	
	$("#title").text(localStorage.title);

	if(flowId == activiti.sa_group_approval){
    	 $('.phone').on('click', function () {
	        UM.actionsheet({
	            title: '',  
	            items: ['驳回','通过'],
	            callbacks: [function () {
	               localStorage.studyaidState = 'DISAGREE'; //驳回
	            	summer.openWin({ 
					    "id" : "opinion"+localStorage.approvalId,
					    "url" : "html/studyaid/opinion.html"
					});
	            }, function () {
	            	localStorage.studyaidState = 'AGREE'; //通过
	            	summer.openWin({ 
					    "id" : "opinion"+localStorage.approvalId,
					    "url" : "html/studyaid/opinion.html"
					});
	            }]
	        });
	
	    })
    }else{
    	$('.phone').on('click', function () {
	        UM.actionsheet({
	            title: '',  
	            items: ['结束','驳回','通过'],
	            callbacks: [function () {
	               localStorage.studyaidState = 'FINISH'; //关闭
	               summer.openWin({ 
					    "id" : "opinion"+localStorage.approvalId,
					    "url" : "html/studyaid/opinion.html"
					});
	            }, function () {
	            	localStorage.studyaidState = 'DISAGREE'; //驳回
	            	summer.openWin({ 
					    "id" : "opinion"+localStorage.approvalId,
					    "url" : "html/studyaid/opinion.html"
					});
	                
	            }, function () {
	            	localStorage.studyaidState = 'AGREE'; //通过
	            	summer.openWin({ 
					    "id" : "opinion"+localStorage.approvalId,
					    "url" : "html/studyaid/opinion.html"
					});
	                
	            }]
	        });
	
	    })
    }
});

