var viewModel;
var param;
summerready=function(){
	param = summer.pageParam.param;
	viewModel = {
		p_name:param.p_name,
		phone:param.phone,
		idcode:param.idcode,
		home_address:param.home_address,
		data:ko.observableArray([]),
	}
	ko.applyBindings(viewModel);
	loadList();
	
}
function loadList(){
	var url = ""+getHttpPro()+"petition/mlist?id="+param.pk_p_personnel+"";
	summer.get(url, {}, 
				{
					"Content-Type" : "application/x-www-form-urlencoded", 
				},//url地址 
                function(response){//成功回调
                    var data = $summer.strToJson(response.data);
					if (data.success == "success") {
						
						jsonArray = data.detailMsg;
						
						var array = jsonArray.data.content;
						viewModel.data(array);
					} else {
						summer.toast({
                             "msg" : "请求错误" 
                        })
					}
				}, function(response) {//失败回调
					summer.toast({
                             "msg" : "请求错误" 
                        })
				});
}

function backClick(){
	summer.closeWin();
}