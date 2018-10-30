function backClick(){
  	summer.closeWin({});
}

$(function(){
	
	rectification();
	
});


function rectification(){
	
	//回显选人
	$("#superviseId").val(undefined ==localStorage.superviseId || ''? '' : localStorage.superviseId);
	$("#supervisenName").text(undefined ==localStorage.supervisenName ? '' : localStorage.supervisenName);
	$("#superviseIdFc").val(undefined ==localStorage.superviseIdFc ? '' : localStorage.superviseIdFc);
	$("#supervisenNameFc").text(undefined ==localStorage.supervisenNameFc ? '' : localStorage.supervisenNameFc);
	
	
	//提交审批意见
	$('#fillReportBtn').on('click',function(){
		//var obj = getOrgLevel();
		var obj = {}
		obj.userId=localStorage.userid;
   		obj.approvalId=localStorage.approvalId;
	   	obj.taskId = localStorage.taskId;
	   	obj.operateType=localStorage.operateType;
	   	obj.state=localStorage.agreeOrDisagree; //AGREE、DISAGREE
	   	obj.demand=$("#demand").val();//整改要求
	   	obj.finishTime=$("#finishTime").val();//要求整改时间
	   	obj.requestTime=$("#requestTime").val();//复查完成时间
	   	obj.reviewUserId=$("#superviseIdFc").val();//复查人
	   	obj.rectifyUserId=$("#superviseId").val(); //整改人
    	$.ajax({//意见
			type: "POST",
			url:serviceUrl + "/massesSecurity/submitOpinion",
			data:JSON.stringify(obj),
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			success: function (res) {
				if(res.sCode == 200){
					forword("geApprovalq"+localStorage.approvalId,"html/mywork/myworker.html"); 
				}else{
					alert(res.msg);
				}
			}
		});
    });
}
