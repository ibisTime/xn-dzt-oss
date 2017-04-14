$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
        search: true
    }, {
        field: 'accountNumber',
        title: '账户编号',
    }, {
        title: "金额",
        field: "transAmount",
        formatter: moneyFormat
    }, {
        field: 'bizType',
        title: '业务类型',
        search: true,
        key: 'biz_type',
        data: {
            '11': '充值',
            '-11': '取现'
        },
        //   keyCode: '802006',
        formatter: Dict.getNameForList('biz_type')
    }, {
        field: 'status',
        title: '状态',
        key: 'jour_status',
        // keyCode: '802006',
        formatter: Dict.getNameForList('jour_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }, {
        field: 'bizNote',
        title: '备注说明'
    }];

    buildList({
        columns: columns,
        pageCode: '802520',
        searchParams: {
            bizType: '11,-11'
        }
    });



});