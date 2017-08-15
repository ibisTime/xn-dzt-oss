$(function() {
    var code;
    reqApi({
        code: '805917',
        json: {
            ckey: 'serviceTime'
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });

    var fields = [{
        field: 'cvalue',
        type: 'hidden',
        value: '服务时间'
    }, {
        title: '时间',
        field: 'remark',
        required: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '805916',
        buttons: [{
            title: '保存',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['id'] = data['code'];
                    reqApi({
                        code: '805911',
                        json: data
                    }).done(function(data) {
                        toastr.success('操作成功');
                    });
                }
            }
        }]
    };

    buildDetail(options);
});