$(function() {
    var code = getQueryString('code');
    var noteConfig = {
        title: '参数值',
        field: 'remark',
        required: true
    };
    reqApi({
        code: '805916',
        json: {
            id: code
        },
        sync: true
    }).then(function(data) {
        if (data.ckey == "aboutUs") {
            noteConfig.type = "textarea";
        } else if (data.ckey == "fugouPic" || data.ckey == "yuyuePic") {
            noteConfig.type = "img";
        }
    })

    var fields = [{
        title: '参数键',
        field: 'ckey',
        required: true,
        maxlength: 20
    }, noteConfig, {
        title: '参数说明',
        field: 'cvalue',
        required: true,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: "805910",
        detailCode: '805916',
        editCode: '805911'
    });
});