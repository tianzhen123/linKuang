
summerready=function(){
	hp_slide();//滑动事件，放在最前面
	//getUserInfo();//获取用户（停用）
	$(function() {
        			var list = [
        				{
        					content: getHttpPro()+"image/jiJian_banner1.png"
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
//党风廉政建设
function lianZhengClick(){
	summer.openWin({
        "id" : "lianZhengJianShe",
        "url" : "html/lianZhengJianShe/lianZheng.html",
       "isKeep" : true,
    });
}
//廉政方圆
function jingShiClick(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010201",
            "pageTitle":"廉政方圆",
        }
    });
}
//曝光台
/*
function baoGuangClick(){
	summer.openWin({
        "id" : "newsPropaganda",
        "url" : "html/newsPropaganda/newsPropaganda.html",
       "isKeep" : true,
        "pageParam" : {
            "count" : "01010202",
            "pageTitle":"曝光台",
        }
    });
	
}
*/
//纪检信箱（停用，已提到一级）
/*function jiJianXinXiang(){
	summer.openWin({
        "id" : "checkMailbox",
        "url" : "html/mailbox/checkMailbox.html",
       "isKeep" : true,
    });
}*/

//纪检举报（原名：留言板）（停用，已提到一级）
/*function liuYanBan(){
	summer.openWin({
        "id" : "liuYanBanTianXie",
        "url" : "html/liuYanBan/liuYanBanTianXie.html",
       "isKeep" : true,
    });
   
	summer.openWin({
	  id:'liuYanBan_win',
	  url:'html/liuYanBan/liuYanBan_win.html',
	  type: "actionBar",
	  create: false, //设置保留原生header
	  actionBar: {
	      title: "留言板",
	      titleColor: "#ffffff", //注意必须是6位数的颜色值。（3位数颜色值会不正常）
	      backgroundColor: "#FF0000",
	      leftItem:{
	          image: "img/back.png",
	          method:"", //返回按钮自定义事件，不传方法时默认点击返回后关闭当前页面，也可在打开的window中自定义事件
	          text:"返回1",
	          textColor:"#ffffff"  //返回文字颜色，注意必须是6位数的颜色值。（3位数颜色值会不正常）
	      }, 
	      rightItems:[{
	      	  id:"newApplication",
	          type:"image",
	          image:"img/submit.png",
	          method:"newApplication()", //在打开的window中自定义事件
	      },],
	      
	      pageParam : {
		      "pageTitle":"留言板",
		  },
	      
	  }
	});
}*/
/**
 *	留言板
 */
function newApplication() {
	
	summer.openWin({
		"id" : "liuYanBanTianXie",
		"url" : "html/liuYanBan/liuYanBanTianXie.html",
		"isKeep" : true,
	});
}

function backClick(){
	summer.closeWin({});
}

