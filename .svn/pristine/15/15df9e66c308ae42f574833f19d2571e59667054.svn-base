summerready = function(){
    // here is your code...
    
    var param = summer.pageParam.count;
    var jsonArray = new Array();
    var nameList = new Array();
    var valList1 = new Array();
    var valList2 = new Array();
    var valList3 = new Array();
    var valList4 = new Array();
    var requestid = getHttp()+"partyconstrutproject/psexamrsmaster/Ranking";
   	
	summer.get(requestid, {"psexam":param.pk_psexamsub} , //可选参数，方便开发者设置请求的header
	{
		"Content-Type" : "application/x-www-form-urlencoded", //可选参数，post请求的要写入的条件数据，须为json对象
	}, function(response) {//成功回调
		var data = $summer.strToJson(response.data);

			for(var i=0;i<data.length;i++)
			{
				nameList.push(data[i].name);
				valList1.push(data[i].s1);
				valList2.push(data[i].s2);
				valList3.push(data[i].s3);
				valList4.push(data[i].s4);
			}
			 displayGraph(nameList,valList1,valList2,valList3,valList4);
	}, function(response) {//失败回调
		//$summer.alert(response);
	});
	
}﻿;

	function displayGraph(titleArray,valArray1,valArray2,valArray3,valArray4)
	{
		var app = echarts.init(document.getElementById('main'));
		
	
		var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];

app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: echarts.util.reduce(posList, function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
        var labelOption = {
            normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            }
        };
        myChart.setOption({
            series: [{
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }]
        });
    }
};


var labelOption = {
    normal: {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    }
};

option = {
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            axisTick: {show: false},
            data: titleArray
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '非常满意',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            data: valArray1
        },
        {
            name: '比较满意',
            type: 'bar',
            label: labelOption,
            data: valArray2
        },
        {
            name: '满意',
            type: 'bar',
            label: labelOption,
            data: valArray3
        },
        {
            name: '不满意',
            type: 'bar',
            label: labelOption,
            data: valArray4
        }
    ]
};
	// 使用刚指定的配置项和数据显示图表。
	app.setOption(option);
	}
	
function backClick(){
	summer.closeWin();
}