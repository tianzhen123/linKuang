var sourceType;
summerready = function(){
	//sourceType = summer.pageParam.count;
	var shopData = {
		data: [{"result":"通过","reviewstatus":"1",
		"img":"../../img/check_n.png"},
		{"result":"不通过","reviewstatus":"2",
		"img":"../../img/check_n.png"}]
	};
	 
	var shopModal = function() {
		var self = this;
		self.listData = ko.observableArray(shopData.data);
	
		self.lineClick = function(data, e) {
			var index = $(e.target).closest("li").index();
			var tmp = clone(this);
			tmp.img = "../../img/check_p.png";
			self.listData.replace(this, tmp);
			var data = shopData.data[index];
			var jsfun = 'setReviewResult(' + $summer.jsonToStr(data) + ');';
			summer.execScript({
				winId : 'shuZhiShuZePingFen',
				script : jsfun
			});
			backClick();
		}
	
	}
	var viewModel = new shopModal();
    viewModel.listData = ko.observableArray(shopData.data);
    ko.applyBindings(viewModel);
	
		
}

function backClick(){
	summer.closeWin({});
}
//克隆对象
function clone(objs) {
	var obj = {};
	for (var p in objs)
		obj[p] = objs[p];
	return obj;
};			
