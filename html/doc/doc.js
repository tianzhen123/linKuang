summerready=function(){
    var HTTP_CONTEXT=getHttpPro(),//基地址
    
    loadFileUrl=HTTP_CONTEXT+"/doc/list", //加载文件列表地址
    loadFolderUrl=HTTP_CONTEXT+"/docfolder/listbypid", //加载目录列表地址
    downloadUrl= HTTP_CONTEXT+"/doc/download/{id}"//下载地址
    downloadLocalPath="lkdj/doc/files", //本地存储文件路径
    dataTemplate={ //数据模板
        filename : "",
        color : "gray",
        icon : "fa fa-2x fa-check-square-o",
        creator : "",
        time : "",
        size : "",
        down : false,
        percent: "",
    },
    loaddingJson = [generateData({ //加载中样式
        filename : "正在加载中...",
        color : "gray",
        icon : "fa fa-2x fa-spinner fa-spin",
        type : 1, //用于标识初始化加载中的属性
    })],
    CACHE_TIMEOUT=0, //文档库列表缓存过期时间
    TEXT={
        PULL_LOAD:"上拉加载更多内容",
        LOADING:'<i class="fa fa-spinner fa-spin"></i> 正在加载中...',
        NO_MORE_CONTENT:"没有更多内容了",
        ONLOADING:"正在加载中,请稍候",
        LOADING:"加载中",
        SORT_MENU_TEXT:['默认排序','按文件名正序排列', '按文件名倒序排列' ,'按时间正序排列','按时间倒序排列'],
        FILE_MENU_TEXT:["打开文件",'<span style="color:red;">删除已下载文件</span>'],
        DELETE_SUCCESS:"删除成功",
        PARENT_FOLDER_TEXT:".. 上一级目录", //上级目录文本,颜色,图标
        PARENT_FOLDER_COLOR:"#FFD753",
        PARENT_FOLDER_ICON:"fa-folder-open fa fa-2x",
        LOAD_ERROR:"加载失败",
    },
    CACHE_STORAGE_KEY="com.lykyjt.doc.cache",//储存缓存数据用的key
    MY_DOC_STORAGE_KEY="com.lykyjt.doc.mydoc",//储存我的文档数据用的key
    FOLDER_CACHE={"0":{id:void 0}}, //记录目录上级关系的对象
    myDocStorage={}, //存储我的文档的对象  {id:doc}
    MY_DOC_TEMPLATE=[//我的文档模板对象(在本地保存文件的以下字段信息)
        "id","ext","length","name","createtime","creator"
    ], 
   current={//当前数据
        pageSize:10,
        folderid:"0",
        folderIndex:-1,
        folderLast:false, //
        fileIndex:-1,
        fileLast:false,
        search:void 0,
        sort:{
            sortDirection:"ASC",
            sortField:"name"
        },
        sortTypeIndex:0, //选择的排序方式index
    },
    viewModel = {
        myDoc: ko.observable(false),
        data : ko.observableArray(loaddingJson),
        mydata : ko.observableArray([]),
        moreText: ko.observable(TEXT.PULL_LOAD),
        event:{
          /*  onSearchInput:function(vm,e){
                if(e.keyCode==13){
                    current.search=e.target.value
                    //console.log(e.target.value);
                    initData("0");//显示加载中
                    loadData();
                    
                }
                
                return true;
            },
            onSearchInputFocus:function(){
                $("#searchBackButton").fadeIn(500);
            },
            onSearchInputBlur:function(){
                if(!$("#searchInput").val()){
                    $("#searchBackButton").fadeOut(500);
                }
            },*/
            listClick:function(data){//点击列表事件
                if(data.folderid){
                    var result=loadData(data.folderid,FOLDER_CACHE[data.folderid].parentid);
                    if(result=="loading"){
                        alert(TEXT.ONLOADING)
                    }else if(result.then){
                        showLoadingBar();
                        result.then(function(){
                            hideLoadingBar();
                        }).catch(function(err){
                            hideLoadingBar();
                           /* summer.toast({
                                 "msg" : TEXT.LOAD_ERROR 
                            })*/
                           UM.toast({
							    "text": TEXT.LOAD_ERROR 
							});
                           
                            viewModel.moreText(TEXT.LOAD_ERROR)
                            throw err;
                        })
                    }
                }else if(data.type!=1){
                    if(data.down()){
                        //已下载
                        onFileClick(data);
                    }else{
                        //未下载
                        downloadFile(data);
                    }
                }
            },
            mylistClick:function(data){
                onFileClick(data);
            },
            onScroll:function(vm,e){
                var dom=e.target;
                if(dom.scrollTop+dom.offsetHeight>=dom.scrollHeight){
                    var result=loadData();
                    if(result=="last"){
                        viewModel.moreText(TEXT.NO_MORE_CONTENT)
                    }else{
                        viewModel.moreText(TEXT.LOADING)
                    }
                    if(result.then){
                        showLoadingBar();
                        result.then(function(){
                            hideLoadingBar();
                        }).catch(function(){
                            hideLoadingBar();
                            /*summer.toast({
                                 "msg" : TEXT.LOAD_ERROR 
                            })*/
                            UM.toast({
							    "text": TEXT.LOAD_ERROR 
							});
                            viewModel.moreText(TEXT.LOAD_ERROR)
                            throw err;
                        })
                    }
                }
            },
           /* onSearchCancel:function(){
                $("#searchInput").val("")
                $("#searchBackButton").fadeOut(500);
                current.search=void 0;
                initData("0");
                loadData();
            },*/
           /* onSortMenuClick:function(){
                var itemData=TEXT.SORT_MENU_TEXT;
                itemData[current.sortTypeIndex]='<span style="color:red;">'+itemData[current.sortTypeIndex]+"</span>"
                UM.actionsheet({
                    items : itemData,
                    callbacks : [
                        function(){
                            selectSortType(0,"asc","name")
                        },
                        function(){
                            selectSortType(1,"asc","name")
                        },
                        function(){
                            selectSortType(2,"desc","name")
                        },
                        function(){
                            selectSortType(3,"asc","createtime")
                        },
                        function(){
                            selectSortType(4,"desc","createtime")
                        },
                    ]
                });

            },*/
            //选择底部按钮事件
          selectRoot:function(root){
                if(root=="doc"){
                    viewModel.myDoc(false)
                }else if(root=="my"){
                    viewModel.myDoc(true)
                }
            },
           
        }
    };
    ko.applyBindings(viewModel);
    console.log(viewModel,FOLDER_CACHE); //DEBUG
    function onFileClick(data){
        UM.actionsheet({
            items : TEXT.FILE_MENU_TEXT,
            callbacks : [
                function(){
                    openFile(data);
                },
                function(){
                    removeFile(data);
                },
            ]
        });
    }
    function removeFile(data){
        var file=data.data;
        summer.removeFile({
            file : file.name,
            path: downloadLocalPath+"/"+file.id,
            callback : function(res){ 
               if(res.delStatus=="1"){//删除成功
                   /* summer.toast({
                        "msg":TEXT.DELETE_SUCCESS
                    });*/
                     UM.toast({
					    "text": TEXT.DELETE_SUCCESS
					});
                    
                }else{
                    /*summer.toast({
                        "msg":res.msg
                    });*/
                     UM.toast({
					    "text": res.msg
					});
                }
                deleteMyDoc(file)
            },
        })
    }
    function openFile(data){
        var file=data.data;
        console.log("打开文件",file)
        summer.openFile({
            "filename" : file.name,
            "filetype" : file.ext,
            "filepath" : downloadLocalPath+"/"+file.id
        })
    }
    function downloadFile(data){
        if(data.percent()!=""){
            return;
        }
        var file=data.data;
        data.percent("下载中 0B/"+convertFileLength(file.length)+" ("+0+"%)")
        console.log("下载文件",file)
        summer.download({
            "url" : downloadUrl.replace("{id}",file.id),
            "locate" : downloadLocalPath+"/"+file.id,
            "filename" : file.name,
            "override" : "true",
            "callback" : function(res){
                if(res.isfinish){
                    addMyDoc(file);
                    data.percent("");
                    data.down(true);
                  /* summer.toast({
                        "msg":file.name+" 下载成功!"
                    });*/
                    UM.toast({
					    "text": file.name+" 下载成功!"
					});
                }else{
                    var nowsize=res.percent/100*res.fileSize;
                    data.percent("下载中 "
                        +convertFileLength(nowsize)+"/"
                        +convertFileLength(res.fileSize)+" ("
                        +res.percent+"%)")
                }
            }
        })
    }
    //尝试初始化本地存储的"我的文档"列表
    var myDocDataInited=false;
    function initMyDocData(){
        if(!myDocDataInited){
            myDocDataInited=true;
            myDocStorage=summer.getStorage(MY_DOC_STORAGE_KEY);
            if(myDocStorage){
                for(var i in myDocStorage){
                    viewModel.mydata.push(convertListFileData(myDocStorage[i]));
                }
               
            }else{
                myDocStorage={};
            }
        }
    }
    //增加一则我的文档
    function addMyDoc(file){
        //加入我的文档存储
        var storageData={};
        for(var i in MY_DOC_TEMPLATE){
            if(MY_DOC_TEMPLATE.hasOwnProperty(i)){
                var key=MY_DOC_TEMPLATE[i]
                storageData[key]=file[key];
            }
        }
        myDocStorage[file.id]=storageData;
        console.log("addMyDoc",storageData,myDocStorage)
        summer.setStorage(MY_DOC_STORAGE_KEY,myDocStorage);
        //加入列表中
        viewModel.mydata.push(convertListFileData(file));
    }
    function deleteMyDoc(file){
        //删除存储
        delete(myDocStorage[file.id])
        summer.setStorage(MY_DOC_STORAGE_KEY,myDocStorage);
        //删除我的文档列表
        var index=viewModel.mydata().findIndex(function(e){
            return e.data.id==file.id
        })
        if(index>=0){
            viewModel.mydata.splice(index,1);
        }else{
            console.error("deleteMyDoc_viewModel.mydata().findIndex err index: "+index)
        }
        //更新全部文档已下载的图标
        var index=viewModel.data().findIndex(function(e){
            if(e.data){
                return e.data.id==file.id
            }
        })
        if(index>=0){
            viewModel.data()[index].down(false);
        }else{
            console.error("deleteMyDoc_viewModel.data().findIndex err index: "+index)
        }
    }
    //选择排序类型
    function selectSortType(index,direction,field){
        current.sortTypeIndex=index;
        current.sort.sortDirection=direction;
        current.sort.sortField=field;
        initData(current.folderid);
        loadData(current.folderid,FOLDER_CACHE[current.folderid].parentid);
    }
    function showLoadingBar(){
        UM.showLoadingBar({
            text: TEXT.LOADING,
            icons: 'ti-loading',
        })
    }
    function hideLoadingBar(){
        UM.hideLoadingBar()
    }
    var isLoading=false;
    function setLoadStatus(flag){
        isLoading=flag;
    }
    //自动加载列表  目录id,父目录id
    function loadData(folderid,parentid){
        if(isLoading){
            return "loading"
        }
        //不传参数或相同folderid
        if(folderid==void 0||folderid==current.folderid){
            viewModel.moreText(TEXT.LOADING)
            //加载更多
            folderid=current.folderid;
            if(current.folderLast||current.search){ //目录已经加载到最后一页 或者是搜索
               
               
                if(!current.search&&current.fileLast){ //不是搜索，并且文件最后一页
                    return "last"
                }
                setLoadStatus(true);
                return getFileData(current.folderid,current.fileIndex+1,current.pageSize,current.sort,current.search)
                    .then(function(res){
                        var data=res.detailMsg.data;
                        if(viewModel.data()[0].type==1){ //第一条如果是"正在加载中",则删除
                            viewModel.data([]);
                        }
                        current.fileIndex=data.number; //记录当前文件页码
                        current.fileLast=data.last; //记录文件是否已读到最后一页
                        for(var i in data.content){ //加载进列表
                            if(data.content.hasOwnProperty(i)){
                                var d=data.content[i];
                                viewModel.data.push(convertListFileData(d));
                            }
                        }
                        if(data.last){ //已经是最后一页,设置底部文本
                            viewModel.moreText(TEXT.NO_MORE_CONTENT)
                        }
                    }).then(function(){ //完成后设置加载状态
                        setLoadStatus(false);
                    }).catch(function(err){
                        //加载文件列表失败
                        if(viewModel.data()[0].type==1){ //第一条如果是"正在加载中",则删除
                            viewModel.data([]);
                        }
                        setLoadStatus(false);
                        throw err;
                    })
            }else{//加载下一页目录
                setLoadStatus(true);
                return getFolderData(current.folderid,current.folderIndex+1,current.pageSize,current.sort)
                    .then(function(res){
                        var data=res.detailMsg.data;
                        if(viewModel.data()[0].type==1){//第一条如果是"正在加载中"
                            if(parentid&&folderid!="0"){ //如果传入了父目录id,并且当前目录不是根目录
                                viewModel.data([generateData({//则设置数据第一条为 "上一级目录"
                                    folderid:parentid,
                                    filename : TEXT.PARENT_FOLDER_TEXT,
                                    color : TEXT.PARENT_FOLDER_COLOR,
                                    icon : TEXT.PARENT_FOLDER_ICON,
                                })]);
                            }else if(data.content.length>0){ 
                                //如果没有传入父目录id,或者当前目录是根目录
                                //并且读取到了数据, 则清空"正在加载中"
                                viewModel.data([]);
                            }
                        }
                        current.folderIndex=data.number;//记录当前目录页
                        current.folderLast=data.last; //记录目录是否已经读取完毕
                        for(var i in data.content){
                            if(data.content.hasOwnProperty(i)){
                                var d=data.content[i];
                                FOLDER_CACHE[d.id]=d //加入目录列表,用于上级文件夹的返回操作.
                                viewModel.data.push(convertListFolderData(d));
                            }
                        }
                        //如果文件夹加载完毕，则继续加载一次文件
                        if(data.last&&data.numberOfElements<current.pageSize){
                            setLoadStatus(false);
                            return loadData(folderid,parentid);
                        }
                    }).then(function(){
                        setLoadStatus(false);
                    }).catch(function(err){
                        //加载目录列表失败
                        if(viewModel.data()[0].type==1){//第一条如果是"正在加载中"
                            if(parentid&&folderid!="0"){ //如果传入了父目录id,并且当前目录不是根目录
                                viewModel.data([generateData({//则设置数据第一条为 "上一级目录"
                                    folderid:parentid,
                                    filename : TEXT.PARENT_FOLDER_TEXT,
                                    color : TEXT.PARENT_FOLDER_COLOR,
                                    icon : TEXT.PARENT_FOLDER_ICON,
                                })]);
                            }
                        }
                        setLoadStatus(false);
                        throw err;
                    })
            }
        }else{ //传入的目录不同
            //更换目录
            initData(folderid);
            return loadData(folderid,parentid)
        }
    }
    //初始化为加载中的状态 folderid:目录
    function initData(folderid){
        opt={
            folderid:folderid,
            folderIndex:-1,
            folderLast:false,
            fileIndex:-1,
            fileLast:false,
        }
        Object.assign(current,opt);
        viewModel.data(loaddingJson);
    }
    
    
    //  文件类型列表, value为对应的后缀名
    //  key加工成  fa-file-{key}-o 的图标
    var iconExtList={
        word:"doc,docx",
        excel:"xls,xlsx",
        pdf:"pdf",
        image:"jpg,jpeg,bmp,gif,png",
        archive:"zip,rar,7z,cab,iso",
        text:"txt,ini,cfg"
    }
    var colorExtList={ //对应的颜色值
        word:"#419AF3",
        excel:"#39825A",
        pdf:"#E20000",
        image:"#6B69A6",
        archive:"gray",
        text:"gray"
    }
    for(var i in iconExtList){ //反向加工为  value:key
        iconExtList[i]=iconExtList[i].split(",")
        for(var j in iconExtList[i]){
            if(iconExtList[i].hasOwnProperty(j))
                iconExtList[iconExtList[i][j]]=i
        }
        delete(iconExtList[i])
    }
    //转换一下列表数据,将必要数据填充进去
    //每一个列表数据都会进入此方法加工
    function generateData(data){
        for(var i in dataTemplate){
            if(data[i]==void 0){
                data[i]=dataTemplate[i]
            }
        }
        data.down=ko.observable(data.down);
        data.percent=ko.observable(data.percent);
        return data;
    }
    //转换一个doc对象为列表对象  
    //d:doc对象, 
    //每一个文件列表数据都会进入此方法加工
    function convertListFileData(d){
        var icon=iconExtList[d.ext];
        var result=generateData({
            filename : d.name,
            color : icon?colorExtList[icon]:"gray",
            icon : "fa fa-2x "+(icon?"fa-file-"+icon+"-o":"fa-file-o"),
            creator : d.creator_name,
            time : formatDate(new Date(d.createtime)),
            size : convertFileLength(d.length),
            data : d,
            down : myDocStorage[d.id]!=void 0 //在我的文档中存在则为true (绿色对号)
        })
        return result;
    }
    //转换一个folder对象为列表对象
    //d:folder对象
    //每一个目录列表数据都会进入此方法加工
    function convertListFolderData(d){
        var result=generateData({
            folderid:d.id,
            filename : d.name,
            color : "#FFD753",
            icon : "fa fa-folder fa-2x",
            creator : d.creator_name,
            time : formatDate(new Date(d.createtime)),
            data : d,
        })
        return result;
    }
    
    //转换文件长度
    function convertFileLength(length){
        for(var i=0;length>=1024;length/=1024,++i){}
        return Math.round(length*100)/100+["B","K","M","G","T","P"][i];
    }
    //ajax读取目录
    function getFolderData(folderid,page,size,sort){
        folderid=folderid||"0";
        page=page||0;
        size=size||10;
        sort=sort||{
            sortDirection:"ASC",
            sortField:"name"
        }
        var data={
            pid:folderid,
            pageIndex:page,
            pageSize:size,
            sortDirection:sort.sortDirection,
            sortField:sort.sortField,
        };
        var url = loadFolderUrl;
        return getData(url,data);
    }

    //ajax读取文件
    function getFileData(folderid,page,size,sort,search_filename){
     
        folderid=folderid||"0";
        page=page||0;
        size=size||10;
        sort=sort||{
            sortDirection:"ASC",
            sortField:"name"
        }
        var data={
            search_filename:search_filename,
            folderid:folderid,
            pageIndex:page,
            pageSize:size,
            sortDirection:sort.sortDirection,
            sortField:sort.sortField,
        };
        var url=loadFileUrl;
        return getData(url,data);
    }
    // === 缓存 start  =======================
    /**
     * 缓存结构
     * cache:{
     *    url: {  //请求地址
     *       data: {  //请求参数
     *           ajax取得的数据,
     *           __cacheTimestamp:缓存建立时间
     *       }
     *    } 
     * }
     */
   var cacheData=summer.getStorage(CACHE_STORAGE_KEY)||{}; //读取存储的缓存
    cacheData.timeout=CACHE_TIMEOUT; //缓存时间
    function tryGetFromCache(url,data){ //尝试读取缓存
        if(cacheData[url]){
            var key=JSON.stringify(data);
            if(cacheData[url][key]){
                var now=+new Date();
                if(now-cacheData[url][key].__cacheTimestamp<cacheData.timeout){
                    //缓存未超时
                    return cacheData[url][key];
                }else{
                    //缓存超时 删除
                    delete(cacheData[url][key]);
                }
            }
        }
    }
    function saveCache(url,data,cache){ //保存缓存内容
        if(cacheData[url]==void 0){
            cacheData[url]={};
        }
        var key=JSON.stringify(data);
        cacheData[url][key]=cache;
        if(cache){
            cacheData[url][key].__cacheTimestamp=+new Date();
        }
        summer.setStorage(CACHE_STORAGE_KEY,cacheData)
    }
    // === 缓存 END   =======================
    
    //ajax获取数据, 返回promise
    function getData(url,data){
        var cache=tryGetFromCache(url,data);
        if(cache){
            return Promise.resolve(cache);
        }
        return new Promise(function(resolve,reject){
            $.ajax({
                type : "get",
                url : url,
                data : data,
                success:function(res) {
                    saveCache(url,data,res);
                    resolve(res);
                },
                error:function(res) {
                    reject(res);
                },
           });
       })
    }
    function formatDate(date,fmt) {
        fmt=fmt||"yyyy-MM-dd hh:mm";
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    
    
    loadData(); //初始加载
    initMyDocData(); //加载我的文档
}

function backClick(){
	summer.closeWin({});
}



