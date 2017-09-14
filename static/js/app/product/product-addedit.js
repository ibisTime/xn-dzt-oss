$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var chanpinType = Dict.getNameForList("chanpin_type");

    var fields = [{
        title: "类型",
        field: "type",
        type: "select",
        key: "chanpin_type",
        required: true,
        readonly: view
    }, {
        title: "类别",
        field: "kind",
        type: "select",
        data:{
            "0":"单品",
            "1":"套装"
        },
        required: true,
        readonly: view
    }, {
        title: "名称",
        field: "name",
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true,
        readonly: view,
        single: true
    }, {
        title: "广告图",
        field: "advPic",
        type: "img",
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