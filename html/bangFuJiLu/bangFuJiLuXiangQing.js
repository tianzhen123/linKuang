var viewModel={};
var data = "";
summerready = function(){
	hp_slide();//滑动事件，放在最前面
	//获取前一个页面传来的数据
	data = summer.pageParam.count;
	//绑定数据
	viewModel = {
		name:ko.observable(data.name),
        pk_partyorg_name:ko.observable(data.pk_partyorg_name),
        sex:ko.observable(data.sex),
        idcode:ko.observable(data.idcode),
        department:ko.observable(data.department),
        post:ko.observable(data.post),
        difficultgrade:ko.observable(data.difficultgrade),
        difficultinfo:ko.observable(data.difficultinfo),
        difficulttime:ko.observable(data.difficulttime),
        def1:ko.observable(data.def1),
        remarks:ko.observable(data.remarks),
	}
	//执行绑定
    ko.applyBindings(viewModel);
    
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