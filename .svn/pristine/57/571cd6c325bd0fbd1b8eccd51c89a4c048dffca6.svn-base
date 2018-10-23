function backClick(){
	summer.closeWin({});
}
summerready = function(){

	var reqUrl = getHttpPro()+"motto/list";
	summer.ajax({
        "header":{Authorization: "OAuth2: token"},//可选参数，方便开发者设置请求的header
        "type":"get",//请求方式
        "url":reqUrl,//url地址
        "async": false,
    }, function(response){//成功回调
        var res = $summer.strToJson(response.data);
        var content = res.detailMsg.data.content[0].content;
        var frame = document.querySelector("#frame");
        frame.innerHTML = content;
        imgCenter();
    }, function(response){//失败回调
        summer.toast({
             "msg" : "请求异常" 
        })
    });
}
