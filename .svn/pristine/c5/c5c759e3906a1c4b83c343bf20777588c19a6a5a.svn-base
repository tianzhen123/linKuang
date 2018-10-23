/**
 * 上下拉刷新功能
 * 用友能源   韩鹏
 * 2017.12.27
 */

/*
 * 使用说明：
 * 一、html文件要求： （1、2都需满足才可正常使用）
 *	1.下拉
 *	使用说明： 将此div整体内容放到要现实的位置（放上面），
 *	注意：id="pullDown"（不可修改）
 *		   img 图片路径可以自己定义
 *	 	   span文字可以自己定义
 *	 div说明：下拉时，要显示的此div
		<div id="pullDown" style="display: none">
			<img src="../../img/loading.gif" />
		 	<span>加载中...</span>
		</div>
		
 * 	2.上拉
 * 	使用说明： 将此div整体内容放到要现实的位置（放下面），
 * 	注意：id="pullUp"（不可修改）
 * 	   img 图片路径可以自己定义
 * 	   span文字可以自己定义
 * 	div说明：上拉时，要显示的此div	
	  	<div id="pullUp" style="display: none">
			<img src="../../img/loading.gif" />
			<span>加载中...</span>
	  	</div>
	  	
	 3.监控手指触摸区域
	 使用说明：将要监控的区域的div或ul或其他（都可以），加上name="hp_scroll"即可
	 建议：第一种：加载ul上，li里面是内容
	 	 第二种：加载内容外面的div上
	 	（尽量在包裹整个内容的di或ulv上） 
		 <ul  name="hp_scroll">
			<li >
				
			</li>
		 </ul>
	 
 * 二、js文件要求：（1、2都需满足才可正常使用）
 *  1.引用方法
 *  使用说明：只需要引用hp_scroll()即可（其他方法不需要）
 * 	hp_scroll();//引用上下拉方法
 * 	2.上下拉时，执行自己定义的方法
 * 	使用说明：下面(1)(2)方法必须要有
 *
 *	(1)下拉执行的方法
	function function_pullDown(){
		写自己下拉要执行的代码（若没有自己要执行的代码，就不用写内容，但必须要有function_pullDown()方法）
	}
	
 *	(2)上拉执行的方法
	function function_pullUp(){
		写自己上拉要执行的代码（若没有自己要执行的代码，就不用写内容，但必须要有function_pullUp()方法）
	}
 *
 *  
 */

var flag_scroll=true;
var flag_over=true;

var hp_scroll;
var obj;
//滑动的坐标
var startx;
var starty;
var overx;
var overy;

var textDown_show = true;
var textUp_show = true;
var textDo_show = true;

var textDown = "放手啊，不想刷新别拉我(｡•ˇ‸ˇ•｡)";
var textUp = "够了啊，我赶着刷新呢(｡•ˇ‸ˇ•｡)";
var textDo = "<img src=\"../../img/loading.gif\" /><span>加载中...</span>";

var flag_pull_start = 2;
var flag_pull_end = 2;
var flag_pull_start_up_hidden = false;
var flag_pull_start_down_hidden = false;

var str_div = "<div class = hp_text style = \"margin:0 auto;text-align:center;height:10%;\"></div>";
var str_div_width = "35%";
var str_div_font_size = "16px";
var str_div_line_height = "1.5";
var str_div_color = "#000";

var clock_up = false;
var clock_down = false;
var clock_up_end = false;
var clock_down_end = false;

/**
 * 初始化显示内容
 */
function show_init(){
	textDown_show = true;
	textUp_show = true;
	textDo_show = true;
	textDown = "继续拉动";
    textUp = "释放刷新";
    textDo = "<img src=\"../../img/loading.gif\" /><span>加载中...</span>";//松手时显示
    str_div_width = "35%";
    str_div_font_size = "16px";
    str_div_line_height = "1.5";
    str_div_color = "#000";
}

function hp_scroll(){
	show_init();//初始化显示内容
	$("#pullUp").html(str_div);
	$("#pullUp").find(".hp_text").css({
					  "width":str_div_width,
					  "font-size":str_div_font_size,
					  "line-height":str_div_line_height,
					  "color":str_div_color});
	$("#pullDown").html(str_div);
	$("#pullDown").find(".hp_text").css({
					  "width":str_div_width,
					  "font-size":str_div_font_size,
					  "line-height":str_div_line_height,
					  "color":str_div_color});
	window_scroll();
	hp_scroll = document.getElementsByName('hp_scroll');
   	for(var i=0;i<hp_scroll.length;i++){         
        obj = hp_scroll[i];      
        evenlistener(obj);     
    }
}
function window_scroll(){
	var content = document.getElementsByName('hp_scroll_content');
	$(content).scroll(function(){
		var scrollTop = $(this).scrollTop(); 
		var scrollHeight = $(hp_scroll).height();  
		var windowHeight = $(this).height();     
		if(scrollTop + windowHeight >= scrollHeight){
			flag_scroll=true;
         }else if(scrollTop<=0){
			flag_scroll=true;
         }else{//
         	flag_scroll=false;
         }
	});
}
function evenlistener(obj){
	obj.addEventListener('touchstart', function(event) {
	   	startx = event.touches[0].clientX;
	    starty = event.touches[0].clientY;
	} , false); 
	obj.addEventListener('touchmove', function(event) {
	 	overx = event.touches[0].clientX;
	    overy = event.touches[0].clientY;
	    if(flag_scroll){
	    	if(starty-overy>50){
			   	flag_pull_start = 0;
			    //show_textDown();
		    	if(starty-overy>100){
			    	//flag_pull_start = 2;//复位
			    	flag_pull_end=0;
			    	//show_textUp();
			    	show_textDo();
			    }
		    }else if(overy-starty>50){
			    flag_pull_start = 1;
			   	//show_textDown();
			    if(overy-starty>100){
			    	//flag_pull_start = 2;//复位
			    	flag_pull_end=1;
			    	//show_textUp();
			    	show_textDo();
			    }
		    }
	    }
	} , false);
	obj.addEventListener('touchend', function(event) {
		   if(flag_pull_start == 0){
			    if(flag_pull_end !=0||flag_pull_end == 3){
			   		 console.log("********************上拉*********************");
			   		 flag_pull_start_up_hidden = true;
			   		// hidden_pull();
			   		 flag_pull_start = 2;//复位
			    }
			    if(flag_pull_end==0){
			    	console.log("********************上拉*********************");
			    	//show_textDo();
			    	flag_pull_end=3;
					if(clock_up==false){
						function_pullUp();
					}
					setTimeout('hidden_pull()',5000);
			    }
			}else if(flag_pull_start == 1){
			   	if(flag_pull_end !=1||flag_pull_end ==4){
			   		console.log("********************下拉*********************");
			   		flag_pull_start_down_hidden = true;
			   		//hidden_pull();
			   		flag_pull_start = 2;//复位
			    }
			    if(flag_pull_end==1){
			    	console.log("********************下拉*********************");
			    	//show_textDo();
			    	flag_pull_end=4;
					if(clock_down==false){
						function_pullDown(); 
					}
					setTimeout('hidden_pull()',5000);  
			    }else{
			    	
			    }
			 }
    } , false);
} 
function show_textDown(){
	if(textDown_show == true){
		if(flag_pull_start == 0){
			if(clock_up==false){
				$("#pullUp").css('display','block'); 
				$("#pullUp").find(".hp_text").html(textDown);
				clock_up = true;
			}
		}else if(flag_pull_start == 1){
			if(clock_down==false){
				$("#pullDown").css('display','block'); 
				$("#pullDown").find(".hp_text").html(textDown);
				clock_down = true;
			}
		}
	}
}
function show_textUp(){
	if(textUp_show == true){
		if(flag_pull_end == 0){
			if(clock_up==false){
				$("#pullUp").css('display','block'); 
				$("#pullUp").find(".hp_text").html(textUp);
				clock_up = true;
			}
		}else if(flag_pull_end == 1){
			if(clock_down==false){
				$("#pullDown").css('display','block'); 
				$("#pullDown").find(".hp_text").html(textUp);
				clock_down = true;
			}
		}
	}
}
function show_textDo(){
	if(textDo_show == true){
		if(flag_pull_end == 0){
			if(clock_up_end==false){
				$("#pullUp").css('display','block'); 
				$("#pullUp").find(".hp_text").html(textDo);
				clock_up_end = true;
			}
		}else if(flag_pull_end == 1){
			if(clock_down_end==false){
				$("#pullDown").css('display','block'); 
				$("#pullDown").find(".hp_text").html(textDo);
				clock_down_end = true;
			}
		}
	}
}

function hidden_pull(){
 	if(flag_pull_start_up_hidden == true||flag_pull_end==3){
 		$("#pullUp").css('display','none'); 
 		flag_pull_end=2;//复位
 		flag_pull_start_up_hidden = false;
 		clock_up = false;
 		clock_up_end = false;
 	}else if(flag_pull_start_down_hidden == true||flag_pull_end==4){
 		$("#pullDown").css('display','none'); 
 		flag_pull_end=2;//复位
 		flag_pull_start_up_hidden = false;
 		clock_down = false;
 		clock_down_end = false;
 	}
 	
 
}

