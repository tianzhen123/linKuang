function shareCancle() {
    UM.share.close();
}

$(function () {

	var flowId = localStorage.flowId;
	//只有二级工会审批的时候才展示
	if(flowId == activiti.ge_union_approval){
		$("#secondLevelOpinion").show();
	}else{
		$("#secondLevelOpinion").hide();
	}
	

    $('.phone').on('click', function () {
        UM.actionsheet({
            title: '',  
            items: ['确认'],
            callbacks: [function () {
            	var obj = {};
            	obj.userId=localStorage.userid;
   				obj.approvalId=localStorage.approvalId;
               	obj.opinion = $("#opinion").val(); 
				obj.taskId = localStorage.taskId; 
				obj.state = localStorage.opinionState; 
			   	$.ajax({//意见
					type: "POST",
					url:serviceUrl + "/goodExample/submitOpinion",
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
            }, function () {
            }, function () {
              
            }]
        });
    })
});

