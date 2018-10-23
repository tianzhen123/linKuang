/**
 * 上下拉刷新功能
 * 用友能源   韩鹏
 * 2018.01.06
 */

/*
 * 使用说明：
 * 一、html文件要求： （1需满足才可正常使用）
	1.监控手指触摸区域
	 使用说明：将要监控的区域的div或ul或其他（都可以），加上name="hp_slide"即可
	 建议：第一种：加载ul上，li里面是内容
	 	 第二种：加载内容外面的div上
	 	（尽量在包裹整个内容的di或ulv上） 
		 <ul  name="hp_scroll">
			<li >
				
			</li>
		 </ul>
	 
 * 二、js文件要求：（1、必须满足，2.(1)或(2)满足一个或都满足才可正常使用）
 *  1.引用方法
 *  使用说明：只需要引用hp_scroll()即可（其他方法不需要）
 * 	建议：将引用放在最前面调用
 * 	hp_slide();//滑动事件，放在最前面
 * 
 * 	2.左滑右滑时，执行自己定义的方法（自己将下面代码中的方法注释去掉）
 * 	使用说明：下面(1)(2)方法必须要有
 *
 *	(1)
 	//左滑执行的方法
	function function_leftSlide(){
		//写自己下拉要执行的代码（若没有自己要执行的代码，就不用写内容，但必须要有function_pullDown()方法）
	}
	
 *	(2)
 	//右滑执行的方法
	function function_rightSlide(){
		//写自己上拉要执行的代码（若没有自己要执行的代码，就不用写内容，但必须要有function_pullUp()方法）
	}
 *
 *  
 */

var startx;
var starty;
var overx;
var overy;
/**
 * 暂停使用
 */
function hp_slide(){
	/*var hp_slide = document.getElementsByName('hp_slide');
   	for(var i=0;i<hp_slide.length;i++){         
        obj = hp_slide[i];      
        hp_slide_evenlistener(obj);      
    }
    */
}

function hp_slide_evenlistener(obj){
	var clock=false;
	obj.addEventListener('touchstart', function(event) {
	   	startx = event.touches[0].clientX;
	    starty = event.touches[0].clientY;
	    clock = false;
	} , false); 
	obj.addEventListener('touchmove', function(event) {
	 	
	 	overx = event.touches[0].clientX;
	    overy = event.touches[0].clientY;
		   if(clock==false){
			    if(startx-overx>150){        
			    	clock = true;
			    
			    	//function_leftSlide();
		        }else if(overx-startx>150){ 
		        	clock = true;
		        	
		        	function_rightSlide();
		        }
	       }
	} , false);
	obj.addEventListener('touchend', function(event) {
	    	clock = false;
    } , false);
} 



