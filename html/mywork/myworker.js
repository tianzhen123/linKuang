$(function () {
	UM.picker("#select1", {preset:"select"});
	$("#select1").on('change',function(){
		var select1 = $(this).val();
		search(select1);
	});
	
	$("#searchBtn").click(function(){
		var select1 = $("#select1").val();
		search(select1);
	});

});

//筛选条件请求接口服务方法
function search(select1){
	//获取当前是待审批还是已审批
	var modelIndex = localStorage.modelIndex;
	if(modelIndex == 0){
		pendingPageIndex = 0;
		viewModel.data0.removeAll();
		getPendingDataList();
	}else if(modelIndex == 1){
		alreadyPageIndex = 0;
		viewModel.data1.removeAll();
		getAlreadyDataList();
	}
	
	
	
	
}


