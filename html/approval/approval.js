$(document).ready(function(){
	$("#goodExample").click(function(){
	 	summer.openWin({
		    "id" : "exampleList",
		    "url" : "html/goodexample/approvalPendingList.html"
		});
	});
	$("#studyAid").click(function(){
	 	summer.openWin({
		    "id" : "exampleList",
		    "url" : "html/studyaid/approvalPendingList.html"
		});
	});
	$("#helpworkers").click(function(){
	 	summer.openWin({
		    "id" : "helpworkers",
		    "url" : "html/helpworkers/approvalPendingList.html"
		});
	});
	$("#massesSecurity").click(function(){
	 	summer.openWin({ 
		    "id" : "massessecurity",
		    "url" : "html/massessecurity/approvalPendingList.html"
		});
	});
	$("#securityProblem").click(function(){
	 	summer.openWin({ 
		    "id" : "securityProblem",
		    "url" : "html/securityproblem/approvalPendingList.html"
		});
	});
	
});

function backClick(){
  	summer.closeWin({});
}