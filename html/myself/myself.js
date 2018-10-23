function about(){
	summer.openWin({
        "id" : "aboutWe",
        "url" : "html/myself/aboutWe.html",
    });
}
function help(){
	summer.toast({
         "msg" : "新手帮助！" 
    })
}
function signout(){
	summer.openWin({
         "id" : "login",
         "url" : "html/login/login.html",
         isKeep:false,
     });
}

var userid;
var usercode;
var name;
var img;
summerready = function (){
	usercode = summer.getStorage("usercode");
	img = summer.getStorage("img");
	name = summer.getStorage("name");
	if(img == "null" || img == "" || img == null){
		$("#userimg").attr("src","../../img/pic_init.png");
	}else{
		$("#userimg").attr("src",img);
	}
	$("#name").text(name);
	$("#usercode").text(usercode);
	netService(userid);
}

//网络请求
function netService(){
	var url = ""+getHttpPro()+"mologin/getorg?userid="+usercode;
	summer.get(url, {}, {
				    "Content-Type" : "application/x-www-form-urlencoded", 
				},//url地址 
    function(response){//成功回调
    	
        var data = $summer.strToJson(response.data);
        if (data.success == "success") {
        	data = data.detailMsg.data;
			if(data.Dname !="" && data.Dname !=null){
				$("#dang").text(data.Dname);
				$("#li1").show();
			} if(data.Gname !="" && data.Gname !=null){
				$("#gonghui").text(data.Gname);
				$("#li2").show();
			} if(data.Tname !="" && data.Tname !=null){
				$("#tuan").text(data.Tname);
				$("#li3").show();
			}if((data.Tname ==""|| data.Tname ==null) && (data.Gname =="" || data.Gname ==null)&& (data.Tname =="" || data.Tname ==null)){
				$("#imgid").attr("src","../../img/tishi.png");
				$("#dang").text("暂无所属组织");
				$("#li1").show();
			}
		}
	}, function(response) {//失败回调
		
	});
}



