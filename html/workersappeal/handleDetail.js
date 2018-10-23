function backClick(){
  	summer.closeWin({});
}

function shareCancle() {
    UM.share.close();
}
var waTypeName="";
$(function () {
//var orgLevelObj = getOrgLevel();
//if(orgLevelObj.orgLevel == 1 || orgLevelObj.orgLevel == 2){
	//$("#fillReportBtn").show();
//}

    $("#fillReportBtn").on('click', function () {
        UM.actionsheet({
            title: '',  
            items: ['满意','不满意'],
            callbacks: [function () {
            	submitGeData("satisfaction");
            }, function () {
            	submitGeData("dissatisfaction");
            }]
        });

    })
    
	//var approvalId='WA1539860265682';
	var approvalId=localStorage.approvalId;
	
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
    		//
    		$("#appealContent").text(node.appealContent);
    		 //
    		$("#appealExpect").text(node.appealExpect);
    		//头像
    		//$("#img").prop("src",node.headImg);
    		
			waTypeName = transWaTypeName(node.type);
			if(node.workerId==localStorage.userid && node.state=='DRAFT' && node.opinionNum > 0){
				$("#fillReportBtn").show();
				$("#titleId").text("我发起的");
			}
			//viewModel.data(gejsonArray);
			
			
			
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
        	console.log(res);
        	if(res.sCode==200){
        		var fileList=res.rsMap.fileList;
        		if(fileList!=null&&fileList.length){
        			var html='';
        			for(var i=0;i<fileList.length;i++){
        				var url=fileList[i].url;
        				html+='<img src="'+url+'" style="width: 24%;height: 84px;margin-left: 1%;margin-top: 1%;">';
        			}
        			//删除之前回显的图片
        			$('#div_imgfile').html(html);
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
                var html='';
                if(opinionList!=null&&opinionList.length>0){
                	for(var i=0;i<opinionList.length;i++){
                		
                		if(i == opinionList.length-1){
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

//评价
function submitGeData(opeType){

    var approvalId=localStorage.approvalId;
    //var taskId=localStorage.taskId;
	
	var obj={};
		obj.userId=localStorage.userid;
		obj.approvalId=approvalId; 
		//obj.taskId="15115";//暂时写死
		obj.opinion="";
		obj.opeType=opeType; 		
	
	$.ajax({
	    type: "POST",
	    url: serviceUrl + "/workersAppeal/submitOpinion",
	    data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
	    success: function (res) {
	        if (res.sCode==200){
	        	forword("mywork","html/workersappeal/mylaunch.html");
	        } else {
	        	alert("评价失败");
	        }
	    } 
	});
}
