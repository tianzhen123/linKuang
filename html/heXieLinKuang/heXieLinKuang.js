summerready=function(){
	hp_slide();//滑动事件，放在最前面
	//getUserInfo();//获取用户（停用）
	$(function() {
        			var list = [
        				{
        					content: getHttp()+"image/hX_banner1.png"
        				}, 
        			];
        			var islider = new iSlider({
        				type: 'pic',
        				data: list,
        				dom: document.getElementById("iSlider-wrapper"),
        				isLooping: true,
        				animateType: 'default',
        				isAutoplay: true,
        				animateTime: 800
        			});
        			islider.addDot();
        		})
}

/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}

//信访案例
function xinFangClick(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010501",
            "pageTitle":"信访案例",
        }
    });
}

//工作动态
function workActive(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010502",
            "pageTitle":"工作动态",
        }
    });
}





function backClick(){
	summer.closeWin({});
}