
function backClick(){
	summer.closeWin({});
}
summerready = function(){
	
	var versionInfo = summer.getAppVersion();//返回字符串类型
	var version  = JSON.parse(versionInfo);//转换为json
	$('.version').text(version.versionName);
	
}