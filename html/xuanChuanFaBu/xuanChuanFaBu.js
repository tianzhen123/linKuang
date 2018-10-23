var viewModel;
var ulHeight;
summerready = function(){
	
	var alCommit = document.querySelector(".alCommit"),
	commitUl = document.querySelector(".commitUl"),
	topTurn = document.querySelector("#topTurn"),
	addBtn = document.querySelector(".addBtn");
	var ul = document.querySelector('ul');
	ul.style.height = '200px';
	
	$('.um-content').hide();
	
	//行点击隐藏/展开 ul列表
	alCommit.onclick = function(){
		if(commitUl.offsetHeight){
			commitUl.className = 'on';
			topTurn.className = 'on';
			ul.style.height = '0px';
		}else{
			commitUl.className = '';
			topTurn.className = '';
			ul.style.height = ulHeight+'px';
		}
	}
	
	//新增点击事件
	addBtn.onclick = function(){
		summer.openWin({
            "id" : "editNews",
            "url" : "html/xuanChuanFaBu/editNews.html",
            "pageParam" : {
                "type" : "add"
            }
        });
	}
	
	viewModel = {
		cgx : ko.observableArray([]),
		dsp : ko.observableArray([]),
		ysp : ko.observableArray([]),
		turnClick:function(data){//已审批节点 点击事件
			summer.openWin({
                "id" : "newsList",
                "url" : "html/xuanChuanFaBu/newsList.html",
                "pageParam" : {
                    "param" : data,
                    "type" : 1
                }
            });
		},
		turnClick2:function(data){//草稿箱和待审批的点击事件
			summer.openWin({
                "id" : "newsList",
                "url" : "html/xuanChuanFaBu/newsList.html",
                "pageParam" : {
                    "param" : data,
                    "type" : 2
                }
            });
		}
	}
	ko.applyBindings(viewModel);
	
	netWork();
}
function netWork(){
	var url = getHttpPro()+"infoMobile/list";
	UM.showLoadingBar({
        "text" : "加载中",
        "icons" : "ti-loading"
    });
	summer.ajax({
        "header":{Authorization: "OAuth2: token"},//可选参数，方便开发者设置请求的header
        "type":"get",//请求方式
        "url":url,//url地址
    }, function(response){//成功回调
        var data = $summer.strToJson(response.data);
        UM.hideLoadingBar();
        $('.um-content').show();
        if (data.success == "success") {
			respData = data.detailMsg.data;
			viewModel.cgx(respData.cgx);
			viewModel.dsp(respData.dsp);
			viewModel.ysp(respData.ysp);
			var ul = document.querySelector('ul');
			ul.style.height = respData.ysp.length*46+'px';
			ulHeight = respData.ysp.length*46;
		} else {
			summer.toast({
                 "msg" : "加载失败!" 
            })
		}
    }, function(response){//失败回调
    	UM.hideLoadingBar();
        summer.toast({
                 "msg" : "加载失败!" 
            })
    });
}
function backClick(){
  	summer.closeWin({});
}