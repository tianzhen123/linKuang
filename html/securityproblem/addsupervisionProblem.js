summerready = function(){
	 $('#addSupervisionProblemSubmit').on('click',function(){
	 	summer.openWin({
		    "id" : "approval",
		    "url" : "html/problemsList/problemsList.html"
		});
	 });
}
function backClick(){
  	summer.closeWin({});
}

