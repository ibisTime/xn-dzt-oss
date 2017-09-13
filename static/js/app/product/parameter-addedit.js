$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: "所属规格",
        field: "modelSpecsCode",
        type: "select",
        listCode: "620287",
        keyName: "code",
        valueName: "{{name.DATA}}--{{modelName.DATA}}",
        searchName: "name",
        required: true,
        onChange: function(v, data) {
            reqApi({
                code: '620257',
                json: {
                    modelSpecsCode: v
                },
                sync: true
            }).done(function(d) {
                var data1 = {};
                if (d.length && v) {
                    d.forEach(function(v, i) {
                        data1[v.dkey] = v.dvalue;
                    })
                }
                $("#type").renderDropdown2(data1);
            });
        }
    }, {
        field: 'type',
        title: '工艺类型',
        type: "select",
        required: true,
        // listCode: "620257",
        // params: {
        //     modelSpecsCode: $("#modelSpecsCode").val()
        // },
        // keyName: "code",
        // valueName: "dvalue",
        // searchName: "dvalue"
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
        title: "工艺选中图片",
        field: "selected",
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