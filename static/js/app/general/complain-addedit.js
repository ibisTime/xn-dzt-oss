$(function() {
    var commenter = getQueryString('commenter');
    var code = getQueryString('code');
    var view = getQueryString('v');


    var fields = [{
        field: 'commenter',
        title: '留言人',
        readonly: true
    }, {
        field: "content",
        title: "内容",
        type: "textarea",
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        search: true,
        type: 'select',
        data: {
            "0": "未读",
            "1": "已读"
        },
        readonly: true
    }, {
        title: "回复内容",
        field: "content",
        required: true,
        type: "textarea",
        normalArea: true,
        readonly: false,
        maxlength: 255
    }];
    var options = {
        fields: fields,
        code: code,
        detailCode: '620146'
    };
    options.buttons = [{
        title: "回复",
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                var data = $('#jsForm').serializeObject();
                data["commenter"] = "0";
                data["receiver"] = commenter;
                reqApi({
                    code: "620141",
                    json: data
                }).done(function() {
                    sucDetail();
                });
                var json = {};
                json.code = code;
                json.lookUser = "0"
                reqApi({
                    code: "620143",
                    json: json
                }).done(function() {
                    goBack();
                });
            }
        }
    }, {
        title: "返回",
        handler: function() {
            goBack();
        }
    }];
    buildDetail(options);
});