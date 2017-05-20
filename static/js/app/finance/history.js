$(function() {


    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'code',
            title: '编号',
        }, {
            field: 'accountName',
            title: '户名',
            search: true
        },
        {
            field: 'currency',
            title: '币种',
            type: 'select',
            key: 'currency_type',
            formatter: Dict.getNameForList("currency_type"),
            // search: true
        },
        {
            field: 'amount',
            title: '充值金额',
            formatter: moneyFormat
        }, {
            field: 'channelType',
            title: '支付渠道',
            type: 'select',
            key: 'channel_type',
            formatter: Dict.getNameForList('channel_type'),
            // search: true
        }, {
            field: 'payCardInfo',
            title: '开户行',
            // type: "select",
            // listCode: "802116",
            // keyName: 'bankCode',
            // valueName: 'bankName',
        }, {
            field: 'payCardNo',
            title: '银行卡号',
        }, {
            field: 'applyUser',
            title: '申请人',
            formatter: function(v, data) {
                if (data.user.kind == '01') {
                    return data.user.loginName;
                } else {
                    return data.user.mobile;
                }
            }
        }, {
            field: 'applyDatetime',
            title: '申请日期',
            formatter: dateTimeFormat,
            field1: 'applyDateStart',
            title1: '申请日期',
            type1: 'date',
            field2: 'applyDateEnd',
            type2: 'date',
            search: true
        }, {
            field1: 'payDateStart',
            title1: '审核日期',
            type1: 'date',
            field2: 'payDateEnd',
            type2: 'date',
            search: true,
            visible: false
        }, {
            field: 'payUser',
            title: '审核人'
        }, {
            field: 'payDatetime',
            title: '审核时间',
            formatter: dateTimeFormat
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'charge_status',
            formatter: Dict.getNameForList('charge_status'),
            search: true
        }
    ];
    buildList({
        columns: columns,
        pageCode: '802705',
        // singleSelect: false,
        searchParams: {
            channelType: '90',
            companyCode: OSS.companyCode
        }
    });

    $("#detaBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        location.href = "recharge_check.html?code=" + selRecords[0].code + "&detail=1";
    });

});