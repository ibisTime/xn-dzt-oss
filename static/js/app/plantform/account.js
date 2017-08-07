$(function() {
    var accountNumberJF;
    var accountNumber;
    var accountNumberCNY;

    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER
        }
    }).then(function(data) {
        $("#amount-CNY").text("￥" + (data[0].amount/1000).toFixed(2));
        accountNumberCNY = data[0].accountNumber;
        $("#amount-JF").text("￥" + (data[1].amount/1000).toFixed(2));
        accountNumberJF = data[1].accountNumber;
    });


    reqApi({
        code: '802503',
        json: {
            userId: "SYS_USER_DZT_TG"
        }
    }).then(function(data) {
        $("#amount-TG").text("￥" + (data[0].amount / 1000).toFixed(2));
        accountNumber = data[0].accountNumber;
    });

    $("#accoutJFBtn").click(function() {
            window.location.href = 'account_detail.html?accountNumber=' + accountNumberJF;
        }
    );
    $("#accoutCNYBtn").click(function() {
            window.location.href = 'account_detail.html?accountNumber=' + accountNumberCNY;
        }
    );
    $("#quxianBtn").click(function() {
            window.location.href = 'account_quxian.html?accountNumber=' + accountNumber;
        }
    );
});