$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        title: '户名',
        field: 'realName',
        required: true,
        maxlength: 32
    }, {
        title: '账号',
        field: 'accountNumber',
        required: true
    }, {
        title: '流水编号',
        field: 'code1',
        '[value]': 'code'
    }, {
        field: 'channelType',
        title: '渠道类型',
        type: 'select',
        key: 'channel_type',
        // keyCode: '802006',
        formatter: Dict.getNameForList('channel_type')
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',
        // keyCode: '802006',
        formatter: Dict.getNameForList('biz_type')
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        // keyCode: '802006',
        formatter: Dict.getNameForList('jour_status'),
    }, {
        field: 'workDate',
        title: '拟对账时间'
    }, {
        field: 'bizNote',
        title: '充值说明'
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '802522',
        view: true
    };

    options.buttons = [{
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail(options);
});