var ViewModel = function() {
	};
var viewModel = new ViewModel();
var jsonArray = [];
var searchType = "";
var pageIndex = 0;
var flag_selector_time=false;
var selectorStart=transformTime(getCurrentDate(-1));
var selectorEnd=transformTime(getCurrentDate(1));
summerready=function(){
	
	hp_slide();//滑动事件，放在最前面
	
	document.getElementById("start_time").value=getCurrentDate(-1);
	document.getElementById("end_time").value=getCurrentDate(1);
	
	$('ul.um-tabbar-switch  Li').click(function() {
		$(this).addClass('active').siblings('.active').removeClass('active');
		var tar = $(this).attr('data-tar');
		$(tar).addClass('active').siblings('.active').removeClass('active');
		searchType = tar;
		pageIndex = 0;
		if(tar==".product"){
			$(".falg_time").css("display","none");
		}else{
			$(".falg_time").css("display","block");
		}
		
		myRefresh(tar,0);
	});

	$(function () {
		$('.scroller-date').scroller('destroy').scroller({
			preset: 'date',
			theme: "ios7",
			mode: "scroller",
			display: "bottom",
			animate: ""
		});	
	});



	//Knockout绑定
	
	/*渲染的数据*/

	viewModel.data = ko.observableArray([]);
	viewModel.data2 = ko.observableArray([]);
	ko.applyBindings(viewModel);



	var listview = UM.listview("#listview");
	var listview2 = UM.listview("#listview2");
	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "minShengTongDaoXiangQing",
			"url" : "html/minShengTongDao/minShengTongDaoXiangQing.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data,
				"performstatus":".news",
			}
		});
	});
	listview2.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data2()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "minShengTongDaoXiangQing",
			"url" : "html/minShengTongDao/minShengTongDaoXiangQing.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data,
				"performstatus":".product",
			}
		});
	});
	
	
	$("#newApplication").on("click", function(sender, args) {
		//点击日历，时间选择显示出来
		$("#selector_time").toggle(function(){
			if(flag_selector_time==true){
				flag_selector_time=false;
			}else{
				flag_selector_time=true;
			}
		});
		
	});
	$("#event_time").on("click", function(sender, args) {
		if(flag_selector_time==true){
			flag_selector_time=false;
			$("#selector_time").toggle();
			
		}
	});
	$("#submit_time").on("click",function(sender,args){
		selectorStart=transformTime($("#start_time").val());
		selectorEnd=transformTime($("#end_time").val());
		$("#selector_time").toggle(function(){
			if(flag_selector_time==true){
				flag_selector_time=false;
			}else{
				flag_selector_time=true;
			}
		});
		
		myRefresh(".news",0);
	});
	
	getUserInfo2();//先获取用户，在刷新
	//刷新（停用）	
	/*searchType = ".news";
	myRefresh(".news",0);*/
	
	
}
function function_rightSlide(){
	summer.closeWin();
}
function transformTime(time){
	var timeArray = time.split("/");
	var timeStr = "";
	var length=timeArray.length;
	for(var i=0;i<length-1;i++){
		temp=timeArray[i]+"-";
		timeStr+=temp;
	}
	timeStr+=timeArray[length-1];
	return timeStr;
}

function myRefresh(button,load) {
	
	$("#loading").css("display","block");
	$(".Artical").hide();

	var requestid = "";
	var viewmodel = "";

	switch (button) {
			case ".news":
					requestid = ""+getHttpPro()+"mstd/query";
					//requestid = "http://10.176.2.70:8080/partyconstrutproject/mstd/query";
					viewmodel = viewModel.data;
				
				break;
			case ".product":
					requestid = ""+getHttpPro()+"mstd/querypizhu";
					//requestid = "http://10.176.2.70:8080/partyconstrutproject/mstd/querypizhu";
					viewmodel = viewModel.data2;
					
				break;
	}
	var json = {
		//"pageIndex":pageIndex,
		//"pageSize":30,
		//"sortField":"ts",
		//"sortField":"startTime",
		//"sortDirection":"desc",
		"start":selectorStart.toString(),
		"end":selectorEnd.toString(),
	}

	summer.post(requestid, json , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if(load == 0){
			viewmodel.removeAll();
			
		}
		if (data.success == "success") {
			jsonArray = data.detailMsg.data.data;
			
			var count = jsonArray.length;
			for (var k = 0; k < count; k++) {
				var startTime = jsonArray[k].startTime;//编辑时间
				if(startTime != null && startTime.replace(/\s/g,'')!=""){
					jsonArray[k].startTime = formatDate(startTime);
				}
				var time_leader = jsonArray[k].time_leader;//编辑时间
				if(time_leader != null && time_leader.replace(/\s/g,'')!=""){
					jsonArray[k].time_leader = time_leader;
				}
				var state = jsonArray[k].state;
				jsonArray[k].state = changeImg(state);
				viewmodel.push(jsonArray[k]);
			}
			$("#loading").css("display","none");
			$(".Artical").show();
			
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert(response);
	});

}

function changeImg(state_apeal){
	var url_img = "";
	
	if(state_apeal=="run"){
		url_img = "../../img/minShengTongDao_wait.png";
	}else if(state_apeal=="end"){
		url_img = "../../img/minShengTongDao_ok.png";
	}else if(state_apeal == null || state_apeal.replace(/\s/g,'')==""){
		url_img = "../../img/minShengTongDao_others.png";
	}else{
		url_img = "../../img/minShengTongDao_no.png";
	}
	return url_img;
}
function restoreImg(state_img){
	var state_apeal = "";
	if(state_img=="../../img/minShengTongDao_wait.png"){
		state_apeal = "run";
	}else if(state_img=="../../img/minShengTongDao_ok.png"){
		state_apeal = "end";
	}else if(state_img=="../../img/minShengTongDao_others.png"){
		state_apeal = "run";
	}else if(state_img=="../../img/minShengTongDao_no.png"){//拒绝
		state_apeal = "no";
	}
	return state_apeal;
}

function formatDate(str) {
	var date = new Date(str);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    
    var currentdate = date.getFullYear() + seperator1 + addZero(month) + seperator1 + addZero(strDate)
            + " " + addZero(strHours) + seperator2 + addZero(strMinutes) + seperator2 + addZero(strSeconds);
  
    return currentdate;
}

function getCurrentDate(date_add) {
	
	var date = new Date();
    var seperator1 = "/";
    var month = date.getMonth() + 1;
    var strDate = date.getDate()+date_add;
    
    var currentdate = date.getFullYear() + seperator1 + addZero(month) + seperator1 + addZero(strDate);
  
    return currentdate;
}
function addZero(time){
	if(parseInt(time) < 10){  
        time = '0'+time;  
     }  
     return time;
}

function backClick(){
	summer.closeWin();
}
function getUserInfo2(){
	summer.setStorage("host", getHttp());
	
	var code = summer.pageParam.code;
	var requestip = ""+getHttpPro()+"friendspaceadaptorcontroller/getUserinfo";
	summer.post(requestip,{"code":code},//可选参数，方便开发者设置请求的header
        {
        "Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
        }, 
    	function(response){//成功回调
        	var data = $summer.strToJson(response.data);
        	data = data.data;
			//summer.setStorage("userInfo", data);
			localStorage.setItem("userInfo",data);
			
			searchType = ".news";
			myRefresh(".news",0);
        },
    	function(response){ //失败回调
    	
    });
}