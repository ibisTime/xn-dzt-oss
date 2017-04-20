$(function() {
    var code = getQueryString('code');
    //var  view =getQueryString('v');

    var fields = [{
            title: '订单号',
            field: 'code1',
            formatter: function(v, data) {
                return data.code
            },
            readonly: true
        }, {
            title: '状态',
            field: 'status',
            key: "order_status",
            formatter: Dict.getNameForList("order_status"),
            readonly: true
        },
        {
            title: '下单人',
            field: 'applyName',
            readonly: true
        }, {
            title: '联系方式',
            field: 'applyMobile',
            readonly: true
        }, {
            title: '量体地址',
            field: 'province1',
            formatter: function(v, data) {
                var result = (data.ltProvince || "") + (data.ltCity || "") + (data.ltArea || "") + (data.ltAddress || "");
                return result || "-";
            },
            readonly: true
        }, {
            title: '量体时间',
            field: 'ltDatetime',
            formatter: dateTimeFormat,
            readonly: true
        }, {
            title: "量体嘱咐",
            field: "applyNote",
            readonly: true
        }, {
            title: "量体师姓名",
            field: "ltUser",
            type: "select",
            readonly: true
        }, {
            title: '价格',
            field: "amount",
            formatter: moneyFormat,
            readonly: true
        }, {
            title: "收件人姓名",
            field: "receiver",
            type: "select",
            readonly: true
        }, {
            title: "收件人联系方式",
            field: 'reMobile',
            readonly: true
        }, {
            title: "收件人地址",
            field: "reAddress",
            readonly: true
        }, {
            title: " 备注",
            field: "remark",
            maxlength: 255,
            readonly: true
        }, {
            field: 'orderCode',
            title: '发货单号',
            type: "hidden",
            value: code,
            readonly: true,
        }, {
            title: '物流公司',
            field: 'logisticsCompany',
            type: 'select',
            key: 'wl_company',
            readonly: true,
        }, {
            title: '物流单号',
            field: 'logisticsCode',
            readonly: true,
        }, {
            field: 'deliverer',
            title: '发货人',
            readonly: true,
        }, {
            field: 'deliveryDatetime',
            title: '发货时间',
            type: "datetime",
            formatter: dateTimeFormat,
            readonly: true,
        }, {
            field: 'pdf',
            title: '物流单',
            type: 'img',
            readonly: true
        }, {
            field: 'remark',
            title: '备注',
            maxlength: 255,
            readonly: true
        }
    ];

    var options = {
        fields: fields,
        code: code,
        detailCode: '620221'
    };

    options.buttons = [{
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
    buildDetail(options);
});