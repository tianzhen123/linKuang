var viewModel={};
var data = "";
summerready = function(){
	hp_slide();//滑动事件，放在最前面
	data = summer.pageParam.count;
	
	viewModel = {
		title : ko.observable(data.title),
		def2 : ko.observable(data.def2),
		//content : ko.observable(data.content),
	}
	var fimageA = data.def5;
	if(fimageA != null && fimageA.replace(/\s/g,'')!=""){//def5不为空
		fimageA = fimageA.split("[");
		fimageA = fimageA[1].split("]");
		var fimageArray = fimageA[0].split(",");
		var s = "";
		for(var i = 0; i<fimageArray.length;i++){
			if(fimageArray[i] != null && fimageArray[i].replace(/\s/g,'')!=""){//不为空
				s+= "<img src=\""+fimageArray[i]+"\" style=\"padding: 15px 35px 15px 35px;\"/>";
			}
		}
		$('#imgg').html(s);
	}	
	$('#cont').html(data.def1);
	
    ko.applyBindings(viewModel);
    
    $('#frame').html(data.content);
	imgCenter();
    
}

/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	backClick();
}

function backClick(){
		summer.closeWin({});
}