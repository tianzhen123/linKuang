var viewModel={};
var data = "";
summerready = function(){
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
	viewModel = {
		title : ko.observable(data.title),
		name : ko.observable(data.name),
		content : ko.observable(data.content),
		time : ko.observable(data.time),
		def2 : ko.observable(data.def2),
	}
    ko.applyBindings(viewModel);
    
}
/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}

/**
 *关闭窗口
 */
function backClick() {
	summer.closeWin({});
}
