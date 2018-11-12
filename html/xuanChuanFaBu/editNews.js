var param,imageArray=[],billstatus,infostatus;
summerready = function(){
	param = summer.pageParam;
	window.type = param.type;
	document.querySelector('#pageTitle').innerText = param.pageTitle;
	loadSelectFileButtion();
	if(window.type == "edit"){//草稿箱
		$('.panel-info').hide();
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
	    
	}else{
		document.querySelector('#pageTitle').innerText = "投稿"
		document.querySelector('.create-time').value = getMyDate();
	}
	imgCenter();
	var addBtn = document.querySelector('.addBtn');
	addBtn.onclick = function(){
		var title = document.querySelector('.title').value;
		if(isNull(title)){
			$summer.alert("标题不能为空");
			return;
		}else{
			//saveFun(1,"待宣传干事审核");
			billstatus = 1;
			infostatus="待宣传干事审核";
			uploadImgs();
			
		}
	}
	
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
	window.error = function(error){
		console.log(error);
	}
	
}
function uploadImgs(){
	UM.showLoadingBar({
	    "text" : "上传中",
	    "icons" : "ti-loading"
	});
	 summer.multiUpload({
	  fileArray : imageArray,
	  params : {
	   para1 : "1",
	   para2 : 2
	  },
	  headers : {},
	  SERVER : getHttpPro()+"infoMobile/uploadcreatebillimgs",
	  timeout : 10
	 }, "multiUploadCallback()", "multiUploadErrCallback()");
 
}
function multiUploadCallback(ret) {
 saveFun(billstatus,infostatus,ret);
};
function multiUploadErrCallback(err) {
 alert("失败" + JSON.stringify(err));
}

//提交
function saveFun(billstatus,infostatus,ret){

	var url = getHttpPro()+'infoMobile/save';
	
	var jsonData = [{
		title : document.querySelector('.title').value,
		summary : document.querySelector('.summary').value,
		tag : document.querySelector('.tag').value,
		create_time : new Date(document.querySelector('.create-time').value).getTime(),
		content : $('.editor').html(),
		billstatus : window.type == "edit"?0:1,
		infostatus : infostatus,
		billstatus : billstatus,
		mimages : ret.detailMsg.data.mimages.join(',')
	}];
	if(window.type == "edit"){
		jsonData[0].id = window.param.content.id;
	}
	var param = JSON.stringify(jsonData);
	
	$.ajax({
		url : url,
		type : 'post',
		data : param,
		dataType : 'json',
		contentType : 'application/json', 
		//可选参数，方便开发者设置请求的header
	    success:function(data){//成功回调
	    	UM.hideLoadingBar();
	        summer.toast({
                 "msg" : "保存成功" 
            });
            if(window.type == "edit"){//草稿箱
            	var jsfun = 'function_pullDown();';
				summer.execScript({
				    winId: 'newsList',
				    script: jsfun
				});
            }else{
            	var jsfun = 'netWork();';
				summer.execScript({
				    winId: 'html/xuanChuanFaBu/xuanChuanFaBu.html',
				    script: jsfun
				});
            }
            summer.closeWin({});
	    },error: function(error){//失败回调
	    	UM.hideLoadingBar();
	        summer.toast({
                 "msg" : "保存失败,请重试" 
            })
	    }
	    });
}

function backClick(){
	var title = document.querySelector('.title').value;
	if(isNull(title)){
		summer.closeWin({});
	}else{
		UM.confirm({
		    title: '请选择：',
		    text: '是否保存？',
		    btnText: ["取消", "保存"],
		    overlay: true,
		    ok: function () {
		        //saveFun(0,"待提交");
		        billstatus = 0;
				infostatus="待提交";
		        uploadImgs();
		    },
		    cancle: function () {
		        summer.closeWin({});
		    }
		});
	}
}
function imgCenter(){
	var frameId = document.getElementById("article-body");
	var length_p =  $("#article-body p").length;
	for(var i=0;i<length_p;i++){
		var p = frameId.getElementsByTagName("p")[i];//dom对象转换为jquery对象
		if($(p).find('img').length != 0){
			p.setAttribute('style', 'text-indent: 0');
		}
	}
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
function imgCenter(){
	var frameId = document.getElementById("editorBody");
	var length_p =  $("#editorBody p").length;
	for(var i=0;i<length_p;i++){
		var p = frameId.getElementsByTagName("p")[i];//dom对象转换为jquery对象
		if($(p).find('img').length != 0){
			p.setAttribute('style', 'text-indent: 0');
		}
	}
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
				//getPhoto(pictureSource.PHOTOLIBRARY);//图库base64
				openPhotoAlbum();//调用图库物理路径
				}, function () {//相机
				//capturePhoto();//调用相机base64
				openCamera();//调用相机物理路径
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
  			'</li>';
  			
  $("#selectFileButtion").before(html);
  imageArray.push({
			 fileURL : imgPath,
			 type : "image/jpeg",
			 name : "imgs"+imgPath
			 });
}
//----------------------------------------------------------------------------
//移除选择图片
function removeImg(obj){
	if(confirm("确定移除图片")){
		var n = $(obj).parent().index();
		imageArray=$.grep(imageArray,function(n,i){
			return i!=1;
		});
		$(obj).parent().remove();
	}else{
		
	}
}

//获取准备上传的图片地址集合
function fileArray(){
	var fileArray =new Array();
   $(".preview_img_list img").each(function(){
      var fileURL = $(this).attr("src");
      var imgId=$(this).attr("id");
      if(imgId !='button'){//除选择按钮和删除按钮完外 所有选择的图片
	      fileArray.push({
			 fileURL : fileURL,
			 type : "image/jpeg",
			 name : "imgs"+imgId
			 });
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
function keyBack(){
    backClick();
}