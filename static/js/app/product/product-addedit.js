$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: "类型",
        field: "type",
        type: "select",
        key: "chanpin_type",
        required: true,
        onChange: function(v, data) {
            if (v == 1) {
                $("#price").parent().css("display", "none");
            } else if (v == 0) {
                $("#processFee").parent().css("display", "none");
                $("#loss").parent().css("display", "none");
            }
        },
        formatter: function(v, data) {
            if (v == 1) {
                $("#price").parent().css("display", "none");
                return v;
            } else if (v == 0) {
                $("#processFee").parent().css("display", "none");
                $("#loss").parent().css("display", "none");
                return v;
            }

        },
        readonly: view
    }, {
        title: "名称",
        field: "name",
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: "广告图",
        field: "advPic",
        type: "img",
        required: true,
        readonly: view
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true,
        readonly: view,
        single: true
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true,
        readonly: view
    }, {
        title: "面料损耗",
        field: "loss",
        required: true,
        readonly: view
    }, {
        title: "加工费",
        field: "processFee",
        amount: true,
        formatter: moneyFormat,
        required: true,
        readonly: view
    }, {
        title: "图文详述",
        field: "description",
        type: "textarea",
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
        addCode: "620000",
        detailCode: "620011",
        editCode: '620002'
    });

});