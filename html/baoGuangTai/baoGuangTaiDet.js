var viewModel={};
var data = "";
summerready = function(){
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
	var pageTitle = summer.pageParam.pageTitle;
	document.getElementById("pageTitle").innerHTML = pageTitle;
	//data = $summer.strToJson(data);
	//$summer.alert(data);
	
		viewModel = {
		title : ko.observable(data.title),
		ts : ko.observable(data.ts),
		//content : ko.observable(data.content),
	}
	
	
	
    ko.applyBindings(viewModel);
    $('#frame').html(data.content);
	imgCenter();
    
}
/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}

function backClick(){
		summer.closeWin({});
}