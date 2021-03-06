var y,bottom;
summerready = function(){
	y = $summer.offset($summer.byId('header')).h;
    bottom = $summer.offset($summer.byId('footer')).h;
	
	summer.openFrameGroup({
	        id: 'frameGroup',
	        background: '#ffffff',
	        scrollEnabled: false,
	        position: {
	            top: y,
	            bottom: bottom,
	            left: 0,
	            right: 0,
	        },
	        index: 0,
	        frames: [{
	            id: 'home',
	            url: 'html/home/home.html',
	            bgColor: '#ffffff',
	            hidden: false
	        }, {
	            id: 'ebook',
	            url: 'html/ebook/mobileEbook.html',
	            bgColor: '#ffffff',
	            hidden: true
	        }, {
	            id: 'message',
	            url: 'html/message/message.html',
	            bgColor: '#ffffff',
	            hidden: true
	        }, {
	        	id :'my',
	        	url: 'html/myself/myself.html',
	            bgColor: '#ffffff',
	            hidden: true
	        }]
	    });
	    
	    var viewModel = {
     	goFrame:function(frameId,data){
     		summer.setFrameGroupAttr({
     			id:'frameGroup',
     			index:frameId
     		})
     	}
     }
     ko.applyBindings(viewModel);
	    
}
var turn=0;
function keyBack(){
    turn++;
    if(turn==2){
        clearInterval(intervalID); 
        summer.exitApp()
    }else{
        summer.toast({"msg":"再点击一次退出!"});
    }
    var intervalID = setInterval(function() {
        clearInterval(intervalID);
        turn=0;
    }, 3000);
}