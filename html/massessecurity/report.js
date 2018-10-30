
function backClick(){
  	summer.closeWin({});
}

$(function(){

	$("#title").text(localStorage.title);

	//提交审批意见
	$('#fillReportBtn').on('click',function(){
		//var obj = getOrgLevel();
		var obj = {}
		obj.userId=localStorage.userid;
   		obj.approvalId=localStorage.approvalId;
	   	obj.taskId = localStorage.taskId;
	   	obj.operateType=localStorage.operateType;
	   	obj.state=localStorage.agreeOrDisagree; 
	   	obj.opinion=$("#opinion").val();//审批意见
    	$.ajax({//意见
			type: "POST",
			url:serviceUrl + "/massesSecurity/submitOpinion",
			data:JSON.stringify(obj),
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			success: function (res) {
				if(res.sCode == 200){
					forword("geApprovalss"+localStorage.approvalId,"html/mywork/myworker.html"); 
				}else{
					alert(res.msg);
				}
			}
		});
    });
})