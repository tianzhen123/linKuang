var id;
var title;
var def2;
var ts;
var pageIndex;
var array;
var ViewModel = function () {
                };	
var viewModel = new ViewModel();
summerready = function(){
	
	var data = summer.pageParam.count;
	id = data.id;
	title = data.title;
	def2 = data.def2;
	ts = data.ts;
	$("#title").text(title);
	$("#time").text(ts);
	var frame = document.querySelector("#frame");
    frame.innerHTML = def2;
    imgCenter();
  
	viewModel ={
		data:ko.observableArray([]),
		
		openWin:function(data){
			/*if(data.ext == "MP4" || data.ext == "mp4"){
				$("#myvideo").attr("src",data.fullpath);
				$("#videoSourceid").attr("src",data.fullpath);
				//document.getElementById("myvideo").src=data.fullpath;    //text+".mp4";
                //document.getElementById("videoSourceid").src=data.fullpath;
               
                document.getElementById("myvideo").play();
                $("#myvideo").show();
			}else{
				$("#myvideo").hide();
				var url = data.fullpath;
				summer.openWebView({
			         "url" :  url,
			    });
			}*/
			var url = data.fullpath;
			summer.openWebView({
		         "url" :  url,
		    });
		}
	};
	ko.applyBindings(viewModel);
    netService();
}


//网络请求
function netService(pageIndex){
	//$summer.alert(title);
	var url = ""+getHttpPro()+"zxstudy/mdoclist?id="+id;
	summer.get(url, {
			
	}, {
	    "Content-Type" : "application/x-www-form-urlencoded", 
	},//url地址 
    function(response){//成功回调
        var data = $summer.strToJson(response.data);
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			var content = jsonArray.data.content;
			array = jsonArray.data.content;
			viewModel.data(array);
	        //viewModel.data(array);
		} 
	}, function(response) {//失败回调
		
	});
}
function backClick(){
  	summer.closeWin({});
}