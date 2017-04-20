$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'applyUser',
        title: '下单人编号',
        type: 'select',
        listCode: '805055',
        params: {
            kind: "f1",
            status: "0",
            updater: ""
        },
        keyName: 'userId',
        valueName: '{{userId.DATA}} -{{loginName.DATA}}',
        required: true
    }, {
        field: 'applyName',
        title: '下单人姓名',
        required: true,
        maxlength: 32
    }, {
        field: 'applyMobile',
        title: '下单人手机号',
        mobile: true,
        required: true,
    }, {
        field: 'ltDatetime',
        title: '量体时间',
        required: true,
        type: 'datetime'
    }, {
        field: 'Province1',
        title: '量体地址',
        type: "citySelect",
        required: true
    }, {
        title: "量体详细地址",
        field: "ltAddress",
        maxlength: 64,
        required: true,
    }, {
        field: 'applyNote',
        title: '量体嘱咐',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: '620200',
        beforeSubmit: function(data) {
            data.ltProvince = $('#province').val();
            data.ltCity = $('#city').val();
            data.ltArea = $('#area').val();
            return data
        }
    });

});