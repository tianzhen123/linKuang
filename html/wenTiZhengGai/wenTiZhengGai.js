var ViewModel = function() {
};
var viewModel = new ViewModel();
//var jsonArray = [];
var pageIndex = 0;//起始页
var mobile="";
var searchType = "";
var searchContent = "";
summerready = function() {
	var userInfo = localStorage.getItem("userInfo");
	mobile = userInfo.mobile;
	hp_slide();//滑动事件，放在最前面
	
	event_tabbar();
	 
	viewModel.data = ko.observableArray([]);
	ko.applyBindings(viewModel);
	
	searchType = ".news";
	myRefresh(searchType,searchContent,0);
	
	var listview1 = UM.listview("#listview1");
	var listview2 = UM.listview("#listview2");
	
	listview1.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "wenTiZhengGaiChaKan",
			"url" : "html/wenTiZhengGai/wenTiZhengGaiChaKan.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data
			}
		});
	});
	
	listview2.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		var data = JSON.stringify(item);
		data = $summer.strToJson(data);
		summer.openWin({
			"id" : "wenTiZhengGaiChaKan",
			"url" : "html/wenTiZhengGai/wenTiZhengGaiChaKan.html",
			"isKeep" : true,
			"pageParam" : {
				"count" : data
			}
		});
	});
	
	$("#newApplication").on("click", function(sender, args) {
		summer.openWin({
			"id" : "wenTiZhengGaiTianXie",
			"url" : "html/wenTiZhengGai/wenTiZhengGaiTianXie.html",
			"isKeep" : true,

		});
	});
	
	listview1.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		pageIndex = 0;
		searchContent = document.getElementById("sear").value;
		myRefresh(searchType,searchContent,0);
		sender.refresh();
	});
        		
	listview1.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		pageIndex = pageIndex+1;
		searchContent = document.getElementById("sear").value;
		myRefresh(searchType,searchContent,1);
		sender.refresh();
	});
	listview1.on("itemDelete", function (sender, args) {
        //这是可以编写行删除逻辑，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
       	 UM.confirm({
		    text: '你确定要删除该条内容吗？',
		    btnText: ["取消", "确定"],
		    overlay: true,
		    ok: function () {
		       ajax_delete(args);
		    },
		    cancle: function () {
		       
		    }
		});
    });
    listview1.on("itemSwipeLeft", function (sender, args) {
        //这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        sender.showItemMenu(args.$target);
    });
    listview2.on("pullDown", function(sender) {
		//这是可以编写列表下拉刷新逻辑，参数sender即为当前列表实例对象
		pageIndex = 0;
		searchContent = document.getElementById("sear").value;
		myRefresh(searchType,searchContent,0);
		sender.refresh();
	});
        		
	listview2.on("pullUp", function(sender) {
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		pageIndex = pageIndex+1;
		searchContent = document.getElementById("sear").value;
		myRefresh(searchType,searchContent,1);
		sender.refresh();
	});	
	listview2.on("itemDelete", function (sender, args) {
        //这是可以编写行删除逻辑，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
       	 args.$target.slideUp(500,function(){
         var item = viewModel.data()[args.rowIndex];
         viewModel.data.remove(item);
         });
    });
    listview2.on("itemSwipeLeft", function (sender, args) {
        //这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        sender.showItemMenu(args.$target);
    });
}
function event_tabbar(){
	 $('ul.um-tabbar-switch  Li').click(function(){
		$(this).addClass('active').siblings('.active').removeClass('active');
		var tar=$(this).attr('data-tar');
		$(tar).addClass('active').siblings('.active').removeClass('active');
	    document.getElementById("sear").value = "";
		searchType = tar;
		pageIndex=0;
		searchContent = "";
	    myRefresh(searchType,searchContent,0);
	    listview1.config.pullUpEnable=ture;
	    listview2.config.pullUpEnable=ture;
	 }); 
}
function function_rightSlide(){
	summer.closeWin();
}
function searchClick(){
	searchContent = document.getElementById("sear").value;
	pageIndex = 0;
	myRefresh(searchType,searchContent,0);
} 
function myRefresh(searchType,searchContent,load) {
	
	var url = ""+getHttpPro()+"problemRectification/list";
	var content = "";
	switch (searchType) {
			case ".news":
					content = searchContent;
			break;
			case ".product":
					content = mobile;
			break;
		
	}
	summer.get(url, {
		"search_searchParam":content,	
		"pageIndex":pageIndex,
		"pageSize":20,
		"sortDirection":"desc",
		"sortField":"p_time"
	}, {
		"Content-Type" : "application/x-www-form-urlencoded",
	}, //url地址
	function(response) {//成功回调
		var data = $summer.strToJson(response.data);
		if(load==0){
			viewModel.data.removeAll();//清除
		}
		if (data.success == "success") {
			var jsonArray = data.detailMsg;
			var count = jsonArray.data.content.length;
			for (var k = 0; k < count; k++) {
				var p_time = jsonArray.data.content[k].p_time;//编辑时间
				jsonArray.data.content[k].p_time = formatDate(Number(p_time));
				var ts = jsonArray.data.content[k].ts;//编辑时间
				jsonArray.data.content[k].ts = formatDate(ts);
					
				viewModel.data.push(jsonArray.data.content[k]);
				
			}
		} else {
			//$summer.alert("网络错误");
		}
	}, function(response) {//失败回调
		//$summer.alert("请求失败");
		
	});

}
function formatDate(str) {
	var date = new Date(str);
	
    var seperator1 = "/";
    var seperator2 = ":";
   	var year =  date.getFullYear(); 
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    
    var currentdate = year + seperator1 + addZero(month) + seperator1 + addZero(strDate)
             //  + " " + addZero(strHours) + seperator2 + addZero(strMinutes) + seperator2 + addZero(strSeconds);
    
    
    return currentdate;
}
function addZero(time){
	if(parseInt(time) < 10){  
        time = '0'+time;  
     }  
     return time;
}
function backClick() {
	summer.closeWin({});
}
function ajax_delete(args){
	var data_delete = data_delete(args.rowIndex);
    $.ajax({
            type: "post",
            url: ""+getHttpPro()+"problemRectification/delBatch",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data_delete),
            success: function (res) {
                if (res) {
                    if (res.success == 'success') {
                   		 args.$target.slideUp(500,function(){
				         var item = viewModel.data()[args.rowIndex];
				         viewModel.data.remove(item);
				        });
		            } else {
	            }
	        } else {
	            
	        }
	    } 
	});
}
function data_delete(number){
	var data_delete = [];
	var data = {};
	data.pk_problem = viewModel.data()[number].pk_problem;
	data.pk_org = viewModel.data()[number].pk_org;
	data.pk_org_name = viewModel.data()[number].pk_org_name;
	data.p_place = viewModel.data()[number].p_place;
	data.p_time = viewModel.data()[number].p_time;
	data.p_code = viewModel.data()[number].p_code;
	data.pk_supervisor = viewModel.data()[number].pk_supervisor;
	data.pk_supervisor_name = viewModel.data()[number].pk_supervisor_name;
	data.headmen = viewModel.data()[number].headmen;
	data.creator = viewModel.data()[number].creator;
	data.createtime = viewModel.data()[number].createtime;
	data.def0 = viewModel.data()[number].def0;
	data.def1 = viewModel.data()[number].def1;
	data.def2 = viewModel.data()[number].def2;
	data.def3 = viewModel.data()[number].def3;
	data.def4 = viewModel.data()[number].def4;
	data.id_problemdetail = viewModel.data()[number].id_problemdetail;
	data_delete.push(data);
	return data_delete;
}
