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
        field: "modelCode",
        type: "select",
        listCode: "620287",
        required: true,
        keyName: "code",
        valueName: "name",
        searchName: "name",
        readonly: view,
    }, {
        title: '种类',
        field: 'parentKey',
        required: true,
        type: 'select',
        listCode: '620257',
        params: {
            type: 0
        },
        keyName: 'dkey',
        valueName: 'dvalue',
        readonly: view,
        defaultOption: '选此创建种类'
    }, {
        title: '参数键',
        field: 'dkey',
        required: true,
        maxlength: 255,
        readonly: view,
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