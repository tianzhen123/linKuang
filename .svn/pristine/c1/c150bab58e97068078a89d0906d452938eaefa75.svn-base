var ViewModel = function() {
};
var viewModel = new ViewModel();
var userInfo;
var flag_delete=false;
var number_form = 1;
var sum_problems_form ;
var singleSum_problems_form;
var data = {};
summerready = function() {
	hp_slide();//滑动事件，放在最前面
	
	viewModel.data = ko.observableArray([{
			pk_problem_type_name:"",
			problem_detail:"",
			remark:"",
			reexamination:"待复查",
		}]);
	ko.applyBindings(viewModel);
	
	sum_problems_form = $(".problems_form li").length;
	singleSum_problems_form = sum_problems_form;
	
	
	init_MainTable();
	init_formNumber();
	
	event();
	event_add();
	event_submit();
}

function init_MainTable(){
	var p_time = getCurrentDate();
	$("#p_time").val(p_time);
	data.p_time = p_time;
	var userInfo = localStorage.getItem("userInfo");
	var def2 = userInfo.mobile;
	var name = userInfo.name;
	$("#pk_supervisor_name").val(name);
	data.pk_supervisor_name = name;
	data.def2 = def2;
}
function init_formNumber(){
	sum_problems_form = $(".problems_form li").length;
	var sum = sum_problems_form/singleSum_problems_form;
	for(var i=0;i<sum;i++){
		$(".problems_form li").eq(singleSum_problems_form*i).find(".title_problems_form").html("问题明细表("+i+")");
	}
}
function event_add(){
	$("#add").on("click", function(sender, args) {
		viewModel.data.push({
			pk_problem_type_name:"",
			problem_detail:"",
			remark:"",
			reexamination:"待复查",
		});
		event();
		init_formNumber();
	});
}
function event_submit(){
	$("#submit").on("click", function(sender, args) {
		var value_hasNull = hasNull();
		if(value_hasNull == true){
			hp_alert("请填写标题和内容！");
		}else{
			saveClick();
		}
		
	});
}
function function_rightSlide(){
	summer.closeWin();
}
function saveClick(){
	var requestid = ""+getHttpPro()+"problemRectification/add";
	data.p_place = $("#p_place").val();
	data.p_code = $("#p_code").val();
	data.headmen = $("#headmen").val();
	data.p_time = resetDate($("#p_time").val());
	data.pk_org = " ";
	var length_viewModel = viewModel.data().length;
	data.id_problemdetail=[];
	for (var k = 0; k < length_viewModel; k++) {
		var reexamination = viewModel.data()[k].reexamination;//编辑时间
		viewModel.data()[k].reexamination = resetReexamination(reexamination);
		data.id_problemdetail.push(viewModel.data()[k]);
	}
	
	
	$.ajax({
        type: "post",
        url: requestid,
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(data),//将对象序列化成JSON字符串
        success: function (res) {
            if (res) {
                if (res.success == 'success') {
                	hp_alert("提交成功",backClick);
                } else {
                	
                }
            } else {
            	
            }
        } 
    });
	
}
function resetReexamination(str){
	var number ="";
	if(str=="合格"){
		number = 0;
	}else if(str=="不合格"){
		number = 1;
	}else{
		number ;
	}
	return number;
}
function resetDate(str) {
	var date = str;
	date += " ";
   	date += "00:00:00";
   	date = Date.parse(date);
    return date;
}
function getCurrentDate() {
	var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    
    var currentdate = year + seperator1 + addZero(month) + seperator1 + addZero(strDate);
           // + " " + addZero(strHours) + seperator2 + addZero(strMinutes) + seperator2 + addZero(strSeconds);
    return currentdate;
}
function addZero(time){
	if(parseInt(time) < 10){  
        time = '0'+time;  
     }  
     return time;
}
function backClick() {
	summer.closeWin({});
}
function event(){
	event_problems();
	event_reexamination();
	event_delete();
}
function event_problems(){
	$(".problems").unbind("click");
	$(".problems_content").find("input").unbind("click");
	
	$(".problems").on("click", function(sender, args) {
		$(this).parentsUntil("li").last().parent().next().toggle();
		
	});
	$(".problems_content").find("input").on("click",function(){
	   	var obj = $(this).parentsUntil("li").last().parent()
      	obj.prev().find("input").val(this.value);
    	var index = obj.index();
    	var number = parseInt(index/singleSum_problems_form);
    	viewModel.data()[number].pk_problem_type_name = this.value;
    	if(this.value=="建设问题"){
    		viewModel.data()[number].pk_problem_type = "45c5aa69-f9cf-4864-9ade-e57666d3339b";
    	}else if(this.value=="基础问题"){
    		viewModel.data()[number].pk_problem_type = "47997745-fc66-498e-9a6c-8fb3916ab67e";
    	}else{
    		viewModel.data()[number].pk_problem_type = "1a1c8c67-5e0a-400d-b8e4-148d70ce8b8e";
    	}
	    $(this).parentsUntil("li").last().parent().hide();
	})

}
function event_reexamination(){
	$(".reexamination").unbind("click");
	$(".reexamination_content").find("input").unbind("click");
	$(".reexamination").on("click", function(sender, args) {
		$(this).parentsUntil("li").last().parent().next().toggle();
		
	});
	$(".reexamination_content").find("input").on("click",function(){
      	var obj = $(this).parentsUntil("li").last().parent()//li
      	obj.prev().find("input").val(this.value);
    	var index = obj.index();
    	var number = parseInt(index/singleSum_problems_form);
    	viewModel.data()[number].reexamination = this.value;
    	$(this).parentsUntil("li").last().parent().hide();
	})
}
function event_delete(){
	$(".delete").unbind("click");
	$(".delete").on("click", function() {
		var obj = $(this).parentsUntil("li").last().parent()
		var index = obj.index();
		var number = parseInt(index/singleSum_problems_form);
		UM.confirm({
		    text: '你确定要删除该问题明细吗？',
		    btnText: ["取消", "确定"],
		    overlay: true,
		    ok: function () {
				viewModel.data().splice(number,1);
				for(var i=1;i<singleSum_problems_form;i++){
					obj.next().remove();
				}
				obj.remove();	
				
				init_formNumber();
		    },
		    cancle: function () {
		       
		    }
		});
	});
	
}





