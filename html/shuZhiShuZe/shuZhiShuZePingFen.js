var viewModel={};
var data = "";
summerready = function(){
	data = summer.pageParam.count;
	//data = $summer.strToJson(data);
	//$summer.alert(data);
	
		viewModel = {
		code : ko.observable(data.code),
		name : ko.observable(data.name),
		post : ko.observable(data.post),
		duty : ko.observable(data.duty),
		submiter : ko.observable(data.submiter),
		selfconstruction : ko.observable(data.selfconstruction),
		positiontarget : ko.observable(data.positiontarget),
		reviewstatus : ko.observable(data.reviewstatus),
	}
	
    ko.applyBindings(viewModel);
    

}
function backCilck(){
	summer.closeWin({});
}

// 设置评审结果
function setReviewResult(params){
	$summer.alert(params);
	var name = params.reviewstatus;
	data.reviewresult = name;
	viewModel.reviewresult(params.result);
}

//选择结果
function selResult(){
	summer.openWin({
        "id" : "reference",
        "isKeep": true,
        "url" : "html/reference/reference.html"
    });
}

//保存点击事件
function saveClick(){
	var requestid = ""+getHttpPro()+"debriefingMobile/save";
	
	data.selfconstruction = document.getElementById("selfconstruction").value;
	data.positiontarget = document.getElementById("positiontarget").value;
	//data.reviewresult = document.getElementById("reviewresult").value;
	
	summer.post(requestid, data , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if (data.success == "success") {
			$summer.alert("保存成功");
			var jsfun = 'refush(".news");';
			summer.execScript({
							winId : 'shuZhiShuZe',
							script : jsfun
						});
			backCilck();
			
		} else {
			//$summer.alert("保存失败");
		}
	}, function(response) {//失败回调
		//$summer.alert(response);
	});
	
}