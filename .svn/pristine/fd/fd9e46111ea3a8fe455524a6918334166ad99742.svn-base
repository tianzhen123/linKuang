var viewModel={};
var data = "";
summerready = function(){
	data = summer.pageParam.count;
	//data = $summer.strToJson(data);
	//$summer.alert(data);
	
		viewModel = {
		title : ko.observable(data.title),
		ts : ko.observable(data.ts),
		fimage : ko.observable(data.fimage),
		//content : ko.observable(data.content),
	}
	
	$('#frame').html(data.content);
	
    ko.applyBindings(viewModel);
    
}


function backClick(){
		summer.closeWin({});
}