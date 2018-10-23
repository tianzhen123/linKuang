
summerready = function() {
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
    
    var ViewModel = function () {            
            };	
   
    var jsonArray = [
    {                
    	photo:ko.observable(data.photo),
        name_name:ko.observable(data.name_name),
        excellent_org_name:ko.observable(data.excellent_org_name),
        pk_org_name:ko.observable(data.pk_org_name),
        watchword:ko.observable(data.watchword),
        
     },                    
    ];
                        
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel); 
	
	$("#guangrongshiji").html(data.deed);

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


