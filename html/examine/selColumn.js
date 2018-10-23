var param,winID,viewModel;
summerready=function(){
	winID = summer.pageParam.winID;
	viewModel = {
		customerList : ko.observableArray(),
		closeWin : function() {
			summer.closeWin();
		},
		lineClick : function(data) {
			summer.execScript({
				winId : winID,
				script : 'selColumnCallBack(' + $summer.jsonToStr(data) + ');' //运行时script：'mycall(13810012233)'
			});
			summer.closeWin();
		},
	}
	ko.applyBindings(viewModel);
	loading();
}
function loading(){
			UM.showLoadingBar({
                "text" : "加载中",
                "icons" : "ti-loading"
            });
			var url = getHttpPro()+'infoMobile/loadEnum';
		    summer.ajax({
                "header":{Authorization: "OAuth2: token"},
                "type":"get",
                "url":url,
            }, function(response){
            	UM.hideLoadingBar();
            	var result = $summer.strToJson(response.data);
            	if(result.success == 'success'){
            		viewModel.customerList(result.detailMsg.lmenumdata);
            	}else{
	                summer.toast({
	                     "msg" : "查询失败" 
	                })
            	}
                console.log(response.data);
            }, function(response){ 
            	UM.hideLoadingBar();
                summer.toast({
                     "msg" : "查询失败" 
                })
            });
            UM.hideLoadingBar();
}
function backClick(){
	summer.closeWin({});
}