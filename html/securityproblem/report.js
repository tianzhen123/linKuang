
function backClick(){
  	summer.closeWin({});
}

$(function(){
	
	$("#title").text(localStorage.title);

	busiTypeSpApproval("fillReportBtn",localStorage.flowId,localStorage.agreeOrDisagree);
})