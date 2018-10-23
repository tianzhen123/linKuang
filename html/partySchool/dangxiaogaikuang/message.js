function backClick(){
	summer.closeWin({});
}
summerready = function(){

	var reqUrl = getHttpPro()+"dxbasic/list";//党校概况
	summer.ajax({
        "header":{Authorization: "OAuth2: token"},//可选参数，方便开发者设置请求的header
        "type":"get",//请求方式
        "url":reqUrl,//url地址
        "async": false,
    }, function(response){//成功回调
        var res = $summer.strToJson(response.data);
        var content = res.detailMsg.data.content[0].content;
        var title = res.detailMsg.data.content[0].title;
        var frame = document.querySelector("#frame");
        var time = res.detailMsg.data.content[0].create_time;
        time = Number(time);
        //重写时间格式
        Date.prototype.toLocaleString = function() {
	      return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
	    };
		var newTime = new Date(time) ;
		time = newTime.toLocaleString();
		
        $("#time").text(time);
        $("#title").text(title);
        frame.innerHTML = content;
        imgCenter();
    }, function(response){//失败回调
        summer.toast({
             "msg" : "请求异常" 
        })
    });
}




