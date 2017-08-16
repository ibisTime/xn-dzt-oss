$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: "所属产品",
        field: "modelCode",
        type: "select",
        required: true,
        listCode: "620012",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        onChange: function(v, data) {
            if (data.type == 0) {
                $("#price").parent().css("display", "none");
            }
        },
        readonly: view
    }, {
        title: "品牌",
        field: "brand",
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: "类型",
        field: "type",
        type: "select",
        key: "fabric_type",
        readonly: view
    }, {
        title: "广告图",
        field: "advPic",
        type: "img",
        single: true,
        required: view,
        readonly: view
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true,
        single: true,
        readonly: view
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true,
        readonly: view
    }, {
        title: "色系",
        field: "color",
        type: "select",
        key: "fabric_color",
        required: true,
        readonly: view
    }, {
        title: "花色",
        field: "flowers",
        type: "select",
        key: "fabric_design",
        required: true,
        readonly: view
    }, {
        title: "成分",
        field: "form",
        type: "select",
        key: "fabric_divide",
        required: true,
        readonly: view
    }, {
        title: "规格编号",
        field: "modelNum",
        maxlength: 255,
        required: true,
        readonly: view
    }, {
        title: "重量(g)",
        field: "weight",
        maxlength: 255,
        required: true,
        readonly: view
    }, {
        title: "纱支",
        field: "yarn",
        required: true,
        readonly: view
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255,
        readonly: view
    }];
    var viewList = [{
        field: 'status',
        title: '状态',
        readonly: view,
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
        readonly: view
    }, {
        field: 'orderNo',
        title: 'UI次序',
        number: true,
        readonly: view
    }]
    if (view) {
        fields = fields.concat(viewList)
    }
    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "620020",
        detailCode: "620031",
        editCode: '620022'
    });

});