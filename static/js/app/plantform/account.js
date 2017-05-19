$(function() {
    var view = 1;
    var accountNumber;
    var accountNumberPing;

    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER
        }
    }).then(function(data) {
        $("#amount-yu").text("￥" + data[0].amount / 1000);
        accountNumberPing = data[0].accountNumber;
    });


    reqApi({
        code: '802503',
        json: {
            userId: "SYS_USER_DZT_TG"
        }
    }).then(function(data) {
        $("#amount-CNY").text("￥" + data[0].amount / 1000);
        accountNumber = data[0].accountNumber;
    });

    $("#accoutBtn").click(
        function() {
            window.location.href = 'account_detail.html?accountNumber=' + accountNumber;
        }
    );
    $("#accoutPingBtn").click(
        function() {
            window.location.href = 'account_detail.html?ping=1&accountNumberPing=' + accountNumberPing;
        }
    );
    $("#accouBtn").click(
        function() {
            window.location.href = 'account_quxian.html?accountNumber=' + accountNumberPing;
        }
    );
});