var ViewModel = function() {
};
var viewModel = new ViewModel();

var jsonArray = [];//数据的本地缓存
var currentRowIndex;//用户点击数据所在当前行
var length_viewModel = 0;//从服务器获取的viewModel的长度+从前端传过来的jsonArray的长度
var length_jsonArray;//从前端传过来的jsonArray的长度
var pageIndex;//用户访问的当前页
var pageSize;//请求服务器获取数据的个数
var timeOfSelected;//传过来的，选中时间
var flag_complete;//最后完成的标志
summerready = function(){
	hp_slide();//滑动事件，放在最前面
	/*获取前一个页面传来的数据*/	
	currentRowIndex = summer.pageParam.currentRowIndex;//点击的第几行的数据
	timeOfSelected = summer.pageParam.timeOfSelected;//时间
	jsonArray = summer.pageParam.jsonArray;//jsonArray数据
	pageIndex = summer.pageParam.pageIndex;//用户访问的当前页
	pageSize = summer.pageParam.pageSize;//请求服务器获取数据的个数
	length_jsonArray = jsonArray.length;//从前端传过来的jsonArray的长度
	
	
	/*初始化数据*/
    if(currentRowIndex>=(length_jsonArray-1)){//最后一条
		initData(currentRowIndex,length_jsonArray);
		
		pageIndex = pageIndex + 1;
		refresh(currentRowIndex,timeOfSelected,pageIndex)
	}else{
		initData(currentRowIndex,length_jsonArray);
	}
    
    
    /*打开新页面 */
	$("#next").on("click", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		/*进行判断是否为最后一条数据，倒数第二条往最后一条跳转前，把前端页面右角文字改掉*/
		if(currentRowIndex<(length_viewModel-1-1)){//前几条
			save_viewModel(currentRowIndex);//保存改动后的数据到viewModel中
			saveClick(currentRowIndex);//提交给服务器
			next(currentRowIndex);
		}else if(currentRowIndex==(length_viewModel-1-1)){//倒数第二条
			//刷新数据，为空的时候改变改变右上角的文字为 完成
			pageIndex = pageIndex + 1;
			refresh(currentRowIndex,timeOfSelected,pageIndex)
			
			save_viewModel(currentRowIndex);//保存改动后的数据到viewModel中
			saveClick(currentRowIndex);//提交给服务器
			next(currentRowIndex);
		}else if(currentRowIndex>=(length_viewModel-1)){//最后一条
			save_viewModel(currentRowIndex);//保存改动后的数据到viewModel中
			saveClick(currentRowIndex);//提交给服务器
			backClick(currentRowIndex);
		}
	});   
	
	/*限制金额输入框只能输入数字*/
	var text = document.getElementById("amount");
	text.onkeyup = function(){
		/*关键代码*/
		this.value=this.value.replace(/\D/g,'');
	}
}

/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}

/**
 * 下一条数据 
 */
function next(index){
	currentRowIndex = index + 1;
	init(currentRowIndex);
}

/**
 *
 * 改变团费管理中右角的文字,
 * 
 * 改变完成标志的状态，1：完成  0：下一项
 * 
 * 输入输出:
 * 0 右角文字 ：下一项
 * 1 右角文字 ：完成
 * 
 * 适应情况：
 * 1.判断点击的是否为最后一条数据
 * 如果是最后一条改变页面右角的文字
 * 2.如果从倒数第二个跳到最后一个，改变页面右角的文字
 * 
 * 要求：使用前需要按需求加判断
 */
function changeText(num){
	if(num==0){
		$("#next").children().text("下一项");		
	}else if(num==1){
		$("#next").children().text("完成");
	}
}
/**
 * 初始化数据，将从上一个列表界面获取的jsonArray数据赋值到viewModel中，并在前端显示单个信息
 */
function initData(index,length){
	/*ko绑定*/
	viewModel.data = ko.observableArray([]);
	length_viewModel = length;
	/*初始化viewModel json*/
	for (var k = 0; k < length; k++) {
		viewModel.data.push(jsonArray[k]);
	}
	/*页面初始化*/
	init(index);
}



/**
 * 刷新 获取json数据
 * currentRowIndex : 前一个页面的选中行，用于刷新完数据，进行初始化init(currentRowIndex);
 * timeOfSelected : 前一个页面的选中时间，用于按时间获取数据
 */
function refresh(currentRowIndex,timeOfSelected,pageIndex_request) {
	/*网络请求*/
	//var url = "http://10.176.2.69:8080/partyconstrutproject/fee/list";
	
	
	var url = ""+getHttpPro()+"fee/list";
	
	//获取列表
	summer.get(url, {
		"search_def2":timeOfSelected.toString(),//查询条件为  时间
		
		"pageIndex":pageIndex_request,//分页
		"pageSize":pageSize,
	}, {
		"Content-Type" : "application/x-www-form-urlencoded",
	}, //url地址
	function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if (data.success == "success") {
			var temp_jsonArray = data.detailMsg.data.content;
			var count = temp_jsonArray.length;
			
			/*数据为空，改变右上角的文字为  完成*/
			if(count==0){
				changeText(1);
				
			}
			
			/*viewModel长度*/
			length_viewModel = length_viewModel + count;
			//$summer.alert(length_viewModel);
			/*初始化viewModel json*/
			for (var k = 0; k < count; k++) {
				viewModel.data.push(temp_jsonArray[k]);
				jsonArray.push(temp_jsonArray[k]);
				//$summer.alert(temp_jsonArray[k]);
			}
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert("请求失败");
	});
}

/**
 * 页面初始化 
 * index：传入当前行
 */
function init(index){
	/*初始化  支部、姓名、缴费月份、金额*/
	//获取指定位置的数据
	var item = viewModel.data()[index];
	var data = JSON.stringify(item);
	data = $summer.strToJson(data);
	
	//绑定数据
	var temp_viewModel = {
		def4 : ko.observable(data.def4),//支部
		def3 : ko.observable(data.def3),//姓名
		yearmonth : ko.observable(time_substr(timeOfSelected)),//缴费年月
		feeamount : ko.observable(data.feeamount),//金额
		def0 : ko.observable(data.def0),//备注
	}
	
	//执行绑定
    ko.applyBindings(temp_viewModel);
}

/**
 * 将获取的json中年月的格式进行更改
 * 2017-11 转换成 2017年11月
 */
function time_substr(time){
	var year = time.toString().substr(0,4);
	var month = time.toString().substring(5);
	var year_month = year + "年" + month + "月";
	return year_month;
}

/**
 * 保存改动后的数据到viewModel中 （暂时不用此方法）
 */
function save_viewModel1(index){
	/*获取viewModel中指定位置的数据*/
	var item = viewModel.data()[index];
	var data = JSON.stringify(item);
	data = $summer.strToJson(data);
	
	/*改变数据:金额，备注*/
	data.feeamount = $("#amount").val();
	data.def0 = $("#content").val();
	
	/*替换掉viewModel中的旧数据*/
	viewModel.data.splice(index,1,data);
	
}

/**
 * 保存改动后的数据到jsonArray中 
 */
function save_viewModel(index){
	/*获取viewModel中指定位置的数据*/
	var item = jsonArray[index];
	var data = JSON.stringify(item);
	data = $summer.strToJson(data);
	
	/*改变数据，金额，备注*/
	data.feeamount = $("#amount").val();
	data.def0 = $("#content").val();
	
	/*替换掉viewModel中的旧数据*/
	jsonArray.splice(index,1,data);


}


/**
 * 刷新团费管理的列表 
 */
function tuanFeiGuanLi_refresh(){
	var jsfun = 'refresh(0);';
	summer.execScript({
		winId : 'tuanFeiGuanLi',
		script : jsfun
	});
}

/**
 * 前端页面是否有空值
 * 有空值 
 */
function hasNull(){
	var title = $("#title").val();
	var content = $("#content").val();
	if(title == null || content == null || title.replace(/\s/g,'')=="" || content.replace(/\s/g,'')==""){//去除空格  replace(/\s/g,'')
		return true;
	}else{
		return false;
	}
}

/**
 * 网络添加事件
 */
function saveClick(index){
/**
 * 点击提交 触发提交事件
 * 获取前端页面的数据
 * 将数据写入json中
 * 提交给服务器
 * 关闭页面
 */


	
	//var requestid = "http://10.176.2.69:8080/partyconstrutproject/fee/save";
	
	var requestid = ""+getHttpPro()+"fee/save";
	
	
	//把json传给服务器
	summer.post(requestid,jsonArray[index],//可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data_response = $summer.strToJson(response.data);
		if (data_response.success == "success") {
			//如果是完成的按钮状态，则提示完成
			
			//alert("提交成功");
		
		
			//myAlert("提交成功");
			/*
			var jsfun = 'refresh('+time+');';
			summer.execScript({
				winId : 'liuYanBan',
				script : jsfun
			});
			backClick();
			*/
		} else {
			//alert("保存失败");
		}
	}, function(response) {//失败回调
		//alert("网络错误");
	});
	
}



/**
 * 初始化右角的文字
 * 提交数据
 * 关闭窗口
 */
function backClick() {
	changeText(0);//关闭前把右角的数据初始化
	//save_viewModel(currentRowIndex);//保存改动后的数据到viewModel中
	//saveClick(currentRowIndex);//把改动后的数据提交给服务器
	tuanFeiGuanLi_refresh();//刷新团费管理的列表
	summer.closeWin({});//关闭页面
}
function keyBack(){
	tuanFeiGuanLi_refresh();
    summer.closeWin();
}