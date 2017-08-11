$(function() {
    var code = getQueryString('code');

    var typeKind = {
        "80支棉": "80支棉",
        "100支棉": "100支棉",
        "棉真丝": "棉真丝",
        "棉弹力": "棉弹力"
    };

    var fields = [{
        title: "栏目项",
        field: "parentCode",
        type: 'select',
        key: "measure",
        required: true,

    }, {
        title: "栏目值",
        field: "name",
        maxlength: 255,
        required: true
    }, {
        field: 'orderNo',
        title: '顺序',
        number: true,
        required: true,
        afterSet: function(v, data) {
            if (v == undefined) {
                $("#orderNo").parent().css("display", 'none')
            }
        }
    }, {
        title: "图片",
        field: "pic",
        type: "img",
        required: true,
        afterSet: function(v, data) {
            if (v == undefined || v == "") {
                $("#pic").parent().css("display", 'none')
            }
        }
    }, {
        field: 'type',
        title: '类型',
        type: "select",
        data: typeKind,
        required: true,
        afterSet: function(v, data) {
            if (v == undefined) {
                $("#type").parent().css("display", 'none')
            }
        }
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: "620056",
        editCode: '620052'
    });

});