var viewModel;
summerready = function(){
	
	var versionInfo = summer.getAppVersion();//返回字符串类型
	var version  = JSON.parse(versionInfo);//转换为json
	var versionName = version.versionName;//获取版本信息
	
	var apiToken = '45d9f00e80e6f1e06afee87593a98ffd';
	var appID = '';
	var info = summer.getSysInfo();
	if (info.systemType == "android") {
		appID = '5b84ae2a548b7a389081c036';
	}else if (info.systemType == "ios") {
		appID = '5ba9a4d6959d694953cf0012';
	}
	
	summer.ajax({
        "header":{Authorization: "OAuth2: token"},//可选参数，方便开发者设置请求的header
        "type":"get",//请求方式
        "url":"http://api.fir.im/apps/latest/"+appID+"?api_token="+apiToken+"",//url地址
    }, function(response){//成功回调
        //var data = response.data;
        var data = $summer.strToJson(response.data);
        if(data.versionShort > versionName){
        		summer.openWebView({
                     "url" : data.update_url
                })
        		return;
        }
    }, function(response){ //失败回调
        	summer.toast({
                 "msg" : "网络请求错误" 
            });
    });
	
	$('.username').val(summer.getStorage("lk_username"));
    $('.pwd').val(summer.getStorage("lk_pwd"));
    setBtnLogin(summer.getStorage("lk_username"),summer.getStorage("lk_pwd"));
    var autoLogin = summer.getStorage("lk_autoLogin")==='false'?false:true;
    $("[name = um-checkbox-inline]:checkbox").attr("checked", autoLogin);
    
    $('.clear').on('click',function(){
    	$(".btn-login").css("background-color","#b1b1b1");
		$(".btn-login").attr('disabled',true);
    })
    
    $('#changePassType').on('click',function(){
        var $this = $(this);
        var type = $('.pwd').attr('type')=='text'?'password':'text';
        $('.pwd').attr('type',type);
        $this.toggleClass('show-pass');
    })
    
    //登录点击事件
    $('.btn-login').on('click',function(){
    	var username = $('.username').val().trim();
    	var pwd = $('.pwd').val().trim();
    	if(isNull(username)||isNull(pwd)){
    		$summer.alert("信息填写不完整");
    		return;
    	}
    	summer.setStorage("lk_username", username);
    	var check = $("input[type='checkbox']").is(':checked');
    	if(check){
    		summer.setStorage("lk_pwd", pwd);
    	}else{
    		summer.setStorage("lk_pwd", "");
    	}
    	summer.setStorage("lk_autoLogin", check);
    	loginNetWork(username,pwd);
    })
    
}
function confirmInputChange() {
	var pwd = $('.pwd').val();
	var username = $('.username').val();
	setBtnLogin(username,pwd);
}
function setBtnLogin(username,pwd){
	if (isNull(pwd)||isNull(username)) {
		$(".btn-login").attr('disabled',true);
	} else {
		$(".btn-login").attr('disabled',false);
		$('.btn-login').css('background-color','#cc3535');
	}
}
//登录请求服务 
function loginNetWork(username,pwd){
	var url = getHttpPro()+'mologin/formLogin';
	UM.showLoadingBar({
        "text" : "加载中",
        "icons" : "ti-loading"
    });
    
	summer.ajax({
        "type":"post",//请求方式
        "url":url,//url地址
        "param":{ user: username,pwd: pwd,registrationId:''},//可选参数，post请求的要写入的条件数据，须为json对象 
    }, function(response){//成功回调
        var res = $summer.strToJson(response.data);
    	
        if(res.flag=="success"){
        	summer.setStorage("usercode", res.usercode);
	    	summer.setStorage("name", res.user.name);
	    	summer.setStorage("img", res.user.img);//用户头像
        	summer.setStorage("lk_isLeader", res.isLeader);
        	UM.hideLoadingBar();
        	summer.setStorage("lk_userInfo", res.user);
        	localStorage.userid = res.user.id;
        	summer.openWin({
                "id" : "index",
                "url" : "html/index/index.html",
                "addBackListener":"true",
                isKeep:false,
                statusBarStyle:'dark',
            });
        }else{
        	UM.hideLoadingBar();
        	summer.toast({
                 "msg" : res.msg||"登录失败" 
            });
        }
    }, function(response){//失败回调
    	UM.hideLoadingBar();
        summer.toast({
                 "msg" : "登录失败" 
            });
    });
}
function isNull(args){
	return args == null || args=="null" || args == undefined || args == "undefined" || args == "";
}
function trim(str){
     return str.replace(/(^\s*)|(\s*$)/g,""); 
} 

