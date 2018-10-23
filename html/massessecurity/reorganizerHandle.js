function backClick(){
  	summer.closeWin({});
}

$(function(){
	
	reorganizerHandle();
	
});


function reorganizerHandle(){
	
	//提交审批意见
	$('#fillReportBtn').on('click',function(){
		var obj = {}
		obj.userId=localStorage.userid;
   		obj.approvalId=localStorage.approvalId;
	   	obj.taskId = localStorage.taskId;
	   	obj.operateType=localStorage.operateType;
	   	obj.state=localStorage.agreeOrDisagree;
	   	obj.requestTime=$("#requestTime").val();//复查完成时间
	   	obj.measure=$("#measure").val();//整改措施
    	$.ajax({//意见
			type: "POST",
			url:serviceUrl + "/massesSecurity/submitOpinion",
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