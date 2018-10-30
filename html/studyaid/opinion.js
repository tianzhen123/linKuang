function shareCancle() {
    UM.share.close();
}

$(function () {

	//var obj = getOrgLevel();
	var flowId = localStorage.flowId;
	if(flowId == activiti.sa_group_approval && 'AGREE' == localStorage.studyaidState){
		$("#money").show();
		
	//驳回时不展示帮扶金额
	}else if('DISAGREE' == localStorage.studyaidState || flowId == activiti.sa_union_approval || flowId == activiti.sa_union_approval_3 || flowId == activiti.sa_union_approval_4 ){
		$("#money").hide();
	}
	
	//只有二级工会审批的时候才展示
	if(flowId == activiti.sa_union_approval){
		$("#secondLevelOpinion").show();
	}else{
		$("#secondLevelOpinion").hide();
	}

    $('.phone').on('click', function () {
        UM.actionsheet({
            title: '',  
            items: ['确认'], 
            callbacks: [function () {
            	var hlepAmount = $("#hlepAmount").val()
            	if(flowId == activiti.sa_group_approval && 'AGREE' == localStorage.studyaidState){
                	if('' == hlepAmount){
		                alert("请您输入帮扶金额");
		                return false;
                	}
                }
            	var obj = {};
            	obj.userId=localStorage.userid;
   				obj.approvalId=localStorage.approvalId;
                obj.opinion = $("#opinion").val(); 
                obj.hlepAmount = hlepAmount; 
                obj.taskId = localStorage.taskId; 
                obj.state = localStorage.studyaidState; 
               	$.ajax({//意见
					type: "POST",
					url:serviceUrl + "/studyAid/submitOpinion",
					data:JSON.stringify(obj),
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',
					success: function (res) {
						if(res.sCode == 200){
							forword("myworky"+localStorage.approvalId,"html/mywork/myworker.html");
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
