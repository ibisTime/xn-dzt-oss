$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';

    var fields = [{
        field: 'bizType',
        type: 'hidden',
        value: '11'
    }, {
        field: 'bizNote',
        type: 'hidden',
        value: '线下充值'
    }, {
        field: 'bankcardNumber',
        title: '充值说明',
        // title : '充值银行卡卡号',
        required: true,
        maxlength: 60
    }, {
        field: 'accountNumberList',
        title: '用户账户',
        required: true,
        type: 'select',
        //multiple: true,
        pageCode: userId ? '802503' : '802500',
        params: {
            currency: 'CNY',
            userId: userId
        },
        keyName: 'accountNumber',
        valueName: '{{realName.DATA}}',
        searchName: 'realName',
        help: '支持户名查询'
    }, {
        field: 'transAmount',
        title: '充值金额',
        required: true,
        amount: true
    }];

    var options = {
        fields: fields,
        code: code,
        addCode: '802510',
        view: view
    };

    buildDetail(options);
    $("#subBtn").off("click").on("click", function() {
        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            data.accountNumberList = [data.accountNumberList];
            // data.transAmount = -data.transAmount;
            reqApi({
                code: "802510",
                json: data
            }).done(function(data) {
                sucDetail();
            });
        }
    })
});