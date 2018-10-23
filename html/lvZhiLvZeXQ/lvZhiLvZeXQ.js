var jsonArray = [];
summerready = function(){
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
	
	viewModel = {
		code : ko.observable(data.code),
		name : ko.observable(data.name_name),
		post : ko.observable(data.post),
		duty : ko.observable(data.duty),
		submiter : ko.observable(data.submiter),
		selfconstruction : ko.observable(data.selfconstruction),
		positiontarget : ko.observable(data.positiontarget),
		partyscore : ko.observable(data.partyscore),
		totalscore : ko.observable(data.totalscore),
		rewardspunish : ko.observable(data.rewardspunish),
		evaluate : ko.observable(data.evaluate),
		data : ko.observableArray(jsonArray),
	}
	
	 ko.applyBindings(viewModel);
	 netService();
}
/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}	
//网络请求
function netService(){
	var requestid = ""+getHttpPro()+"performdutyMobile/dflist";
	summer.post(requestid, {pk_performduty:data.pk_performduty} , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			jsonArray = jsonArray.data.content;
			for (var k = 0; k < count; k++) {
				viewModel.data.push(jsonArray[k]);
			}

		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert("网络错误");
	});
}

function backClick(){
	summer.closeWin({});
}