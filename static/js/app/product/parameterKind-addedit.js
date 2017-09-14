$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '类型',
        field: 'type',
        hidden: true,
        defaultValue: '0'
    }, {
        title: "所属规格",
        field: "modelSpecsCode",
        type: "select",
        listCode: "620287",
        required: true,
        keyName: "code",
        valueName: "{{name.DATA}}--{{modelName.DATA}}",
        searchName: "name",
        readonly: !!code,
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
                console.log(data1)
                var value = "点此创建种类";
                data0 = { "0": value };
                data2 = $.extend(data0, data1)
                    // data1.push
                    // data1.v01="点此创建种类";
                $("#parentKey").renderDropdown2(data2);
            });
        }
    }, {
        title: '种类',
        field: 'parentKey',
        required: true,
        type: 'select',
        readonly: !!code,
        defaultOption: '选此创建种类'
    }, {
        title: "类别",
        field: "kind",
        type: "select",
        key: "category_kind",
        formatter: Dict.getNameForList("category_kind"),
        required: true,
        readonly: !!code,
    }, {
        title: '参数键',
        field: 'dkey',
        required: true,
        maxlength: 255,
        readonly: !!code,
    }, {
        title: '参数值',
        field: 'dvalue',
        required: true,
        maxlength: 255,
        readonly: view,
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250,
        readonly: view,
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: '620250',
        editCode: '620252',
        detailCode: '620256',
        view: view
    });

    $('#parentKey').on('change', function() {
        $('#type').val(this.value == 0 ? '0' : '1');
    });

});