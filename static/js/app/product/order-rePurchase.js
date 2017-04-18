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
    }];

    var options = {
        fields: fields,
        code: code,
        //  detailCode: '620221'
    };

    options.buttons = [{
        title: '确认',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['applyUser'] = $("#applyUser").val();
                reqApi({
                    code: "620201",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
    buildDetail(options);
});