var viewModel={};
var data = "";
summerready = function(){
	$summer.fixStatusBar($summer.byId('header'));
	data = summer.pageParam.param;
	var pageTitle = data.pageTitle || data.def2;
	document.getElementById("pageTitle").innerHTML = pageTitle;
	var ts = getMyDate(data.ts);
		viewModel = {
		title : ko.observable(data.title),
		ts : ko.observable(getMyDate(data.ts)),
	}
	
	
    ko.applyBindings(viewModel);
    
    $('#frame').html($('#frame').html(data.content).text());
	imgCenter();
    
}

function backClick(){
		summer.closeWin({});
}