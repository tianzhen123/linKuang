function shareCancle() {
	UM.share.close();
}
var type;
function backClick() {
	summer.closeWin({});
}

$(function() {

	var xuanze = localStorage.xuanze;

	var flowId = localStorage.flowId;

	if("myWork" == xuanze){
		$("#fillReportBtn").show();
	}else if("HELPWORKERS" == xuanze || "handle" == xuanze){
		$("#fillReportBtn").hide();
	}
	
	if(activiti.hw_group_approval == flowId || activiti.hs_group_approval == flowId){
		groupApproval();
	}else{
		$('.phone').on('click', function() {
			UM.actionsheet(
			{
	            title: '',  
	            items: ['驳回','通过','结束'],
	            callbacks: [ function () {
	            	localStorage.opinionState = 'DISAGREE';
					summer.openWin({ 
					    "id" : "opinion"+localStorage.approvalId,
					    "url" : "html/helpworkers/opinion.html?type="+type
					});
	            }, function () {
	            	localStorage.opinionState = 'AGREE';
					summer.openWin({ 
					    "id" : "opinion"+localStorage.approvalId,
					    "url" : "html/helpworkers/opinion.html?type="+type
					});
	            }, function () {
	            	localStorage.opinionState = 'FINISH';
					summer.openWin({ 
					    "id" : "opinion"+localStorage.approvalId,
					    "url" : "html/helpworkers/opinion.html?type="+type
					});
	            }]
	        }
			);
		})
	}
	init();
});

//集团审批按钮
function groupApproval(){
	$('.phone').on('click', function() {
		UM.actionsheet(
		{
            title: '',  
            items: ['驳回','通过'],
            callbacks: [ function () {
            	localStorage.opinionState = 'DISAGREE';
				summer.openWin({ 
				    "id" : "opinion"+localStorage.approvalId,
				    "url" : "html/helpworkers/opinion.html?type="+type
				});
            }, function () {
            	localStorage.opinionState = 'AGREE';
				summer.openWin({ 
				    "id" : "opinion"+localStorage.approvalId,
				    "url" : "html/helpworkers/opinion.html?type="+type
				});
            }, function () {
            }]
        }
		);
	})
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
	type = GetRequest("type");
	var obj = {};
	obj.userId = localStorage.userid;
	//obj.userId = "1d935cc9-d0b1-4629-94dd-8fbd41bd54e8";
	var url ="";
	//type = 2;
	if(1==type){
		obj.busiType = BUSI_TYPE_HS;
		$("#busiTypeName").html("大病帮扶");
		url=service.helpSeriousIllnessInfo;
	}else{
		obj.busiType = BUSI_TYPE_HW;
		$("#busiTypeName").html("职工帮困");
		url=service.helpWorkDifficultyInfo;
		$("#JTXI").show();
	}
	//obj.approvalId = "HW1539155060208";
	obj.approvalId = localStorage.approvalId;
	//基本信息赋值
	$.ajax({
		type : "POST",
		url : url,
		data : JSON.stringify(obj),
		contentType : 'application/json;charset=utf-8',
		dataType : 'json',
		success : function(res) {
			if (res.sCode == 200) {
                    var node;
                    	if(2 ==type){//职工帮困
                    	node=res.rsMap.helpWorkDifficulty;
                    	$("#SeriousIllnessDIV").hide();
                    	$("#SeriousIllnessDIV2").hide();
                    	$("#SeriousIllnessDIV3").hide();
                    	$("#SeriousIllnessDIV4").hide();
                    	$("#SeriousIllnessDIV5").hide();
						}else{//大病帮扶
		                 node=res.rsMap.helpSeriousIllness;
		                // $("#HomeDIV").hide();
						}
                    $("#name").html(node.name);
                    $("#pcode").html(node.pcode);
                    $("#sex").html(node.sex);
                    $("#age").html(node.age);
                    $("#idcode").html(node.idcode);
                    $("#phone").html(node.phone);
                    $("#workunit").html(node.workunit);
                  	
                  	$("#familyPopulation").html(node.familyPopulation);
                  	$("#incomPer").html(node.incomPer);
                  	$("#address").html(node.address);
                    $("#bankNo").html(node.bankNo);
				if(2 ==type){//职工帮困
                    if(node.subBusiTypeName!=''&&node.subBusiTypeName!=null){
                        $("#busiTypeName").html(node.subBusiTypeName);
                    }
                   $("#HomeInfoDIV").html(node.homeIncomContent);//家庭收入及困难情况
				}else{//大病帮扶
	                $("#resucer").html(node.resucer);
	                $("#relation").html(node.relation);
	                $("#resucreAge").html(node.resucreAge);
	                var hsSex = '';
	                if('W' == node.hsSex){
	                	hsSex = '女'
	                }else if('M' == node.hsSex){
	                	hsSex = '男'
	                }
	                $("#hsSex").html(hsSex);
                    $("#hospitalTotalCost").html(node.hospitalTotalCost);
                    $("#medicalInsuranceCost").html(node.medicalInsuranceCost);
                    $("#selfPaymentCost").html(node.selfPaymentCost);
                    $("#inHospitalDays").html(node.inHospitalDays);
                    $("#inHospitalDayss").html(node.inHospitalDays);
                     $("#HomeInfoDIV").html(node.homeIncomContent);//家庭收入及困难情况
                    var daysList=node.inHospitalTimeList;
                    if(daysList!=null&&daysList.length){
                    var html='';
                      for(var i=0;i<daysList.length;i++){
	                        var startTime=daysList[i].startTime;
	                        var endTime=daysList[i].endTime;
	                           var days=daysList[i].days;
	                          
	                           html+='<div class="um-row content-container"><div class="um-xs-4 um-sm-4 um-md-4 content-key" >住院日期</div>'
						      +'<div class="um-xs-8 um-sm-8 um-md-8 content-value" style="padding-left: 0px">'+startTime+'至'+endTime+'&nbsp;&nbsp;&nbsp;'+days+'天</div></div>';

                    	}
                    $("#inHostpitalDays").html(html);
                    }
                    
				}
			}
		}
	});
	//附件
		 $.ajax({//附件
                type: "POST",
                url:service.fileList,
                data:JSON.stringify(obj),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async:false,
                success: function (res) {
                    if(res.sCode==200){
                        var fileList=res.rsMap.fileList;
                        if(fileList!=null&&fileList.length){
                            var html='';
                            for(var i=0;i<fileList.length;i++){
                                var url=fileList[i].url;
                                if(url!=null&&url!=''){
                                    if(i == 0){
	                    				html+='<div class="lookimg" num="0"><div id="list"><img src="'+url+'"></div></div>';
                    				}else{
	                    				html+='<div class="lookimg" num="0" style="margin-top:10px;"><div id="list"><img src="'+url+'"></div></div>';
                    				}
                                }
                            }
                            //删除之前回显的图片
                            $("#showDiv_imglook").html(html);
                        }

                    }
                }
            });
              var obj={};
                   	//obj.approvalId = "HW1539155060208";
					obj.approvalId = localStorage.approvalId;
                    //TODO 大病帮扶 和职工帮困 的接口，返回值不同
                    var tempUrl ;
                    if(1==type){
                   		tempUrl = service.helpSeriousIllnessOpinion;
                    }else{
                		tempUrl = service.helpWorkerOpinion;
                    }
                    $.ajax({//意见
                        type: "POST",
                        url:tempUrl,
                        data:JSON.stringify(obj),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (res) {
                            if(res.sCode==200){
                                var opinionList=res.rsMap.opinionList;
                                var html="";
                                if(opinionList!=null&&opinionList.length>0){
                                if(type == 2){
                                	 for(var i=0;i<opinionList.length;i++){
                                	 	var opinion=opinionList[i];
                                	 	var opinionState=opinionList[i].opinionState;
                                	 	var auIDName=opinionList[i].auIDName;
	                        		    var opinionStateName=getOpinionStateName(opinionState);
	                        		     html+='<div class="um-row panel-info" id="gqgl">';
                         		        html+=' <div class="panel-info-title" style="display: Flex;padding:5px;background-color: #ffffff;"> <div style="width: 100%;">'+opinion.taskName+'</div>';                                    
                                        html+='<div style="text-align: right;width: 100%;color:#b7b8b7;font-size:12px;">'+opinion.createTime+'</div></div>';
									    html+='<div class="um-row content-container" style="padding-top:5px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">审批状态:</div>';
                                   	 	html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+opinionStateName+'</div></div>';
									    html+='<div class="um-row content-container" style="padding-top:5px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">审批人:</div>';
                                   	 	html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+auIDName+'</div></div>';
                               	 	
                                        if(opinion.helpAmount!=null&&opinion.helpAmount!=''){
                                         html+='<div class="um-row content-container" style="padding-top:0px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">帮扶金额</div>';
								 		 html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+opinion.helpAmount+'元 </div></div>';
                                        }
                                        if(opinion.helpGoodsAmount!=null&&opinion.helpGoodsAmount!=''){
                                         html+='<div class="um-row content-container" style="padding-top:0px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">帮扶物品等额</div>';
								 		 html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+opinion.helpGoodsAmount+'元 </div></div>';
                                        }
                                        html+='<div class="um-row content-container" style="padding-top:0px;padding-bottom:0px;"><div class="um-xs-12 um-sm-12 um-md-12 content-key" >审批意见:</div> </div>';	
									    html+='<div class="um-row content-container" style="padding-top:0px;padding-bottom:20px;"><div class="um-xs-12 um-sm-12 um-md-12 content-key" >'+opinion.opinion+'</div> </div>';	
                                     
                                       	html+='</div></div></div>';
                                 		}
                                }else{
                                    for(var i=0;i<opinionList.length;i++){
                                        var opinion=opinionList[i];
                                        var opinionState=opinionList[i].opinionState;
	                        		    var opinionStateName=getOpinionStateName(opinionState);
                                        var orgLevel=opinionList[i].orgLevel;
                                        var auIDName=opinionList[i].auIDName;
                                        if(html){
                                        html+='</div> '
                                        }else{
                                        }
                                        
                                        html+='<div class="um-row panel-info" id="gqgl">';
                         		        html+=' <div class="panel-info-title" style="display: Flex;padding:5px;background-color: #ffffff;"> <div style="width: 100%;">'+opinion.taskName+'</div>';                                    
                                        html+='<div style="text-align: right;width: 100%;color:#b7b8b7;font-size:12px;">'+opinion.createTime+'</div></div>';
									    html+='<div class="um-row content-container" style="padding-top:5px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">审批状态:</div>';
                                   	 	html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+opinionStateName+'</div></div>';
									    html+='<div class="um-row content-container" style="padding-top:5px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">审批人:</div>';
                                   	 	html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+auIDName+'</div></div>';
                               	 		 if(opinion.unionHelpAmount!=null&&opinion.unionHelpAmount!=''){
										   	html+='<div class="um-row content-container" style="padding-top:5px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">基层工会帮扶金额:</div>';
                                       	 	html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+opinion.unionHelpAmount+'元 </div></div>';
                                         }
                                        if(opinion.medicareHelpAmount!=null&&opinion.medicareHelpAmount!=''){
                                         html+='<div class="um-row content-container" style="padding-top:5px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">初定帮扶金额:</div>';
								 		 html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+opinion.medicareHelpAmount+'元 </div></div>';
                                        }
                                        if(opinion.topUnionHelpAmount!=null&&opinion.topUnionHelpAmount!=''){
                                         html+='<div class="um-row content-container" style="padding-top:5px;padding-bottom:0px;"><div class="um-xs-6 um-sm-6 um-md-6 content-key">集团工会帮扶金额:</div>';
								 		 html+='<div class="um-xs-6 um-sm-6 um-md-6 content-value" >'+opinion.topUnionHelpAmount+'元 </div></div>';
                                        }
                                        html+='<div class="um-row content-container" style="padding-top:0px;padding-bottom:0px;"><div class="um-xs-12 um-sm-12 um-md-12 content-key" >审批意见:</div> </div>';	
									    html+='<div class="um-row content-container" style="padding-top:0px;padding-bottom:20px;"><div class="um-xs-12 um-sm-12 um-md-12 content-key" >'+opinion.opinion+'</div> </div>';	
                                     
                                       	html+='</div>';
                                     
                                    }
                                    }
                                }
                                $("#optionsDIV").html(html);
                            }
                        }
                    });
            
}
