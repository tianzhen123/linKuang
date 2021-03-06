﻿var infocolumn = "";
var ViewModel = function () {
                };	
var viewModel = new ViewModel();
var pageIndex = 0;//当前页
var title="";
summerready = function(){
				
		hp_slide();//滑动事件，放在最前面
		var pageTitle= summer.pageParam.pageTitle;
		
		viewModel.data = ko.observableArray([]);
        
       	title = "";
		netService(title,0);
	
		ko.applyBindings(viewModel);
		
		var listview = UM.listview("#listview");

		listview.on("itemClick", function(sender, args) {
			//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
			var item = viewModel.data()[args.rowIndex];
			var data = JSON.stringify(item);
			data = $summer.strToJson(data);
			summer.openWin({
				"id" : "bangFuJiLuXiangQing",
				"url" : "html/bangFuJiLu/bangFuJiLuXiangQing.html",
				"isKeep" : true,
				"pageParam" : {
					"count" : data,
					"pageTitle":pageTitle,
				}
			});
		});
		
		listview.on("pullDown", function(sender) {
			//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
			title = document.getElementById("sear").value;
			pageIndex = 0;
			netService(title,0);
			sender.refresh();
		});
		
		
		listview.on("pullUp", function(sender) {
			//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
			title = document.getElementById("sear").value;
			pageIndex = pageIndex+1;
			netService(title,1);
			sender.refresh();
		});		
		
}
/**
 * 右滑执行的方法
 */
function function_rightSlide(){
	summer.closeWin();
}

//搜索的方法
function searchClick(){
	title = document.getElementById("sear").value;
	pageIndex = 0;
	netService(title,0);
}
//网络请求
function netService(title,type){
   	//$summer.alert(title+"\n"+pageIndex);
    var url = ""+getHttpPro()+"difficultymember/list";
	summer.get(url, {
	    "search_name":title,
	    "pageIndex":pageIndex,
		"pageSize":30,
	}, {
	    "Content-Type" : "application/x-www-form-urlencoded", 
	},//url地址 
    function(response){//成功回调
        var data = $summer.strToJson(response.data);
		if(type==0){//下拉刷新
			viewModel.data.removeAll();
		}
		if (data.success == "success") {
			jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				var ts = jsonArray.data.content[k].ts;
				jsonArray.data.content[k].ts = getMyDate(ts);
				var difficulttime = jsonArray.data.content[k].difficulttime;
				jsonArray.data.content[k].difficulttime = getMyDate(difficulttime);
				var sex = jsonArray.data.content[k].sex;
				//jsonArray.data.content[k].sex = sexInit(sex);//yang_f  后台直接传的就是 男  女  不需要进行处理
				var difficultgrade = jsonArray.data.content[k].difficultgrade;
				jsonArray.data.content[k].difficultgrade = MyDifficultgrade(difficultgrade);
				viewModel.data.push(jsonArray.data.content[k]);
			}
			//$summer.alert(jsonArray.data.content);
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert("请求失败");
	});
}

function getMyDate(str){  
        var oDate = new Date(str),  
        oYear = oDate.getFullYear(),  
        oMonth = oDate.getMonth()+1,  
        oDay = oDate.getDate(),  
        oHour = oDate.getHours(),  
        oMin = oDate.getMinutes(),  
        oSen = oDate.getSeconds(),  
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) ;//最后拼接时间  
    return oTime;  
} 
        //补0操作
function getzf(num){  
 if(parseInt(num) < 10){  
  num = '0'+num;  
 }  
 return num;  
}
/**
 *困难等级 
 */
function MyDifficultgrade(n){
	var difficultgrade=n;
	if(n!==null){
		difficultgrade=Number(n);
		switch(difficultgrade){
			case 1:difficultgrade="一般";break;
			case 2:difficultgrade="特困";break;
			default:difficultgrade="";
		}
	}
	return difficultgrade;
}
/**
 * 男女 
 */
function sexInit(sex){
	if(sex!==null){
		sex=Number(sex);
		switch(sex){
			case 0:sex="男";break;
			case 1:sex="女";break;
			default:sex="";
		}
	}
	return sex;
}
/**
 *关闭窗口
 */
function backClick() {
	summer.closeWin({});
}