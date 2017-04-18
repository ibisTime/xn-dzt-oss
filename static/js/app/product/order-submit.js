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
            field: "remark",
            readonly: true
        }, {
            title: "选择量体师",
            type: "citySelect",
            readonly: true,
            onChange: function(v, r) {
                $('#ltUser').renderDropdown({
                    listCode: '805055',
                    keyName: 'userId',
                    valueName: 'loginName',
                    searchName: "{{loginName.DATA}}--{{mobile.DATA}}",
                    params: {
                        kind: "f2",
                        status: '0',
                        updater: ""
                    }
                });
            }
        }, {
            title: "量体师姓名",
            field: "ltName",
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
            maxlength: 255
        }
    ];

    var options = {
        fields: fields,
        code: code,
        detailCode: '620221'
    };

    options.buttons = [{
        title: '确认',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['orderCode'] = code;
                data['remark'] = $("#remark").val();
                reqApi({
                    code: "620208",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
    buildDetail(options);
});