$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: "产品型号",
        field: "modelCode",
        type: "select",
        required: true,
        listCode: "620012",
        keyCode: "code",
        valueCode: "name",
        formatter: function(v, data) {
            if (data.type == 1) {
                $("#price").parent().css("display", "none");
            }
        }
    }, {
        title: "品牌",
        field: "brand",
        required: true,
        maxlength: 255
    }, {
        title: "广告图",
        field: "advPic",
        type: "img",
        required: true
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true,
    }, {
        title: "类型",
        field: "type",
        type: "select",
        listCode: '620012',
        params: {
            status: "1"
        },
        keyName: 'code',
        valueName: 'name',
        defaultOption: '选此创建类型',
        onChange: function(v, data) {
            $("#category").renderDropdown({
                listCode: '620012',
                params: {
                    status: "1"
                },
                keyName: 'code',
                valueName: 'name',
            })
        },
    }, {
        title: "类别",
        field: "category",
        type: "select",
        required: true
    }, {
        title: "色系",
        field: "color",
        maxlength: 255,
        required: true
    }, {
        title: "花色",
        field: "flowers",
        maxlength: 255,
        required: true
    }, {
        title: "成分",
        field: "form",
        maxlength: 255,
        required: true
    }, {
        title: "规格编号",
        field: "modelNum",
        maxlength: 255,
        required: true
    }, {
        title: "重量",
        field: "weight",
        maxlength: 255,
        required: true
    }, {
        title: "纱支",
        field: "yarn",
        required: true
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: "620020",
        detailCode: "620031",
        editCode: '620022'
    });

});