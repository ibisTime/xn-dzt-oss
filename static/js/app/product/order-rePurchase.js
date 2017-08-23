$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'applyUser',
        title: '下单人编号',
        type: 'select',
        pageCode: '805120',
        params: {
            kind: "C",
            status: "0",
            updater: "",
        },
        keyName: 'userId',
        valueName: '{{nickname.DATA}}--{{mobile.DATA}}',
        searchName: 'nickname',
        required: true
    }];


    var options = {
        fields: fields,
        code: code
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