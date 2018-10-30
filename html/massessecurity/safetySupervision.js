function backClick(){
  	summer.closeWin({});
}

$(function(){
	
	safetySupervision();
	
});


function safetySupervision(){
	//回显选人
	$("#superviseIdFc").val(undefined ==localStorage.superviseIdFc ? '' : localStorage.superviseIdFc);
	$("#supervisenNameFc").text(undefined ==localStorage.supervisenName ? '' : localStorage.supervisenNameFc);
	
	
	//提交审批意见
	$('#fillReportBtn').on('click',function(){
		var obj = {}
		obj.userId=localStorage.userid;
   		obj.approvalId=localStorage.approvalId;
	   	obj.taskId = localStorage.taskId;
	   	obj.operateType=localStorage.operateType;
	   	obj.state=localStorage.agreeOrDisagree;
	   	obj.demand=$("#demand").val();//整改要求
	   	obj.requestTime=$("#requestTime").val();//复查完成时间
	   	obj.finishTime=$("#finishTime").val();//要求完成时间
	   	obj.reviewUserId=$("#superviseIdFc").val();//复查人
	   	obj.rectifyUserName=$("#rectifyUserName").val(); //整改人
	   	obj.measure=$("#measure").val(); //整改措施详情
    	$.ajax({//意见
			type: "POST",
			url:serviceUrl + "/massesSecurity/submitOpinion",
			data:JSON.stringify(obj),
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			success: function (res) {
				if(res.sCode == 200){
					forword("geApprovalw"+localStorage.approvalId,"html/mywork/myworker.html"); 
				}else{
					alert(res.msg);
				}
			}
		});
    });
}
