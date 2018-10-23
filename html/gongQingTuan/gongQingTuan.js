summerready=function(){
	hp_slide();//滑动事件，放在最前面
	//getUserInfo();//获取用户（停用）
	$(function() {
        			var list = [
        				{
        					content: getHttp()+"image/gQT_banner1.png"
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

// 专题学习
function zhuanTiXueXi(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010401",
            "pageTitle":"专题学习",
        }
    });
	
}

// 品牌建设
function ziJianPingPai(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010402",
            "pageTitle":"品牌建设",
        }
    });
	
}

//团员推优
function tuiYouClick(){
	summer.openWin({
        "id" : "tuanYuanTuiYou",
        "url" : "html/tuanYuanTuiYou/tuanYuanTuiYou.html",
       "isKeep" : true,
    });
}
//团费管理
function tuanFeiClick(){
	summer.openWin({
        "id" : "tuanFeiGuanLi",
        "url" : "html/tuanFeiGuanLi/tuanFeiGuanLi.html",
       	"isKeep" : true,
       
    });
   
  /* summer.openWin({
	  id:'tuanFeiGuanLi_win',
	  url:'html/tuanFeiGuanLi/tuanFeiGuanLi_win.html',
	  type: "actionBar",
	  create: false, //设置保留原生header
	  actionBar: {
	      title: "团费管理",
	      titleColor: "#ffffff", //注意必须是6位数的颜色值。（3位数颜色值会不正常）
	      backgroundColor: "#FF0000",
	      leftItem:{
	          image: "img/back.png",
	          method:"", //返回按钮自定义事件，不传方法时默认点击返回后关闭当前页面，也可在打开的window中自定义事件
	          text:"返回",
	          textColor:"#ffffff"  //返回文字颜色，注意必须是6位数的颜色值。（3位数颜色值会不正常）
	      }, 
	      
	      pageParam : {
		      "pageTitle":"团费管理",
		  },
	      
	  }
	});
*/
}




function backClick(){
		summer.closeWin({});
}