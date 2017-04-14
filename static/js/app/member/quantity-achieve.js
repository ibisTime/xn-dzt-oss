$(function() {


    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            title: '订单',
            field: 'loginName',
            // formatter: function(value, row, index) {
            //     return row['realName'] ? row['realName'] : value;
            // },
            search: true
        }, {
            title: "身份证号",
            field: "idNo",
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
            title: "分成比例",
            field: "divideRate"
        }, {
            title: "状态",
            field: "status",
            type: "select",
            key: "user_status",
            formatter: Dict.getNameForList("user_status"),
            search: true
        },
        {
            title: '备注',
            field: 'remark'
        }
    ];
    buildList({
        router: '',
        columns: columns,
        pageCode: ' ',
        searchParams: {
            kind: "f2"
        }
    });
});