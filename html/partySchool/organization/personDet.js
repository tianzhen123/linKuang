function backClick(){
	summer.closeWin({});
}

summerready = function(){
	data = summer.pageParam.count;
	id = data.parent_id;
	//组织名称
	name = data.name;
	$("#name").text(name);
	//组织联系人
	contacts = data.contacts;
	$("#contacts").text(contacts);
	//组织联系人电话
	contactsphone = data.contactsphone;
	$("#contactsphone").text(contactsphone);
	//地址
	address = data.address;
	$("#address").text(address);
}
