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
    }, {
        title: '种类',
        field: 'parentKey',
        value: "0",
        type: "hidden",
        required: true
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