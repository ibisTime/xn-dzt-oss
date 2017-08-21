$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: "所属产品",
        field: "modelCode",
        type: "select",
        listCode: "620012",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        required: true,
        onChange: function(v, data) {
            if (data.type == 0) {
                $("#price").parent().css("display", "none");
            }
        }
    }, {
        field: 'type',
        title: '工艺类型',
        type: "select",
        required: true,
        key: "craftwork_type"
    }, {
        title: "工艺名称",
        field: "name",
        maxlength: 255,
        required: true
    }, {
        title: "工艺费",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true
    }, {
        title: "工艺图片",
        field: "pic",
        type: "img",
        required: true,
        single: true
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];
    var viewList = [{
        field: 'status',
        title: '状态',
        readonly: true,
        type: 'select',
        data: {
            "0": "草稿",
            "1": "上架",
            "2": "下架"
        }
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data: {
            "1": "热门",
            "0": "普通"
        },
        readonly: true
    }, {
        field: 'orderNo',
        title: 'UI次序',
        number: true,
        readonly: true
    }]
    if (view) {
        fields = fields.concat(viewList)
    }
    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "620040",
        detailCode: "620051",
        editCode: '620042'
    });

});