function shareCancle() {
	UM.share.close();
}
var flowId ;
$(function() {
	flowId =localStorage.flowId;
	init();
	 //只有二级工会审批的时候才展示
	if(flowId == activiti.hs_union_approval || flowId == activiti.hw_union_approval){
		$("#secondLevelOpinion").show();
	}else{
		$("#secondLevelOpinion").hide();
	}
	var obj = getOrgLevel();
	$("#fillReportBtn").on('click', function () {
	var type = GetRequest("type");
	if(!$('#opinion').val()){
			alert("请输入审批意见");
		 	return;
	}
	if("_4" == flowId && 2 == type){
		if(!$('#unionHelpAmount').val()){
			alert("请输入基层工会帮扶金额");
		 	return;
		}
	}
	/**
	if("_5" == flowId && 2 == type){
		if(!$('#medicareHelpAmount').val()){
			alert("请输入初定帮扶金额");
		 	return;
		}
	}
	*/
	if("_6" == flowId && 1 == type){
		if(!$('#topUnionHelpAmount').val()){
			alert("请输入集团公会帮扶金额");
		 	return;
		}
	}
	
	if("_5" == flowId && 2 == type){
		if(!$('#helpAmount').val()){
			alert("请输入集团工会帮扶金额");
		 	return;
		}
		if(!$('#helpGoodsAmount').val()){
			alert("请输入帮扶物品等额金额");
		 	return;
		}
	}
	var tempUrl ;
	if(1 ==type){
	tempUrl =  service.helpSeriousIllnessSubmit;
	}else{
	tempUrl = service.helpWorkSubmit
	}
        UM.actionsheet({
            title: '',  
            items: ['确认'],
            callbacks: [function () {
               	obj.opinion = $("#opinion").val(); 
				obj.taskId = localStorage.taskId; 
				obj.helpAmount = $('#helpAmount').val();
				obj.helpGoodsAmount = $('#helpGoodsAmount').val();
				obj.unionHelpAmount = $('#unionHelpAmount').val();
				obj.topUnionHelpAmount=$('#topUnionHelpAmount').val();
				obj.medicareHelpAmount = $('#medicareHelpAmount').val();
				obj.state = localStorage.opinionState; 
			   	$.ajax({//意见
					type: "POST",
					url:tempUrl,
					data:JSON.stringify(obj),
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',
					success: function (res) {
						if(res.sCode == 200){
							forword("geApproval","html/mywork/myworker.html"); 
						}else{
							alert(res.msg);
						}
					}
				});
            }, function () {
            }, function () {
              
            }]
        });
    })
	
});

    function totalHelpAmount(){
       	var unionHelpAmount=$("#unionHelpAmount").val();
    	var topUnionHelpAmount=$("#topUnionHelpAmount").val();
    	if(unionHelpAmount==null||unionHelpAmount==''){
    		unionHelpAmount=0;
    	}
    	if(topUnionHelpAmount==null||topUnionHelpAmount==''){
    		topUnionHelpAmount=0;
    	}
    	unionHelpAmount=parseFloat(unionHelpAmount);
    	topUnionHelpAmount=parseFloat(topUnionHelpAmount);
    	var totalHelpAmount=(unionHelpAmount+topUnionHelpAmount).toFixed(2);
    	$('#totalHelpAmount').html(totalHelpAmount);
	}

function GetRequest(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	//search,查询？后面的参数，并匹配正则
	if (r != null)
		return unescape(r[2]);
	return null;
}

function init() {
	var type = GetRequest("type");
	var html="";
	var opinionState=localStorage.opinionState; 
		$("#HelpAmountDIV").hide();
	if("_4" == flowId){
		$("#groupType").html("二级工会审批");
		if(1 == type&&opinionState=='AGREE'){ 
			html+='<div class="um-row panel-info"><div class="um-row content-container"><div class="um-xs-6 um-sm-6 um-md-6 content-key">'
			+'基层工会帮扶金额<span style="color: red">*</span></div>'
			+ '<div class="um-xs-6 um-sm-6 um-md-6 content-value" ><input type="number" id="unionHelpAmount" placeholder="请输入" style="border: 0px;width: 70%;text-align: right;font-size: 12px;"/>(元)</div></div></div>';
		}
	}
	if("_5" == flowId){
		if(1 == type){
			$("#groupType").html("医保中心审批");
			if(opinionState=='AGREE'){
				html+='<div class="um-row panel-info">'
						+ '<div class="um-row content-container">'
							+ '<div class="um-xs-6 um-sm-6 um-md-6 content-key">初定帮扶金额<span style="color: red">*</span></div>'
				 			+ '<div class="um-xs-6 um-sm-6 um-md-6 content-value" ><input type="number" id="medicareHelpAmount" placeholder="请输入" style="border: 0px;width: 70%;text-align: right;font-size: 12px;"/>(元) </div>'
				 		+ '</div>'
				 	+ '</div>';
			}
		}else{
			$("#groupType").html("集团工会审批");
			if(opinionState=='AGREE'){
			html+='<div class="um-row panel-info"><div class="um-row content-container"><div class="um-xs-6 um-sm-6 um-md-6 content-key">'
			 	+ '集团工会帮扶金额<span style="color: red">*</span></div>'
			 	+ '<div class="um-xs-6 um-sm-6 um-md-6 content-value" ><input type="number" id="helpAmount" placeholder="请输入" style="border: 0px;width: 70%;text-align: right;font-size: 12px;"/>(元) </div></div>'
			 	+'<div class="um-row content-container"><div class="um-xs-6 um-sm-6 um-md-6 content-key">帮扶物品等额金额<span style="color: red">*</span></div>'
			 	+ '<div class="um-xs-6 um-sm-6 um-md-6 content-value" ><input type="number" id="helpGoodsAmount" placeholder="请输入" style="border: 0px;width: 70%;text-align: right;font-size: 12px;"/>(元) </div></div></div>';
		  	}
		}
	}
	
	$("#EditOptionDIV").html(html);
	if("_6" == flowId){
		$("#EditOptionDIV").hide();
		if('DISAGREE' != localStorage.opinionState){
			$("#HelpAmountDIV").show();
		 }
		$("#groupType").html("集团工会审批");
		   $("#unionHelpAmount").bind("input propertychange",function(event){
		          totalHelpAmount();                  	
		   });
		 $("#topUnionHelpAmount").bind("input propertychange",function(event){
		        totalHelpAmount();   
		  });
	

	 	var temp={};
		temp.approvalId = localStorage.approvalId;
		 $.ajax({
	        type: "POST",
	        url:service.helpSeriousIllnessOpinion,
	        data:JSON.stringify(temp),
	        contentType: 'application/json;charset=utf-8',
	        dataType: 'json',
	        success: function (res) {
	            if(res.sCode==200){
	                var opinionList=res.rsMap.opinionList;
	                var html="";
	                if(opinionList!=null&&opinionList.length>0){
	           			for(var i=0;i<opinionList.length;i++){
	                        var opinion=opinionList[i];
	                        var orgLevel=opinionList[i].orgLevel;
	                        if(opinion.taskName.indexOf('二级')>-1){
	                        $("#unionHelpAmount").val(opinion.unionHelpAmount);
	                        }
	                        //if(opinion.taskName.indexOf('医保')>-1){
	                        //$("#medicareHelpAmount").html(opinion.medicareHelpAmount);
	                       // }
	                    }
	                }
	            }
	        }
	    });
	}
}