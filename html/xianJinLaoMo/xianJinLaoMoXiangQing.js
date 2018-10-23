
summerready = function() {
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
    
    var ViewModel = function () {            
            };	
    var jsonArray = [
    {                
    	tupian:ko.observable(data.tupian),
        x_name:ko.observable(data.x_name),
        x_sex:ko.observable(data.x_sex),
        xzc:ko.observable(data.xzc),
        zzmm:ko.observable(data.zzmm),
        gzdw:ko.observable(data.gzdw),
        
     },                    
    ];
                        
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel); 
	
	$("#guangrongshiji").html(data.jysj);

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


