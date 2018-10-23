summerready=function(){
	var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;
    var height = $summer.offset($summer.byId('main')).h;
	UM.showLoadingBar({
                "text" : "加载中",
                "icons" : "ti-loading"
            });
    summer.openFrame({
        name: 'mobileEbook-frame',
        url: 'html/ebook/mobileEbook-frame.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        }
    });
    UM.hideLoadingBar();
}
function backClick(){
  	summer.closeWin({});
}