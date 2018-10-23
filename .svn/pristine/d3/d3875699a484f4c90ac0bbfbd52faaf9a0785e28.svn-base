
summerready = function(){
	var param = summer.pageParam.param;
	var title = summer.pageParam.title;
	$('.title').text(title);
	var commit = document.querySelector('.header-right'),
	startTime = document.querySelector('.startTime'),
	endTime = document.querySelector('.endTime');
	//生成二维码
	commit.onclick = function(){
		if(isNull(startTime.value)||isNull(endTime.value)){
			summer.toast({
                 "msg" : "请选择时间" 
            })
            return;
		}
		param.startTime = getTimes(startTime.value);
		param.endTime = getTimes(endTime.value);
		
		if(param.startTime-param.endTime > 0){
			summer.toast({
                 "msg" : "开始时间应早于结束时间" 
            })
            return;
		}
		
		summer.openWin({
            "id" : "qrCode",
            "url" : "html/lianZhengJianShe/qrCode.html",
            "pageParam" : {
                "param" : param,
            }
        });
	}
}
function backClick(){
	summer.closeWin({});
}
