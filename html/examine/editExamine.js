var flag = 0,viewModel,param;//flag是否选择提交
summerready = function(){
	
	param = summer.pageParam.param;
	var addBtn = document.querySelector('.addBtn');
	
	document.querySelector('.title').value = param.title;
	document.querySelector('.summary').value = param.summary;
	document.querySelector('.tag').value = param.tag;
	document.querySelector('.create-time').value = getMyDate(param.create_time);
	
	if(!isNull(param.content)){
		if(param.content.indexOf('<')==-1){
	    	$('.editor').html($('.editor').html(param.content).text());
	    }else{
	    	$('.editor').html(param.content);
	    }
	    imgCenter();
    }
	
	
	addBtn.onclick = function(){
			param.title = document.querySelector('.title').value;
			param.summary = document.querySelector('.summary').value;
			param.tag = document.querySelector('.tag').value;
			param.create_time = new Date(document.querySelector('.create-time').value).getTime();
			param.content = $('.editor').html();
			commit(param);
	}
	viewModel = {
		column : ko.observable(param.def2),
		selColumn : function(){
			summer.openWin({
                "id" : "selColumn",
                "url" : "html/examine/selColumn.html",
                "pageParam" : {
                	"winID" : "editExamine"
                }
            });
		}
	}
	ko.applyBindings(viewModel);
}

function backClick(){
	summer.closeWin({});
}
//选择栏目后的回调
function selColumnCallBack(data){
	viewModel.column(data.name);
	param.def2 = data.name;
	param.infocolumn = data.value;
}
function commit(data){
	var list = [];
	list[0] = data;
	var url  = getHttpPro()+'infoMobile/toapprove';
	var json = JSON.stringify(list);
	UM.showLoadingBar({
        "text" : "加载中",
        "icons" : "ti-loading"
    });
	$.ajax({
		url : url,
		type : 'post',
		data : json,
		dataType : 'json',
		contentType : 'application/json', 
		//可选参数，方便开发者设置请求的header
	    success:function(data){//成功回调
	    	UM.hideLoadingBar();
	        summer.toast({
                 "msg" : "保存成功" 
            });
            var jsfun = 'backPageLoad('+$summer.jsonToStr(list[0])+');';
			summer.execScript({
			    winId: 'examineDet',
			    script: jsfun
			});
			summer.closeWin({});
	    },error: function(error){ //失败回调
	    	UM.hideLoadingBar();
	        summer.toast({
                 "msg" : "保存失败,请重试" 
            })
	    }
	    });
}
function getMyDate(str){
			if(str){
				if(CheckDateTime(str)){
					var date = new Date(str).format("yyyy-MM-dd");
					return date;
				}
			}
			var ODate;
			oDate = new Date();
			if(str) oDate = new Date(str*1);
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay);//最后拼接时间  
            return oTime;
}; 
//补0操作
function getzf(num){
      if(parseInt(num) < 10){
          num = '0'+num;  
      }  
      return num;  
}
function CheckDateTime(str){
  var reg=/^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/; 
  var r=reg.test(str);
  return r;
}
function imgCenter(){
	var frameId = document.getElementById("editorBody");
	var length_p =  $("#editorBody p").length;
	for(var i=0;i<length_p;i++){
		var p = frameId.getElementsByTagName("p")[i];//dom对象转换为jquery对象
		if($(p).find('img').length != 0){
			p.setAttribute('style', 'text-indent: 0');
		}
	}
}