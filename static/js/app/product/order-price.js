$(function() {
    var code = getQueryString('code');

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
    }, {
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
        formatter: dateFormat,
        readonly: true
    }, {
        title: "量体嘱咐",
        field: "applyNote",
        readonly: true
    }, {
        title: "产品",
        field: "modelCode",
        type: "select",
        listCode: "620012",
        params: {
            updater: ""
        },
        searchName: "name",
        valueName: "name",
        keyName: "code",
        required: true
    }, {
        field: "quantity",
        title: '数量',
        type: "hidden",
        value: "1",
        required: true
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '620231'
    };

    options.buttons = [{
        title: '确认',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['orderCode'] = code;
                data['modelCode'] = $("#modelCode").val();
                data["quantity"] = $("#quantity").val();
                data["ramark"] = $("#ramark").val();
                reqApi({
                    code: "620203",
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