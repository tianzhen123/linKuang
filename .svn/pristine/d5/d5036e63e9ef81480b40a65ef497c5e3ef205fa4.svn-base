var ViewModel = function() {
};
var viewModel = new ViewModel();
var userInfo;
var flag_delete=false;
var number_form = 1;
var sum_problems_form ;
var singleSum_problems_form;
var flag_submit = false;
var data = {
	"pk_problem":null,
	"pk_org":"",
	"pk_org_name":"",
	"p_place":"",
	"p_time":"",
	"p_code":"",
	"pk_supervisor":"",
	"pk_supervisor_name":"",
	"headmen":"",
	"creator":null,
	"createtime":null,
	"def0":null,
	"def1":null,
	"def2":null,
	"def3":null,
	"def4":null,
	"id_problemdetail":[]
};
var data_detail = {
	"fk_id_problemdetail":null,
	"pk_problem_detail":null,
	"pk_problem_type":"",
	"pk_problem_type_name":"",
	"problem_detail":"",
	"reexamination":"",
	"remark":"22",
	"pk_org":null,
	"pk_org_name":null,
	"creator":null,
	"creatime":null,
	"def0":null,
	"def1":null,
	"def2":null,
	"def3":null,
	"def4":null
};
var viewModel_data;
summerready = function() {
	
	viewModel_data = summer.pageParam.count;
	
	viewModel.data = ko.observableArray([]);
	
	init_MainTable();
	
	myRefresh(viewModel_data.pk_problem);
}
function init_MainTable(){
	$("#p_time").val(viewModel_data.p_time);
	data.p_time = viewModel_data.p_time;
	$("#p_place").val(viewModel_data.p_place);
	data.p_place = viewModel_data.p_place;
	$("#p_code").val(viewModel_data.p_code);
	data.p_code = viewModel_data.p_code;
	$("#headmen").val(viewModel_data.headmen);
	data.headmen = viewModel_data.headmen;
	$("#pk_supervisor_name").val(viewModel_data.pk_supervisor_name);
	data.pk_supervisor_name = viewModel_data.pk_supervisor_name;
	
	data.pk_problem = viewModel_data.pk_problem;
	data.pk_org = viewModel_data.pk_org;
	data.pk_org_name = viewModel_data.pk_org_name;
	data.pk_supervisor = viewModel_data.pk_supervisor;
	data.creator = viewModel_data.creator;
	data.createtime = viewModel_data.createtime;
	data.def0 = viewModel_data.def0;
	data.def1 = viewModel_data.def1;
	data.def2 = viewModel_data.def2;
	data.def3 = viewModel_data.def3;
	data.def4 = viewModel_data.def4;
}
function init_problemsType(){
	var length_array = viewModel_data.array_problem_type.length;
	var str = ""
	for (var k = 0; k < length_array; k++) {	
		str += "<label  style=\"padding: 9px 15px;\"><input class=\"mySelect\" checked type=\"text\" value=\""
		+viewModel_data.array_problem_type[k].problem_type+"\"  readonly=\"true\" ></label>";
	}
	$(".array_problem_type").html(str);
}

function judge_name(){
	
	var userInfo = localStorage.getItem("userInfo");
	var mobile = userInfo.mobile;
	var name = userInfo.name;
	if(viewModel_data.def2 == mobile){
		return true;
	}else{
		var length = $(".flag_edit").length;
		for(var i=0;i<length;i++){
			 $(".flag_edit").eq(i).attr("readonly",true);
		}
		return false;
	}
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
		init_formNumber();
		event();//绑定事件
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
function myRefresh(searchContent) {
	
	var url = ''+getHttpPro()+"problemDetail/list";
	
	summer.get(url, {
		"search_fk_id_problemdetail":searchContent,	
		"sortDirection":"desc",
		"sortField":"ts"
	}, {
		"Content-Type" : "application/x-www-form-urlencoded",
	}, //url地址
	function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		viewModel.data.removeAll();//清除
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				var reexamination = jsonArray.data.content[k].reexamination;
				jsonArray.data.content[k].reexamination = formatReexamination(reexamination);
				viewModel.data.push(jsonArray.data.content[k]);
				
			}
			
			ko.applyBindings(viewModel);
			after_myRefresh();	
		} else {
			
		}
		
	}, function(response) {//失败回调
		
	});

}
function after_myRefresh(){
	sum_problems_form = $(".problems_form li").length;
	singleSum_problems_form = 7;
	if(sum_problems_form>0){
		
		init_formNumber();
	}	
	
	
	var flag_sameName = judge_name();
	if(flag_sameName==true){	
		
		$('.scroller-date').scroller('destroy').scroller({
			preset: 'date',
			theme: "ios7",
			mode: "scroller",
			display: "bottom",
			animate: ""
		});	
		
		event();
		event_add();
		event_submit();
	}
}


function saveClick(){
	
	var requestid = ''+getHttpPro()+"problemRectification/update";
	data_save();
	
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
function data_save(){
	data.p_place = $("#p_place").val();
	data.p_code = $("#p_code").val();
	data.headmen = $("#headmen").val();
	data.p_time = resetDate($("#p_time").val());
	
	var length_viewModel = viewModel.data().length;
	data.id_problemdetail=[];
	
	for (var k = 0; k < length_viewModel; k++) {
		var reexamination = viewModel.data()[k].reexamination;
		viewModel.data()[k].reexamination = resetReexamination(reexamination);
		
		var data_detail = {};
		data_detail.fk_id_problemdetail = viewModel.data()[k].fk_id_problemdetail;
		data_detail.pk_problem_detail = viewModel.data()[k].pk_problem_detail;
		data_detail.pk_problem_type = viewModel.data()[k].pk_problem_type;
		data_detail.pk_problem_type_name = viewModel.data()[k].pk_problem_type_name;
		data_detail.problem_detail = viewModel.data()[k].problem_detail;
		data_detail.reexamination = viewModel.data()[k].reexamination;
		data_detail.remark = viewModel.data()[k].remark;
		if(viewModel.data()[k].pk_org==null){
			data_detail.pk_org = " ";
		}else{
			data_detail.pk_org = viewModel.data()[k].pk_org;
		}
		data_detail.creator = viewModel.data()[k].creator;
		data_detail.def0 = viewModel.data()[k].def0;
		data_detail.def1 = viewModel.data()[k].def1;
		data_detail.def2 = viewModel.data()[k].def2;
		data_detail.def3 = viewModel.data()[k].def3;
		data_detail.def4 = viewModel.data()[k].def4;
	
		data.id_problemdetail.push(data_detail);
	}
}
function resetDate(str) {
	var date = str;
	date += " ";
   	date += "00:00:00";
   	date = Date.parse(date);
    return date;
}
function formatReexamination(number) {
	var str = "";
	if(number=="0"){
		str = "合格";
	}else if(number=="1"){
		str = "不合格";
	}else{
		str = "待复查";
	}
    return str;
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
	   	var obj = $(this).parentsUntil("li").last().parent()//li
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
		var index = obj.index();//一组li
		var number = parseInt(index/singleSum_problems_form);
		UM.confirm({
		    text: '你确定要删除该问题明细吗？',
		    btnText: ["取消", "确定"],
		    overlay: true,
		    ok: function () {
		       
			    if("fk_id_problemdetail" in viewModel.data()[number]){
			      	ajax_delete(number,obj);
		       	}else{		
					viewModel.data().splice(number,1);
					for(var i=1;i<singleSum_problems_form;i++){
						obj.next().remove();
					}
					obj.remove();	
					
					init_formNumber();
					hp_alert("删除成功");
				}
		        
		    },
		    cancle: function () {
		       
		    }
		});
		
	});
	
}
function ajax_delete(number,obj){
	$.ajax({
		    type: "post",
		    url: ''+getHttpPro()+"problemDetail/del",
		    contentType: 'application/json;charset=utf-8',
		    data: JSON.stringify(viewModel.data()[number]),
		    success: function (res) {
		        if (res) {
		            if (res.success == 'success') {
						viewModel.data().splice(number,1);
						
						for(var i=1;i<singleSum_problems_form;i++){
							obj.next().remove();
						}
						obj.remove();	
						
						init_formNumber();
						 UM.toast({
						    "text": "删除成功",
						});
		            } else {
		               
	            }
	        } else {
	            
	        }
	    } 
	});
}




