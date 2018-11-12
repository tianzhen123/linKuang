
function getHttpPro(){
	//var http = "http://172.28.151.20:8080/partyconstrutproject/";
	var http = "https://dj.lykyjt.com:8898/partyconstrutproject/";
	return http;
}
function getImageUploadUrl(){
	var http = getHttpPro()+'infoMobile/upload';
	return http;
}
//推送:存储设备RegistrationID
function registID(){
	var reg = "";
	return {
		set:function (regID){
			reg = regID;
		},
		get:function(){
			return reg||"";
		}
	}
}
//图片居中
function imgCenter(){
	var frameId = document.getElementById("frame");
	var length_p =  $("#frame p").length;
	for(var i=0;i<length_p;i++){
		var p = frameId.getElementsByTagName("p")[i];//dom对象转换为jquery对象
		if($(p).find('img').length != 0){
			p.setAttribute('style', 'text-indent: 0');
		}
	}
}
function isNull(args){
	return args == null || args=="null" || args == undefined || args == "undefined" || args == "";
}
function getMyDate(str){
            var oDate = new Date(str*1),
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
}; 
//补0操作
function getzf(num){
      if(parseInt(num) < 10){
          num = '0'+num;  
      }  
      return num;  
}

/**
 * 返回正常时间戳
 * @param {Object} str 2000-01-01T08:08:08
 */
function getTimes(str){
	var d = new Date(str);
	var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
	return new Date(times).getTime();
}
