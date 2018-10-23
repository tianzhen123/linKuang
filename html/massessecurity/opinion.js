summerready = function(){
	 $('#rectificationConfirm').on('click',function(){
	 	summer.openWin({
		    "id" : "reviewList",
		    "url" : "html/reviewList/reviewList.html"
		});
	 });
}

function backClick(){
  	summer.closeWin({});
}