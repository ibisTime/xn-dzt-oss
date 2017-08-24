$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: "留言人",
        field: "commentMobile",
        formatter: function(v, data) {
            if (v) {
                return v
            } else if (data.commentName) {
                return data.commentName
            } else {
                return data.commenter
            }
        },
        readonly: true
    }, {
        field: "content",
        title: "留言内容",
        type: "textarea",
        readonly: true
    }, {
        title: "留言时间",
        field: "commentDatetime",
        formatter: dateTimeFormat,
        readonly: true
    }];

    var buttons = [];
    buttons = [{
        title: "返回",
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                data["lookUser"] = "0";
                reqApi({
                    code: "620143",
                    json: data
                }).done(function() {
                    goBack();
                });
            }
        }
    }]
    buildDetail({
        fields: fields,
        code: code,
        buttons: buttons,
        detailCode: '620146'
    });
});