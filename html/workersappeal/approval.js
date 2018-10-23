function shareCancle() {
    UM.share.close();
}
var orgObj = getOrgLevel();

if(orgObj.orgLevel == 1 || orgObj.orgLevel == 2){
	$("#fillReportBtn").show();
	if(orgObj.orgLevel == 1){
		$("#submitText").html("提交");
	}
}
var waTypeName="";
$(function () {
	waType("select1");
	UM.picker("#select1", {preset:"select"});

	var xuanze = localStorage.xuanze;
	var taskMode = localStorage.taskMode;  //待办or待阅

    //控制是从我的工作进入的详情页还是公司列表进入的详情页
    if("myWork" == xuanze){
    	if("do"==taskMode){
    		$("#fillReportBtn").show();
    	}else{
    		$("#fillReportBtn").hide();
    		workerToRead();
    		$("#showOpinionId").hide();		
    	}		
	}else{	
		$("#fillReportBtn").hide();
		$("#showOpinionId").hide();		
	}

    $("#fillReportBtn").on('click', function () {
        UM.actionsheet({
            title: '',  
            items: ['确认','结束'],
            callbacks: [function () {
                submitGeData('');
            }, function () {
                submitGeData('FINISH');
            }, function () {
               
            }]
        });
    })
    
    $("#unionFeedbackBtn").on('click', function () {
    	forword("mywork","html/workersappeal/replyGroup.html");
    })
    
    var approvalId=localStorage.approvalId;
    //var approvalId='WA1539089108680';
	var jsonData={"approvalId":approvalId}
	var obj={};
	//obj.userId=userId;
	obj.busiType='BUSI_TYPE_WA';
	obj.approvalId=approvalId;
	$.ajax({
		type:'post',
		url:serviceUrl+'/workersAppeal/getWorkersAppealInfo',
		data:JSON.stringify(obj),
		contentType: 'application/json;charset=utf-8',
	    dataType: 'json', 
		success:function(res){
			console.log(res);
			
			if(res.sCode != 200){
				return;
			}
			
			var node=res.rsMap.workersAppeal;
        	$("#title").text(node.title);
        	$("#name").text(node.name);
        	$("#typeName").text(node.typeName);
        	
        	//
    		$("#approvalTime").text(node.approvalTime);
    		$("#title").text(node.title);
    		//
    		$("#appealContent").text(node.appealContent);
    		$("#appealExpect").text(node.appealExpect);
    		$("#appealExpect").text(node.appealExpect);
    		//头像
    		//$("#img").prop("src",node.headImg);
			waTypeName = transWaTypeName(node.type);
    		orgObj.opinionNum = node.opinionNum;
    		if("myWork" == xuanze && "do"==taskMode){
    		    if(node.opinionNum == 0){
					$("#approvalTypeId").show();
				}	

				if(orgObj.orgLevel == 2 && node.opinionNum > 3){
					$("#unionId").show();
				}
    		}
		
		},
		error:function(er){
			console.log(er)
		}
	});
	
    
    $.ajax({//附件
        type: "POST",
        url:serviceUrl + "/baseController/fileList",
        data:JSON.stringify(obj),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (res) {
        	if(res.sCode==200){
        		var fileList=res.rsMap.fileList;
        		if(fileList!=null&&fileList.length){
        			var html='';
        			for(var i=0;i<fileList.length;i++){
        				var url=fileList[i].url;
        				html+='<img src="'+url+'" style="width: 24%;">';
        				//html+='<div class="lookimg" num="0"><img src="'+url+'"></div>';
        			}
        			//删除之前回显的图片
        			
        			$('#files').html(html);
        		}
        		
        	}
        }
    });
    
    var obj={};
	obj.approvalId=approvalId;
	$.ajax({//意见
        type: "POST",
        url:serviceUrl + "/workersAppeal/opinionList",
        data:JSON.stringify(obj),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (res) {
        	if(res.sCode==200){
                var opinionList=res.rsMap.opinionList;
                var auIDName=res.rsMap.auIDName;
                var html='';
                if(opinionList!=null&&opinionList.length>0){
                	for(var i=0;i<opinionList.length;i++){
                		var opinion=opinionList[i];
                		var orgName = "";
                		if(opinion.orgName!=undefined){
                			orgName = opinion.orgName;
                		}
                		var assessmentName=opinion.assessmentName;
			    		if('undefined'==assessmentName||assessmentName==null){
			    			assessmentName='';
			    		}   
		    			 html+='<div class="um-row pt15 f14">'+
							   '	<div class="um-xs-7 f12" style="color:#d21d32; ">'+
								'	诉求类别：'+waTypeName+
					    		'   </div>'+
								'   <div class="um-xs-5 f12 tr" style="color:#999999;">'+
							    '    <span>'+opinion.opinionTime+'</span>'+
								'   </div>'+
								'</div>'+
								
								'<div class="um-row pt15 f14">'+
							   '	<div class="um-xs-12 f12">'+
								'	审批人：'+auIDName+''+
					    		'   </div>'+
								'</div>'+
								'<div class="um-row pt15 f14">'+
							   '	<div class="um-xs-12 f12">'+
								'	组织：'+orgName+''+
					    		'   </div>'+
								'</div>'+
								'<div class="um-row pt15 f14">'+
							   '	<div class="um-xs-12 f12">'+
								'	回复：'+opinion.opinion+''+
					    		'   </div>'+
								'</div>';
							if(assessmentName!=''){
								 html+='<div class="um-row pt15 f14">'+
							   '	<div class="um-xs-12 f12">'+
								'评价结果:'+assessmentName+''+
					    		'   </div>'+
								'</div>';
								}
								
                	}
                	
                }	
                $('#opinionList').html(html);
         	}
        }
    });	
});

function transWaTypeName(waType){
    var name="";
	if('traffic'==waType){
		name="交通";
	}else if('safe'==waType){
		name="安全生产";
	}else if('life'==waType){
		name="群众生活";
	}
	return name;
}

//回复/提交
function submitGeData(opeType){
    var approvalId=localStorage.approvalId;
    var taskId=localStorage.taskId;
	
	var opinion =  $("#opinion").val();//标题
	var type = $("#select1").val();//诉求类别
    
	
	//var obj={};
		//obj.userId=localStorage.userid;
		//obj.worksId='0128e0a1-64f1-451f-990d-9e5ae4d14035'; //占时写死 因为基本信息回显接口没有查出数据
		//obj.approvalId=approvalId; 
		orgObj.taskId=taskId;
		orgObj.opinion=opinion;
		orgObj.type=type; 		
		orgObj.opeType=opeType; 	

	
	$.ajax({
	    type: "POST",
	    url: serviceUrl + "/workersAppeal/submitOpinion",
	    data:JSON.stringify(orgObj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
	    success: function (res) {
	        if (res.sCode==200){
	        	forword("mywork","html/mywork/myworker.html");
	        } else {
	        	alert(res.msg);
	        }
	    } 
	});
}

//待阅转已阅
function workerToRead(){

    var approvalId=localStorage.approvalId;
    var taskId=localStorage.taskId;    
	
	var obj={};
		obj.userId=localStorage.userid;
		obj.taskId=taskId;
		obj.approvalId=approvalId; 		

	
	$.ajax({
	    type: "POST",
	    url: serviceUrl + "/workersAppeal/workerToRead",
	    data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
	    success: function (res) {
	        if (res.sCode==200){
	        	
	        } else {
	        	alert(res.msg);
	        }
	    } 
	});
}

