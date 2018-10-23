$(document).ready(function(){
	$("#GEVIEW").click(function(){
		localStorage.xuanze = 'GEVIEW';
		summer.openWin({
		    "id" : "gexampleList",
		    "url" : "html/goodexample/exampleList.html"
		});
	});
	$("#SAVIEW").click(function(){
		localStorage.xuanze = 'SAVIEW';
		summer.openWin({
		    "id" : "saexampleList",
		    "url" : "html/studyaid/exampleList.html"
		});
	});
	$("#MYWORK").click(function(){
		summer.openWin({
		    "id" : "myworker",
		    "url" : "html/mywork/myworker.html"
		});
	});
	$("#BUSITYPEMS").click(function(){
		localStorage.xuanze = 'busitypems';
		summer.openWin({
		    "id" : "busitypems",
		    "url" : "html/massessecurity/approvalPendingList.html"
		});
	});
	$("#WORKERS").click(function(){
		localStorage.xuanze = 'workers';
		summer.openWin({
		    "id" : "workers",
		    "url" : "html/workersappeal/appealList.html"
		});
	});
	$("#BUSITYPESP").click(function(){
		localStorage.xuanze = 'busitypesp';
		summer.openWin({
		    "id" : "workers",
		    "url" : "html/securityproblem/approvalPendingList.html"
		});
	});
	$("#HELPWORKERS").click(function(){
		localStorage.xuanze = 'HELPWORKERS';
		summer.openWin({
		    "id" : "workers",
		    "url" : "html/helpworkers/helpWorkersList.html"
		});
	});
});