var ViewModel = function() {
};
var viewModel = new ViewModel();
var data= {};
var userInfo;
summerready = function() {
	
	hp_slide();//滑动事件，放在最前面
	$("#submit").on("click", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var value_hasNull = hasNull();
		if(value_hasNull == true){
			hp_alert("请填写标题和内容！");
		}else{
			saveClick();
		}
		
	});
	
	$("#look_liuYanJIlu").on("click", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		summer.openWin({
			"id" : "liuYanBan",
			"url" : "html/liuYanBan/liuYanBan.html",
			"isKeep" : true,
		});
	});
	
	init();
}
function function_rightSlide(){
	summer.closeWin();
}
function init(){
	userInfo = localStorage.getItem("userInfo");
	data.personName = "匿名";
	data.mobile = userInfo.mobile;
	data.def1 = "是";
	anonymous();
	
	initTime();
}
function initTime(){
	var time = getCurrentDate();
	viewModel={
		time: ko.observable(time),
	}
	ko.applyBindings(viewModel, document.getElementById('time'));
}
function anonymous(){

	$(".um-check-group").find("input:radio").on("change",function(){
	    if(this.checked) {
	        if($(this).val()==1){
	        	data.personName = userInfo.name;
	        	data.def1 = "否";
	        }else{
	        	data.personName = "匿名";
	        	data.def1 = "是";
	        }
	    }
	})
}
function hasNull(){
	var title = $("#title").val();
	var content = $("#content").val();
	if(title == null || content == null || title.replace(/\s/g,'')=="" || content.replace(/\s/g,'')==""){//去除空格  replace(/\s/g,'')
		return true;
	}else{
		return false;
	}
}
function saveClick(){
	var requestid = ""+getHttpPro()+"message/saveJson";
	
	//var requestid = "https://dj.lykyjt.com:8898/partyconstrutproject/message/saveJson";
	
	
	
	data.messageTitle = $("#title").val();
	data.message = $("#content").val();
	var time5 = $("#time").text();
	var resData = time5.replace(/-/g, '/'); 
	data.time = Date.parse(resData);
	
	
	//把json传给服务器
	summer.post(requestid, data , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data_response = $summer.strToJson(response.data);
		
		if (data_response.success == "success") {
			resetData();
			hp_alert("提交成功",openToLiuYanBan);
		
			/*var jsfun = 'myRefresh(0);';
			summer.execScript({
				winId : 'liuYanBan',
				script : jsfun
			});
			*/
		} else {
			//$summer.alert("保存失败");
		}
	}, function(response) {//失败回调
		//$summer.alert("网络错误");
	});
	
}
function resetData(){
	$("#title").val("");
	$("#content").val("");
	initTime();
}
function openToLiuYanBan(){
	summer.openWin({
		"id" : "liuYanBan",
		"url" : "html/liuYanBan/liuYanBan.html",
		"isKeep" : true,
			
	});

}
function getCurrentDate() {
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    
    var currentdate = year + seperator1 + addZero(month) + seperator1 + addZero(strDate)
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
function backClick() {
	summer.closeWin({});
}