summerready=function(){
	hp_slide();//滑动事件，放在最前面
	//getUserInfo();//获取用户（停用）
	$(function() {
        			var list = [
        				{
        					content: "../../img/laoGanBuGongZuo_slider.jpg"
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
//老干部工作动态
function laoGanBuDongTai(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010601",
            "pageTitle":"老干部工作动态",
        },
    });
}
//阵地建设
function zhenDiJianShe(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010602",
            "pageTitle":"阵地建设",
        },
    });
}
//政策之窗
function zhengCeZhiChuang(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010603",
            "pageTitle":"政策之窗",
        },
    });
}
//夕阳风采
function xiYangFengCai(){
	   summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010604",
            "pageTitle":"夕阳风采",
        },
        
    });
}

//健康之道
function jianKangZhiDao(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010605",
            "pageTitle":"健康之道",
        },
    });
}

function backClick(){
	summer.closeWin({});
}

