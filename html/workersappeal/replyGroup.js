function shareCancle() {
    UM.share.close();
}


$(function () {

    $("#fillReportBtn").on('click', function () {
        UM.actionsheet({
            title: '',  
            items: ['确认',''],
            callbacks: [function () {
                submitGeData();
            }, function () {
                
            }, function () {
               
            }]
        });
    })
 
});


//回复/提交
function submitGeData(){

    var approvalId=localStorage.approvalId;
    var taskId=localStorage.taskId;
	
	var opinion =  $("#opinion").val();//标题

	var obj={};
		obj.userId=localStorage.userid;
		obj.approvalId=approvalId; 
		obj.taskId=taskId;
		obj.opinion=opinion;	

	
	$.ajax({
	    type: "POST",
	    url: serviceUrl + "/workersAppeal/submitRead",
	    data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
	    success: function (res) {
	        if (res.sCode==200){
	        	forword("mywork"+localStorage.approvalId,"html/mywork/myworker.html");
	        } else {
	        	alert(res.msg);
	        }
	    } 
	});
}

