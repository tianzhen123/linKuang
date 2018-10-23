var flag = 0,viewModel,param;//是否选择提交
var chooseData = {
	ganShiShenHe:[{
		name:"通过",
		statue:"pass",
	},{
		name:"驳回",
		statue:"reject",
	},{
		name:"废稿",
		statue:"discard",
	},{
		name:"发布",
		statue:"publish",
	}],
	ganShiFaBu:[{
		name:"发布",
		statue:"publish",
	}],
	buZhang:[{
		name:"通过",
		statue:"pass",
	},{
		name:"驳回",
		statue:"reject",
	}],
}
summerready = function(){
	param = summer.pageParam;
	var addBtn = document.querySelector('.addBtn'),
	choose = document.querySelector('#choose');
	
	document.querySelector('.title').value = param.content.title;
	document.querySelector('.summary').value = param.content.summary;
	document.querySelector('.tag').value = param.content.tag;
	document.querySelector('.create-time').value = getMyDate(param.content.create_time);
	
	if(!isNull(param.content.content)){
		if(param.content.content.indexOf('<')==-1){
	    	$('.editor').html($('.editor').html(param.content.content).text());
	    }else{
	    	$('.editor').html(param.content.content);
	    }
	    imgCenter();
    }
	
	var chooseTab = document.querySelector('.choose-tab');
	chooseTab.onclick = function(){
		flag = 1;
		addBtn.onclick();
	}
	
	addBtn.onclick = function(){
		if(flag){
			$('.choose-tab').css('display','none');
			choose.className = '';
			addBtn.innerText = '提交';
			flag = 0;
		}else{
			if(isNull(viewModel.column())){
				return summer.toast({
                              "msg" : "请选择栏目" 
                         })
			}
			$('.choose-tab').css('display','block');
			$('#choose li').css('display','block');
			choose.className = 'on';
			addBtn.innerText = '取消';
			flag = 1;
		}
	}
	var chooseArr;
	switch (param.content.billstatus*1){
		case 1: chooseArr = chooseData.ganShiShenHe;//干事审核
			break;
		case 2:case 3: chooseArr = chooseData.buZhang;//宣传副部长和部长审核
			break;
		case 4: chooseArr = chooseData.ganShiFaBu;//干事发布
			break;
		default:chooseArr = [];
			break;
	}
	viewModel = {
		chooseArr : ko.observableArray(chooseArr),
		chooseClick : function(data){
			param.content.title = document.querySelector('.title').value;
			param.content.summary = document.querySelector('.summary').value;
			param.content.tag = document.querySelector('.tag').value;
			param.content.create_time = new Date(document.querySelector('.create-time').value).getTime();
			param.content.content = $('.editor').html();
			summer.openWin({
                "id" : 'ex-msg',
                "url" : "html/examine/ex-msg.html",
                "pageParam" : {
                    "content" : param.content,
                    "chooseData":data
                },
                isKeep:false
            });
            choose.className = '';
			addBtn.innerText = '提交';
			flag = 0;
		},
		column : ko.observable(param.content.def2),
		selColumn : function(){
			summer.openWin({
                "id" : "selColumn",
                "url" : "html/examine/selColumn.html",
                "pageParam" : {
                	"winID" : "waitExamine"
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
	param.content.def2 = data.name;
	param.content.infocolumn = data.value;
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
