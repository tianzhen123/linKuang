var flag = true;
summerready = function(){
	window.content = summer.pageParam.content;//单据详情
	window.chooseData = summer.pageParam.chooseData;//选择按钮数据
	var addBtn = document.querySelector('.addBtn');
	var textarea = document.querySelector('.textarea');
	addBtn.onclick = function(){
		switch (window.content.billstatus*1){
			case 2:window.content.approve_note0 = textarea.value;break;
			case 3:window.content.approve_note1 = textarea.value;break;
			default:window.content.approve_note = textarea.value;break;
		}
		
		commitClick();
	}
}
function backClick(){
	summer.closeWin({});
}
function commitClick(){
	var userCode = summer.getStorage("usercode");
	if(flag)setBillStatus(window.chooseData);
	setBillStatusName(window.content);
	var url;
	if(window.content.billstatus*1 == 5){
		url = getHttpPro()+'infoMobile/toapprove?userCode='+userCode+'';//发布
	}else{
		url = getHttpPro()+'infoMobile/save?userCode='+userCode+'';//除发布外的状态更新
	}
	var jsonArr = [];
	jsonArr[0] = window.content;
	var param = JSON.stringify(jsonArr);
	UM.showLoadingBar({
        "text" : "加载中",
        "icons" : "ti-loading"
    });
	$.ajax({
		url : url,
		type : 'post',
		data : param,
		dataType : 'json',
		contentType : 'application/json', 
		//可选参数，方便开发者设置请求的header
	    success:function(data){//成功回调
	    	flag = false;
	    	UM.hideLoadingBar();
	        summer.toast({
                 "msg" : "保存成功" 
            });
            
            summer.execScript({
				winId : 'html/examine/examine.html',
				script : 'getListData("'+0+'");'//运行时script：'mycall(13810012233)'
			});
			summer.closeWin({});
	    },error: function(error){ //失败回调
	    	flag = false;
	    	UM.hideLoadingBar();
	        summer.toast({
                 "msg" : "保存失败,请重试" 
            })
	    }
	    });
}
//设置单据状态
function setBillStatus(data){
	switch (data.statue){
				case 'pass': window.content.billstatus+=1;
					break;
				case 'reject': {
						window.content.billstatus = window.content.billstatus*1>1?1:0;
					}break;
				case 'discard' : window.content.billstatus = 6;
					break;
				case 'publish' : window.content.billstatus = 5;
					break;
			}
}
function setBillStatusName(data){
	switch (data.billstatus){
				case 0 : window.content.infostatus = '待提交';break;
				case 1 : window.content.infostatus = '待宣传干事审核';break;
				case 2 : window.content.infostatus = '待宣传副部长审核';break;
				case 3 : window.content.infostatus = '待宣传部长审核';break;
				case 4 : window.content.infostatus = '待宣传干事发布';break;
				case 5 : window.content.infostatus = '已发布';break;
				case 6 : window.content.infostatus = '不采用';break;
			}
}