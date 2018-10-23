var viewModel={};
var data = "";
summerready = function(){
	data = summer.pageParam.count;
	var pageTitle = data.infocolumn_name||summer.pageParam.pageTitle;
	document.getElementById("pageTitle").innerHTML = pageTitle;
	
	viewModel = {
		title : ko.observable(data.title),
		publishtime : ko.observable(data.publishtime),
	}
	
	
    ko.applyBindings(viewModel);
    if(data.content.indexOf('<')==-1){
    	$('#frame').html($('#frame').html(data.content).text());
    }else{
    	$('#frame').html(data.content);
    }
    
	imgCenter();
    
}

function backClick(){
		summer.closeWin({});
}
//导航栏双击事件,(列表)置顶事件
function scrollToTop(){
	$('.um-content').animate({scrollTop: '0px'}, 200);
}
