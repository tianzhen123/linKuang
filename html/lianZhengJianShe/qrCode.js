summerready=function (){
	var param = summer.pageParam.param;
	var exammode = param.exammode;//1 打分; 2 满意度
	var pk_psexamsub = param.pk_psexamsub;//评测标准主键
	var id = param.id;//评测单位主键
	var startTime = param.startTime;//开始时间
	var endTime = param.endTime;//结束时间
	var orgName = param.orgName;//评测单位名称
	var examname = param.examname;//评测标准名称
	var url = "";
	var examtype = param.examtype*1;
	if(examtype == 1){//领导班子测评
		if( parseInt(exammode) == 1 || exammode == "1"){
			url = getHttpPro()+"pages/psexamdict/lingDaoBanZiCePing.html";
		}else{
			url = getHttpPro()+"pages/psexamdict/lingDaoBanZiCePing2.html";
		}
	}else{//领导班子成员测评
		if(parseInt(exammode) == 1 || exammode == "1"){
			url = getHttpPro()+"pages/psexamdict/banZiChengYuan.html";
		}else{
			url = getHttpPro()+"pages/psexamdict/banZiChengYuan2.html";
		}
	}
	url = url + "?pk_psexamsub="+pk_psexamsub+"&nm="+id+"&orgName="+orgName+"&examname="+examname+"&startTime="+startTime+"&endTime="+endTime;
	var text = encodeURIComponent(url);
	document.getElementById("imageId").src = ""+getHttpPro()+"qrcode/get?text="+text;
			
}
function backClick(){
	summer.closeWin();
}