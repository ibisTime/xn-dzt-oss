$(function() {


    reqApi({
        code: '802900',
        json: {
            "bizType": "GW",
            "accountNumber": OSS.SYS_ACCOUNT
        }
    }).done(function(data) {
        $("#amount-totle").text("￥" + data.totalAmount / 1000);
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "11",
            "accountNumber": OSS.companyCode
        }
    }).done(function(data) {
        $("#amount-access").text("￥" + data.totalAmount / 1000);
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "HHRFC",
            "accountNumber": OSS.SYS_ACCOUNT
        }
    }).done(function(data) {
        $("#amount-Hhaccess").text("￥" + data.totalAmount / 1000);
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "LTSFC",
            "accountNumber": OSS.SYS_ACCOUNT
        }
    }).done(function(data) {
        $("#amount-ltaccess").text("￥" + data.totalAmount / 1000);
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "GWTK",
            "accountNumber": OSS.SYS_ACCOUNT
        }
    }).done(function(data) {
        $("#amount-quaccess").text("￥" + data.totalAmount / 1000);
    });
    reqApi({
        code: '802900',
        json: {
            "bizType": "-11",
            "accountNumber": OSS.companyCode
        }
    }).done(function(data) {
        $("#amount-quxianaccess").text("￥" + data.totalAmount / 1000);
    });
});