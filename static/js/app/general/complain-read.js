$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'receiver',
        title: '接收人',
        search: true
    }, {
        field: "content",
        title: "内容"
    }, {
        field: 'commenter',
        title: '留言人',
        search: true
    }, {
        field: 'status',
        title: '状态',
        search: true,
        type: 'select',
        data: {
            "0": "未读",
            "1": "已读"
        }
    }];

    var buttons = [];
    buttons = [{
        title: "已阅",
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                reqApi({
                    code: "620143",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: "返回",
        handler: function() {
            goBack();
        }
    }]
    buildDetail({
        fields: fields,
        code: code,
        buttons: buttons,
        detailCode: '620146'
    });
});