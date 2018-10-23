var viewModel={};
var data = "";
var flag = false;// false非编辑状态
var artEditor;
summerready = function(){
	data = summer.pageParam.count;
	var pageTitle = summer.pageParam.pageTitle;
	document.getElementById("pageTitle").innerHTML = pageTitle;
	
	viewModel = {
		title : ko.observable(data.title),
		ts : ko.observable(formatDate(data.ts)),
	}
	
	
    ko.applyBindings(viewModel);
    //$("#time span").html(formatDate(data.ts))
	var content = '<p style="text-indent: 2em; margin-top: 0px; margin-bottom: 0px; color: rgb(62, 62, 62); font-family: 宋体; font-size: 14px; '+
			'white-space: normal; line-height: 1.5;"><span style="font-size: 16px; font-family: 微软雅黑, "><img src="https://dj.lykyjt.com:8898/partyconstrutproject/ueditor/jsp/upload/image/20180628/1530171462759041857.jpg"/>'
			+'</span></p><p style="text-indent: 2em; margin-top: 0px; margin-bottom: 0px; color: rgb(62, 62, 62); font-family: 宋体; font-size: 14px; white-space: normal; line-height: 1.5;"><span style="font-size: 16px; font-family: 微软雅黑, ">活动现场（孟凯 摄）</span></p><p style="text-indent: 2em; margin-top: 0px; margin-bottom: 0px; color: rgb(62, 62, 62); font-family: 宋体; font-size: 14px; white-space: normal; line-height: 1.5;"><span style="font-size: 16px; font-family: 微软雅黑, "><span style="font-size: 16px; font-family: 仿宋_GB2312;"></span> </span></p><p style="text-indent: 2em; margin-top: 0px; margin-bottom: 0px; color: rgb(62, 62, 62); font-family: 宋体; font-size: 14px; white-space: normal; line-height: 1.5;"><span style="font-size: 16px; font-family: 微软雅黑, "> 在建党97周年之际，为进一步增强党员的身份意识、责任意识和宗旨意识，增强党员的光荣感、责任感和使命感，激励学院广大党员干部、教师不忘初心，牢记使命，更好地发挥党员的先锋模范作用，6月24日，技师学院党委开展了党员集体生日主题教育活动，为学院所有入党时间为6月份的党员送上组织的关怀与温暖。</span></p><p style="text-indent: 2em; margin-top: 0px; margin-bottom: 0px; color: rgb(62, 62, 62); font-family: 宋体; font-size: 14px; white-space: normal; line-height: 1.5;"><span style="font-size: 16px; font-family: 微软雅黑, "> 活动中，党员们重温了入党誓词，观看了党性教育视频，并结合自身党性修养和工作实际，畅谈了入党动机、党性提升、党性锻炼等方面的心得体会。通过交流，党员们一致认为，要增强党员政治生日的仪式感，时刻不忘自己的党员身份、入党初心和政治使命；要进一步增强宗旨意识和责任意识，在工作和生活中时刻以党员的标准严格要求自己，立足本职岗位当标杆、作贡献；要谨记“入党为什么？在党干什么？给党留什么？”，坚定理想信念，永远跟党走。</span></p><p style="text-indent: 2em; margin-top: 0px; margin-bottom: 0px; color: rgb(62, 62, 62); font-family: 宋体; font-size: 14px; white-space: normal; line-height: 1.5;"><span style="font-size: 16px; font-family: 微软雅黑, "> 在《没有共产党就没有新中国》的嘹亮歌声中，党员们围在硕大的生日蛋糕前，共同为党祈福。该学院党委还为党员们送上了节日的祝福和红色  礼  物。</span></p><p><br/></p>';
    
    if(data.content.indexOf('<')==-1){
    	$('#frame').html($('#frame').html(data.content).text());
    }else{
    	$('#frame').html(data.content);
    }
	imgCenter();
    
}
//返回
function backClick(){
		//var jsfun = 'function_pullDown();';
		/*summer.execScript({
		    winId: 'learnOutcomes',
		    script: jsfun
		});*/
		summer.closeWin({});
}

function editClick(){
	if(flag){//保存
		var _content = artEditor.getContent();
		console.log(_content);
		data.content = _content;
		artEditor.destory();
		flag = false;
		$('.edit').text("修改");
		commit(data);
	}else{//修改
		artEditor = new Eleditor({
					el: '#frame',
					upload:{
						server: '/upload.php',
					},
					toolbars: [
				      'insertText',
				      'editText',
				      'undo',
				      'cancel'
				    ],
				});
			flag = true;
			$('.edit').text("保存");
			console.log(flag);
	}
}
function commit(data){
	var list = [];
	list[0] = data;
	var url  = "http://172.20.10.4:8080/partyconstrutproject/infoDiffusion/msave";
	var json = JSON.stringify(list);
	$.ajax({
		url : url,
		type : 'post',
		data : json,
		dataType : 'json',
		contentType : 'application/json', 
		//可选参数，方便开发者设置请求的header
	    success:function(data){//成功回调
	        summer.toast({
                 "msg" : "保存成功" 
            });
	    },error: function(error){ //失败回调
	        summer.toast({
                 "msg" : "保存失败,请重试" 
            })
	    }
	    });
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
    
   	//拼时间
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + addZero(strDate);
              //  + " " + addZero(strHours) + seperator2 + addZero(strMinutes) + seperator2 + addZero(strSeconds);
    return currentdate;
}
function addZero(time){
	if(parseInt(time) < 10){
        time = '0'+time;  
     }  
     return time;
}