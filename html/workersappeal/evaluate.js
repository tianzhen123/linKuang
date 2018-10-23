function shareCancle() {
    UM.share.close();
}

$(function () {
    $('.phone').on('click', function () {
        UM.actionsheet({
            title: '评价',  
            items: ['满意','不满意','跳过'],
            callbacks: [function () {
                
            }, function () {
                
            }, function () {
               
            }]
        });

    })
});
