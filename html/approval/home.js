$(document).ready(function(){
	$("#home_daibai").click(function(){
		summer.openWin({
		    "id" : "exampleList",
		    "url" : "html/approval/approval.html"
		});
	});
	$("#geExampleList").click(function(){  
		summer.openWin({
		    "id" : "exampleList",
		    "url" : "html/goodexample/exampleList.html"
		});
	});
	$("#workerAppealList").click(function(){  
		summer.openWin({
		    "id" : "exampleList",
		    "url" : "html/workersappeal/appealList.html"
		});
	});
	$("#studyaid").click(function(){  
		summer.openWin({
		    "id" : "studyaid",
		    "url" : "html/studyaid/StudyList.html"
		});
	});
});