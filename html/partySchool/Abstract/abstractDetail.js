var viewModel={};
var data = "";
var flag = false;// false非编辑状态

summerready = function(){
	data = summer.pageParam.count;
	var create_time = data.ts;
	var content = data.content;
	/*create_time = Number(create_time);
    //重写时间格式
    Date.prototype.toLocaleString = function() {
      return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
    };
	var newTime = new Date(create_time) ;
	create_time = newTime.toLocaleString();*/
	
	viewModel = {
		title : ko.observable(data.title),
		ts : ko.observable(create_time),
		//content:ko.observable(content),
	}
	
	
    ko.applyBindings(viewModel);
    var frame = document.querySelector("#frame");
    frame.innerHTML = content;
    imgCenter();
    /*if(data.content.indexOf('<')!=-1){
    	$("#img").attr("src", data.fimage);
    	$('#frame').html($('#frame').html(data.content).text());
    	imgCenter();
    }else{
    	$("#img").attr("src", data.fimage);
    	$('#frame').html(data.content);
    	imgCenter();
    }*/
	
    
}
//返回
function backClick(){
		
		summer.closeWin({});
}

