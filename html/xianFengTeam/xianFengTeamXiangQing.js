
summerready = function() {
	$summer.fixStatusBar($summer.byId('header'));
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
	if(data.zhanshileixing==1){
		$(".ziduan2").css('display','none');
	}else{
		$(".ziduan").css('display','none');
	}
    var ViewModel = function () {      
            };	
    var jsonArray = [
    {
        xingming:ko.observable(data.xingming),
        xingbie:ko.observable(data.xingbie),
        nianling:ko.observable(data.nianling),
        suozaidangzuzhi:ko.observable(data.suozaidangzuzhi),
        tupian:ko.observable(data.tupian),
        huodeshijian:ko.observable(data.huodeshijian),
        //guangrongshiji:ko.observable(data.guangrongshiji)
     },                    
    ];
                        
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel); 
	$("#guangrongshiji").html(data.guangrongshiji);

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


