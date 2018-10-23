var data= "";
var performstatus="";
summerready = function(){
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
	performstatus = summer.pageParam.performstatus;
   
  	$("#look_shenPi").on("click",function(sender,args){
		$("#shenPi").toggle();
	
	});
    
    var title = data.f20160802193042vmHFhPtpbc;
    $('#title').html(title);
    var content = data.f20160802193053FjctEhHn9D;
    $('#content').html(content); 
    var task = data.task;
    $('#task').html(task);   
    var startTime = data.startTime;
    $('#startTime').html(startTime); 
	var fimageA = data.imgList;
	var s = "";
	for(var i = 0; i<fimageA.length;i++){
		if(fimageA[i] != null && fimageA[i].replace(/\s/g,'')!=""){//不为空
			s+= "<img src=\""+fimageA[i]+"\" style=\"padding: 5px 28px;max-width: 100%;width: 100%;\"/>";
		}
	}
	$('#img').html(s);
	
    
    if(performstatus==".news"){
    	init_data();

		$("#submit").on("click", function(sender, args) {
			//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
			var value_hasNull = hasNull();
			if(value_hasNull == true){
				hp_alert("请填写批注信息！");
			}else{
				saveClick();
			}
		});
	}else{
	
		
	    var comment_leader = data.comment_leader;
	    $('#comment_leader').html(comment_leader); 
	    var name_leader = data.name_leader;
	    $('#name_leader').html(name_leader); 
	    var time_leader = data.time_leader;
	    $('#time_leader').html(time_leader); 
		
		$("#comment_leader").attr("readOnly","true");
		$("#submit").hide();
	}
}

/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}

function init_data(){
	var time = getCurrentDate();//获取当前时间
	var uerInfo = localStorage.getItem("userInfo");
	data.time_leader= time;
	data.name_leader= uerInfo.name;
	data.mobile_leader= uerInfo.mobile;
	data.comment_leader="";
    var name_leader = data.name_leader;
    $('#name_leader').html(name_leader); 
    var time_leader = data.time_leader;
    $('#time_leader').html(time_leader); 
	
}
function hasNull(){
	var content = $("#comment_leader").val();
	if( content == null || content.replace(/\s/g,'')==""){//去除空格  replace(/\s/g,'')
		return true;
	}else{
		return false;
	}
}


/**
 * 网络添加事件
 */
function saveClick(){
	var requestid = ""+getHttpPro()+"mstd/save";
	
	//var requestid = "http://10.176.2.70:8080/partyconstrutproject/mstd/save";
	
	//往json插入数据
	data.comment_leader = $("#comment_leader").val();
    
	//把json传给服务器
	summer.post(requestid, data , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调

		var data_response = $summer.strToJson(response.data);
		if (data_response.flag == "success") {
			hp_alert("提交成功",backClick);
			/*var jsfun = 'myRefresh(\".news\",0);';
			summer.execScript({
				winId : 'minShengTongDao',
				script : jsfun
			});*/
		} else {
		
		}
	}, function(response) {//失败回调
	
	});
}

function getCurrentDate() {
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + addZero(strDate)
            + " " + addZero(strHours) + seperator2 + addZero(strMinutes) + seperator2 + addZero(strSeconds);
    return currentdate;
}
function addZero(time){
	if(parseInt(time) < 10){  
        time = '0'+time;  
     }  
     return time;
}
/**
 *关闭窗口 
 */
function backClick(){
		summer.closeWin({});
}