$(function() {
    var code = getQueryString('code');
    var accountAmount = getQueryString('accountAmount')
    var accountNumber = getQueryString('accountNumber');
    var kind = getQueryString('kind');

    $("#accountAmount").html("账户余额：" + accountAmount + "元");
    if (kind == "Bl") {
        //量体师
        reqApi({
            code: '802028',
            json: {
                keyList: ["BUSERQXBS", "BUSERQXFL", "BUSERQXSX", "BUSERMONTIMES", "QXDBZDJE"],
                updater: "",
                sync: true
            }
        }).done(function(data) {
            $("#PUSERMONTIMES").html("1 ：每月对多取现次数：" + data.BUSERMONTIMES);
            $("#PUSERQXFL").html("2 ： 取现费率：" + data.BUSERQXFL);
            $("#QXDBZDJE").html("3 ： 单笔取现最大金额：" + data.QXDBZDJE);
            $("#PUSERQXSX").html("4 ： 取现时效" + data.BUSERQXSX);
            $("#PUSERQXBS").html("5 ： 取现取现金额必须是" + data.BUSERQXBS + "倍数");
        });

    } else {
        //合伙人
        reqApi({
            code: '802028',
            json: {
                keyList: ["PUSERMONTIMES", "PUSERQXFL", "QXDBZDJE", "PUSERQXSX", "PUSERQXBS"],
                updater: "",
                sync: true
            }
        }).done(function(data) {
            $("#PUSERMONTIMES").html("1 ：每月对多取现次数：" + data.PUSERMONTIMES);
            $("#PUSERQXFL").html("2 ： 取现费率：" + data.PUSERQXFL);
            $("#QXDBZDJE").html("3 ： 单笔取现最大金额：" + data.QXDBZDJE);
            $("#PUSERQXSX").html("4 ： 取现时效" + data.PUSERQXSX);
            $("#PUSERQXBS").html("5 ： 取现取现金额必须是" + data.PUSERMONTIMES + "倍数");
        });

    }

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
        // type: "select",
        // listCode: "802116",
        // keyName: 'bankCode',
        // valueName: 'bankName',
        required: true,
        maxlength: 255
    }, {
        field: 'payCardNo',
        title: '银行卡号',
        required: true,
        bankCard: true,
    }];

    var options = {
        fields: fields,
        code: code,
        addCode: '802751',
        detailCode: '802756',

        beforeSubmit: function(data) {
            data.applyUser = getUserId();
            return data;
        }
    };

    buildDetail(options);

});