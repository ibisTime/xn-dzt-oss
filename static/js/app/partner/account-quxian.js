$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    // var userId = sessionStorage.getItem('userId');
    var accountNumber;
    reqApi({
        code: "802503",
        json: { userId: sessionStorage.getItem('userId') },
        sync: true
    }).then(function(data) {
        accountNumber = data[0].accountNumber;
    });


    var fields = [{
        field: 'bizType',
        type: 'hidden',
        value: '-11'
    }, {
        field: 'accountNumber',
        title: '用户账户',
        required: true,
        type: 'hidden',
        value: accountNumber
    }, {
        field: 'amount',
        title: '取现金额',
        required: true,
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '开户行',
        required: true,
    }, {
        field: 'payCardNo',
        title: '银行卡号',
        type: "select",
        listCode: "802116",
        keyName: 'bankCode',
        valueName: 'bankName',
        required: true,
        bankCard: true,
    }];

    var options = {
        fields: fields,
        code: code,
        addCode: '802751',
        detailCode: '802756',
        view: view,
        beforeSubmit: function(data) {
            data.applyUser = getUserId();
            return data;
        }
    };

    buildDetail(options);

});