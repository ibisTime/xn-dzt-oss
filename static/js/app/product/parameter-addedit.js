$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: "产品型号",
        field: "modelCode",
        type: "select",
        listCode: "620012",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        required: true
    }, {
        title: "工艺名称",
        field: "name",
        maxlength: 255,
        required: true
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: momneyFormat,
        required: true
    }, {
        title: "图片",
        field: "pic",
        type: "img",
        required: true
    }, {
        field: 'type',
        title: '类型',
        type: "select",
        required: true,
        key: "craftwork_type",
        formatter: Dict.getNameForList("craftwork_type")
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: "620040",
        detailCode: "620051",
        editCode: '620042'
    });

});