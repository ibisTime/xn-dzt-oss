$(function() {

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'ckey',
            title: '参数键',
            search: true
        },
        {
            field: 'note',
            title: '参数值',
            // formatter:function(v,data){
            //    return v && '<img  style="width:60px;height:60px" src="' + OSS.picBaseUrl + '/' + v + '" >' || "-"
            // }
        },
        {
            field: 'cvalue',
            title: '参数说明'
        }, {
            field: 'remark',
            title: '备注'
        }
    ];
    buildList({
        router: 'param',
        columns: columns,
        pageCode: '807715',
        searchParams:{
            type:"1"
        }
    });
});