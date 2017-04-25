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
        title: '账号'
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        // keyCode: '802006',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',
        // keyCode: '802006',
        formatter: Dict.getNameForList('biz_type')
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        title: "创建时间",
        field: 'createDatetime',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        // keyCode: '802006',
        formatter: Dict.getNameForList('jour_status'),
        search: true
    }, {
        field: 'bizNote',
        title: '取现说明'
    }];
    buildList({
        columns: columns,
        pageCode: '802520',
        searchParams: {
            'bizType': '11'
        }
    });
    $('#cheBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != "0") {
            toastr.info("不是可以审批的状态");
            return;
        }
        window.location.href = "recharge_check.html?code=" + selRecords[0].code;

    });
    $('#detaBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "recharge_detail.html?code=" + selRecords[0].code;

    });

});