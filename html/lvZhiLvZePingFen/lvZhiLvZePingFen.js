var viewModel={};

var data = "";
var jsonArray = [];
summerready = function(){
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
	
	viewModel = {
		code : ko.observable(data.code),
		name : ko.observable(data.name_name),
		post : ko.observable(data.post),
		duty : ko.observable(data.duty),
		submiter : ko.observable(data.submiter),
		selfconstruction : ko.observable(data.selfconstruction),
		positiontarget : ko.observable(data.positiontarget),
		partyscore : ko.observable(data.partyscore),
		rewardspunish : ko.observable(data.rewardspunish),
		evaluate : ko.observable(data.evaluate),
		data : ko.observableArray(jsonArray),
	}
	
    ko.applyBindings(viewModel);
    netService();
	
    myScore();
}
/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}
//网络请求
function netService(){
	var requestid = ""+getHttpPro()+"performdutyMobile/dflist";
	summer.post(requestid, {pk_performduty:data.pk_performduty} , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			jsonArray = jsonArray.data.content;
			for (var k = 0; k < count; k++) {
				viewModel.data.push(jsonArray[k]);
			}
			//$summer.alert(viewModel.data());
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert("网络错误");
	});
}

function backCilck(){
	summer.closeWin({});
}

//保存点击事件
function saveClick(){
	
	if(hasNull()==true){//判断评分是否有空
		hp_alert("测评内容不能为空");
		return;
	}

	var requestid = ""+getHttpPro()+"performdutyMobile/save";
	
	data.selfconstruction = document.getElementById("selfconstruction").value;
	data.positiontarget = document.getElementById("positiontarget").value;
	data.rewardspunish = document.getElementById("rewardspunish").value;
	data.evaluate = document.getElementById("evaluate").value;
	data.totalscore = document.getElementById("totalscore").value;
	if(isEmpty(data.selfconstruction)||isEmpty(data.positiontarget)||isEmpty(data.rewardspunish)||isEmpty(data.evaluate)){
		hp_alert("测评内容不能为空");
		return;
	}
	data.dflist = jsonArray;
	/*将data数据转为字符串，使用base64对data加密，将加密后的data_base数据作为data_post中的data的value，传给PC*/
	data_string = JSON.stringify(data);
	
	var b = new Base64();
	var data_base = b.encode(data_string);//使用base64对data加密，PC解密
	var data_post = {"data":data_base};
	
	summer.post(requestid, data_post , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
	
		var data = $summer.strToJson(response.data);
		if (data.success == "success") {
			hp_alert("保存成功",backCilck);
			var jsfun = 'searchClick();';
			summer.execScript({
				winId : 'lvZhiLvZe',
				script : jsfun
			});
			//backCilck();
			
		} else {
			//$summer.alert("保存失败");
		}
	}, function(response) {//失败回调
		//$summer.alert(response);
	});
	
}
/**
 * 总分数的实时变化
 */
function myScore(){
	/**
	 * 实现：每次输入完毕，总分数进行变化
	 * 逻辑：
	 * 给每一个输入框添加事件（输入完毕）
	 * 获取输入框的各个数值
	 * 累加求和
	 * 
	 * 当数值改变时，和清零，重新累加
	 * 
	 * */
		var sum = 0;/*清除上次的和*/
	mui(".list").on('keyup','.getValue',function(){
		/*输入框的值只能为数值，大小不超过表要求的分值（json的figures为规定值），超过则为figures*/
		this.value = this.value.replace(/\D/g,'');//只能输入数字
		//不能0前面不能为0的数值
		var x=0;
		if(this.value.toString()!==x.toString()){
			this.value = this.value.replace(/^(0+)/,'');
		}
		//大小不超过表要求的分值（json的figures为规定值），超过则为figures
		if(this.value>100){
		  	this.value = 100;
		}
		/*对每一个输入框进行遍历，求每个输入框的和，并显示到前端页面*/
		sum = 0;/*清除上次的和*/
		$(".list input").each(function () {
		  	if(this.value && !this.value.trim()==""){//值不为空进行加操作，不进行判断sum为NAN
		    	var val = parseInt(this.value);//String转换成number
		    	var scale = parseInt($(this).parent().parent().find(".scale").text());
		  		sum=sum+(val*scale/100);
			}
		});
		$("#totalscore").attr("value",sum);//更改前端数值为总分数
		
		/*获取当前输入框在ul中li的所在行*/
		var index_score = $(this).closest("li").index();
		var value_score = this.value;
		
		/*保存前端输入的分数到jsonArray对应项的分数*/
		saveInputScore(index_score,value_score);
	});
}

/**
 * 保存前端输入的分数到jsonArray对应项的分数，（替换掉jsonArray原来的分数值）
 * @param {Object} index_score 输入分数所在分数列中的位置
 * @param {Object} value_score 分数
 */
function saveInputScore(index,value_score){
	//获取jsonArray对应位置的json对象，把分数值赋值给json_value.score
	jsonArray[index].score = value_score;
	
}

/**
 * 判断分数是否有空值
 * 有 返回 true
 * 无 返回 flase
 */
function hasNull(){
	var flag_hasNull = false;//是否有空值的标志
	
	/*对每一个分数输入框进行遍历，有空值则将flag_hasNull置为true*/
	mui(".list input").each(function () {
	  /*值不为空进行加操作，不进行判断sum为NAN*/
	  	if(this.value.trim()==""){
	  		flag_hasNull = true;
		}  

	});
	return flag_hasNull;
}
//判断是否为空
function isEmpty(data) {
	if (data == undefined || data == null || data == "" || data=='NULL' || data==false || data=='false') {
		return true;
	}
	return false;
}