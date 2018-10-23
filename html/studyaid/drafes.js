function shareCancle() {
    UM.share.close();
}

$(function () {

	$("#title").text(localStorage.title);
	if('add' == localStorage.addOrUpdate){
		initEssentialInformation();
	}
    loadSelectFileButtion();
    UM.picker("#select1", {preset:"select"});
    $('.phone').on('click', function () {
        UM.actionsheet({
            title: '',  
            items: ['确认'],
            callbacks: [function () {
            	if('update' == localStorage.addOrUpdate){
            		updateGeData();
            	}else if('add' == localStorage.addOrUpdate){
	                submitGeData();
            	}
            }, function () {
                
            }, function () {
               
            }]
        });
    })
    
});

//起草
function submitGeData(){
	
	var examineeName =  $("#examineeName").val();//考生姓名
	var relation = $("#relation").val();//与申请人关系
	var age = $("#examineeAge").val();//年龄
	var idCard = $("#idCard").val();//身份证号
	var sex = $("#select1").val();//性别
	var graduateSchool = $("#graduateSchool").val();//毕业学院
	var major = $("#major").val();//专业
	var admissionsSchool = $("#admissionsSchool").val();//录取学校
	var bankNo = $("#bankNo").val();//银行卡
	var homeIncom = $("#homeIncom").val();//家庭收入及苦难情况
	//var state= 'DRAFT';//草稿状态 后期需要再加上
	var state= 'APPROVALING';//审批中
	var busiType='BUSI_TYPE_SA';//业务类型
	
	var obj={};
		obj.userId=localStorage.userid;
		//obj.worksId='0128e0a1-64f1-451f-990d-9e5ae4d14035'; //占时写死 因为基本信息回显接口没有查出数据
		obj.worksId=localStorage.userid; 
		obj.busiType=busiType;
		obj.state=state;
		obj.examineeName=examineeName; 
		//obj.headImg=headImg;
		obj.fileList=fileArray();
		obj.relation=relation;
		obj.age=age;
		obj.sex=sex;
		obj.idCard=idCard;
		obj.graduateSchool=graduateSchool;
		obj.admissionsSchool=admissionsSchool;
		obj.major=major;
		obj.bankNo=bankNo;
		obj.homeIncom=homeIncom;
	
	$.ajax({
	    type: "POST",
	    url: serviceUrl + "/studyAid/drafes",
	    data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
	    success: function (res) {
	        if (res.sCode==200){
	        	forword("geStudyaid","html/studyaid/exampleList.html");
	        } else {
	        	alert(res.msg);
	        }
	    } 
	});
}
//编辑
function updateGeData(){
	
	var examineeName =  $("#examineeName").val();//考生姓名
	var relation = $("#relation").val();//与申请人关系
	var age = $("#examineeAge").val();//年龄
	var idCard = $("#idCard").val();//身份证号
	var sex = $("#select1").val();//性别
	var graduateSchool = $("#graduateSchool").val();//毕业学院
	var major = $("#major").val();//专业
	var admissionsSchool = $("#admissionsSchool").val();//录取学校
	var bankNo = $("#bankNo").val();//银行卡
	var homeIncom = $("#homeIncom").val();//家庭收入及苦难情况
	//var state= 'DRAFT';//草稿状态 后期需要再加上
	var state= 'APPROVALING';//审批中
	var busiType='BUSI_TYPE_SA';//业务类型
	
	var obj={};
		obj.userId=localStorage.userid;
		obj.approvalId=localStorage.approvalId;
		obj.worksId=localStorage.userid; 
		obj.busiType=busiType;
		obj.state=state;
		obj.examineeName=examineeName; 
		obj.fileList=fileArray();
		obj.relation=relation;
		obj.age=age;
		obj.sex=sex;
		obj.idCard=idCard;
		obj.graduateSchool=graduateSchool;
		obj.admissionsSchool=admissionsSchool;
		obj.major=major;
		obj.bankNo=bankNo;
		obj.homeIncom=homeIncom;
	$.ajax({
	    type: "POST",
	    url: serviceUrl + "/studyAid/edits",
	    data:JSON.stringify(obj),
	    contentType: 'application/json;charset=utf-8',
	    dataType: 'json',
	    success: function (res) {
	        if (res.sCode==200){
	        	forword("geStudyaid","html/studyaid/exampleList.html");
	        } else {
	        	alert(res.msg);
	        }
	    } 
	});
}

//初始化基本信息
function initEssentialInformation(){
	var workId = localStorage.userid;
	//var workId = 'ec8b82b3-09c6-4cde-8c95-eec7a9822ce8';
	$.ajax({
        type: "GET",
        url:serviceUrl + "/workersController/workersList?userId="+workId+"&queryType=workersInfo",
        //data:JSON.stringify(obj),
        //contentType: 'application/json;charset=utf-8',
        //dataType: 'json',
        success: function (res) {
        	console.log(res);
        	if(res.sCode==200){
        		var list=res.rsMap.workersList;
        		for(var i = 0; i < list.length; i++){
        			$("#pcode").text(list[i].pcode);//工号
        			$("#name").text(list[i].name);//姓名
        			$("#sex").text(list[i].sex);//性别
        			$("#age").text(list[i].age);//年龄
        			$("#idcode").text(list[i].idcode);//身份证号
        			$("#phone").text(list[i].phone);//联系电话
        			$("#organization_name").text(list[i].organization_name);//工作单位
        			$("#homeaddress").text(list[i].homeaddress);//家庭住址
        			$("#workId").text(list[i].workId);
        		}
        	}
        }
    });	
}


//初始化
function loadSelectFileButtion(){
var html='<div class="preview">'
+'<ul class = "preview_img_list clearfix" style="line-height: 100px;">'
+' <li id="selectFileButtion" onclick="selectFileType()">'
+' <label><img id="button" src="../../img/fujian.png" style="height: 84px;"/></label>'
+'</li></ul></div>';
$('#uploadFileList').html(html);

}

/**
 *选择拍照 、相册、取消 
 */
function selectFileType(){
	UM.actionsheet({
		  title: '选择照片',
		  items: ['从图库中选择', '照相'],
			callbacks: [function () {
				getPhoto(pictureSource.PHOTOLIBRARY);//图库base64
				//openPhotoAlbum();//调用图库物理路径
				}, function () {//相机
				capturePhoto();//调用相机base64
				//openCamera();//调用相机物理路径
			   }]
			});
}
//------------------获取图片物理路径----------------------------
//打开相册-------------------------------------------
function openPhotoAlbum(){
    summer.openPhotoAlbum({
        type:'multiple',
        maxCount:3,
        callback :"initPic()"
    })
}
//打开照相机功能
function openCamera(){
    summer.openCamera({
        callback : "initPic()"
    });
}
//选择图片后回调初始化显示页面进行预览
function initPic(sender, args){
  var imgPath=args.imgPath;
  var html = '<li style="position: relative;">'+
  				'<img src="../../img/clear.png" style="width: 16px;height: 16px;position: absolute;right: 8px;bottom: 74px;" onclick="removeImg(this)"/>'+
  				'<img src="'+imgPath+'" />'+
  			'<li/>';
  			
  $("#selectFileButtion").before(html);
}
//----------------------------------------------------------------------------
//移除选择图片
function removeImg(obj){
	if(confirm("确定移除图片")){
		$(obj).parent().remove();
	}else{
		
	}
}

//获取准备上传的图片地址集合
function fileArray(){
	var fileArray=new Array();
   $(".preview_img_list img").each(function(){
      var fileURL = $(this).attr("src");
      var imgId=$(this).attr("id");
      if(imgId !='button'){//除选择按钮和删除按钮完外 所有选择的图片
	      fileArray.push(fileURL);
      }
      //var imgId=$(this).id;
      //if(imgId!='button'){//除选择按钮完外 所有选择的图片
      //"imgPath":"/storage/emulated/0/DCIM/Camera/IMG_20180113_184311_HHT.jpg"
      //获取图片的名称
     //var index =fileURL.lastIndexOf("\/");  
     //var name=fileURL.substring(index+1,fileURL.length);
     // var imgObj={};
     // imgObj.fileURL=fileURL;
     // imgObj.type='image/jpeg';
     // imgObj.name=name;
     // fileArray.push(imgObj);
     // }
  });
  return fileArray;
}



//调用照相机或者手机相册返回base64------------------------------
var pictureSource;   // picture source   
var destinationType; // sets the format of returned value  
document.addEventListener("deviceready",onDeviceReady,false);  
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;        
	destinationType=navigator.camera.DestinationType;    
}     

//onclick="removeImg(this)"
function onPhotoDataSuccess(imageData) {  
 // var previewImgList = document.querySelector('.preview_img_list');
  var selectFileButtion = document.querySelector('#selectFileButtion');
 // var li = document.createElement('li');
  //var img = document.createElement("img");                  
	imageData= "data:image/jpeg;base64," + imageData; 
	//alert(imageData);
 //   img.src=imageData; 
    
 //    li.appendChild(img);
     
       var html = '<li style="position: relative;">'+
  				'<img id="button" src="../../img/clear.png" style="width: 16px;height: 16px;position: absolute;right: 5px;bottom: 80px;" onclick="removeImg(this)"/>'+
  				'<img src="'+imageData+'" />'+
  			'<li/>';
     $("#selectFileButtion").before(html);
    // selectFileButtion.before(html);  
} 
function capturePhoto() { //相机     
	navigator.camera.getPicture(onPhotoDataSuccess,onFail, { quality: 50,destinationType: destinationType.DATA_URL })
}      
function capturePhotoEdit() { // 相机截图        
	navigator.camera.getPicture(onPhotoDataSuccess,onFail,{ quality: 20, allowEdit: true,destinationType: destinationType.DATA_URL })
}      
   
function getPhoto(source) { //相册      
	navigator.camera.getPicture(onPhotoDataSuccess,onFail,{ quality: 20, destinationType: destinationType.DATA_URL,sourceType: source })
}      
function onFail(message) {      
	alert('Failed because: ' + message);    
}   
