function backClick(){
  	summer.closeWin({});
}

function shareCancle() {
    UM.share.close();
}

$(function () {
var orgLevelObj = getOrgLevel();
if(orgLevelObj.orgLevel == 1 || orgLevelObj.orgLevel == 2){
	$("#fillReportBtn").show();
}
var xuanze = localStorage.xuanze;
//控制是从我的工作进入的详情页还是公司列表进入的详情页
if("myWork" == xuanze){
	$("#fillReportBtn").show()
}else if("GEVIEW" == xuanze || "handle" == xuanze){
	$("#fillReportBtn").hide()
}

    $('.phone').on('click', function () {
        UM.actionsheet({
            title: '',  
            items: ['结束','驳回','通过'],
            callbacks: [function () {
            	localStorage.opinionState = 'FINISH';
                summer.openWin({ 
				    "id" : "opinion",
				    "url" : "html/goodexample/opinion.html"
				});
            }, function () {
            	localStorage.opinionState = 'DISAGREE';
				summer.openWin({ 
				    "id" : "opinion",
				    "url" : "html/goodexample/opinion.html"
				});
            }, function () {
            	localStorage.opinionState = 'AGREE';
				summer.openWin({ 
				    "id" : "opinion",
				    "url" : "html/goodexample/opinion.html"
				});
            }]
        });

    })
});
