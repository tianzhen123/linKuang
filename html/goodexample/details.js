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


    $('.phone').on('click', function () {
        UM.actionsheet({
            title: '',  
            items: ['驳回','通过'],
            callbacks: [function () {
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
