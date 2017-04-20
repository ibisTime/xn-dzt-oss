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
            formatter: dateFormat,
            readonly: true
        }, {
            title: "量体嘱咐",
            field: "applyNote",
            readonly: true
        }, {
            title: "选择量体师",
            type: "citySelect",
            required: true,
            onChange: function(v, r) {
                var province = $("#province").val();
                var city = $("#city").val();
                var area = $("#area").val();
                $('#ltUser').renderDropdown({
                    listCode: '001403',
                    keyName: 'userId',
                    valueName: 'loginName',
                    searchName: "{{loginName.DATA}}--{{realName.DATA}}",
                    params: {
                        kind: "f2",
                        province: province,
                        city: city,
                        area: area,
                        //status: '0',
                        userRefere: sessionStorage.getItem('userId'),
                        updater: ''
                    }
                });
            }
        }, {
            title: "量体师编号",
            field: 'ltUser',
            type: 'select',
            required: true
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
                data['ltUser'] = $("#ltUser").val();
                // data["ltName"] = $("#ltUser").val();
                reqApi({
                    code: "620202",
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