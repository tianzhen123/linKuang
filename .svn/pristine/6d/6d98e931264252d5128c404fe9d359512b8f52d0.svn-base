/**
 * 封装的共用的方法，可按需新增方法
 * 用友能源   韩鹏
 * 2018.01.05
 */

function hp_alert(alertTitle,event){
	
    if(event==null){
    	UM.alert({
	        "text" : alertTitle,
	        "btnText" : ["取消","确认"],
	        "overlay" : true,
	    });
	    
    }else{
    	UM.alert({
	        "text" : alertTitle,
	        "btnText" : ["取消","确认"],
	        "overlay" : true,
	        "ok" :function(){
	            event();
	        }
	    });
    
    }
}


function hasNull(){
	var length = $(".flag_hasNull").length;
	var flag = false;
	for(var i=0;i<length;i++){
		var temp = $(".flag_hasNull").eq(i).val();
		if(temp == null || temp.replace(/\s/g,'')==""){//去除空格  replace(/\s/g,'')
			flag =  true;
			return flag;
		}else{
			flag =  false;
		}
	}
	return flag;
}


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
function pictureInit(pic_url){
	if(pic_url == null || pic_url.replace(/\s/g,'')==""){
		pic_url = "../../img/pic_init.png";
		return pic_url;
	}else{
		return pic_url;
	}
}





