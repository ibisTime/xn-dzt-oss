$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        title: "",
        field: "type",
        value: "1",
        required: true,
        hidden: true
    }, {
        field: 'updater',
        type: 'hidden',
        value: getUserName()
    }, {
        title: '标题',
        field: 'title',
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: '缩略图',
        field: 'pic',
        type: 'img',
        required: true,
        readonly: view
    }, {
        title: "广告图",
        field: "advPic",
        type: 'img',
        required: true,
        readonly: view
    }, {
        title: '图文详述',
        field: 'description',
        required: true,
        type: 'textarea',
        readonly: view
    }, {
        title: '备注',
        field: 'remark',
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
        detailCode: '620121',
        addCode: '620110',
        editCode: '620112',
        view: view
    });

});