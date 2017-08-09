$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberTG;
    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER
        }
    }).done(function(data) {
        $("#amount-CNY").text("￥" + (data[0].amount / 1000).toFixed(2));
        accountNumberCNY = data[0].accountNumber;
        $("#amount-JF").text((data[1].amount / 1000).toFixed(2));
        accountNumberJF = data[1].accountNumber;
    });

    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER+"_TG"
        }
    }).then(function(data) {
        $("#amount-TG").text("￥" + (data[0].amount / 1000).toFixed(2));
        accountNumberTG = data[0].accountNumber;
    });

    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    })
    $("#JFls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberJF;
    })
    $("#accoutGrantBtn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberTG;
    })
    $("#accouBtn").click(function() {
        window.location.href = 'account_enchashment.html?accountNumber=' + accountNumberTG;
    });

});