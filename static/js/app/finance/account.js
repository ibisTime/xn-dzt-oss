$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberTG;
    var accountNumberJYZ;
    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER
        }
    }).done(function(data) {
        var accountAmountCNY = data[0].amount;
        accountAmountCNY = (accountAmountCNY / 1000).toString();
        accountAmountCNY = accountAmountCNY.replace(/(\.\d\d)\d+/ig, "$1");
        accountAmountCNY = parseFloat(accountAmountCNY).toFixed(2);
        accountNumberCNY = data[0].accountNumber;
        $("#amount-CNY").text("￥" + accountAmountCNY);
        var accountAmountJF = data[1].amount;
        accountAmountJF = (accountAmountJF / 1000).toString();
        accountAmountCNY = accountAmountJF.replace(/(\.\d\d)\d+/ig, "$1");
        accountAmountJF = parseFloat(accountAmountJF).toFixed(2);
        accountNumberJF = data[1].accountNumber;
        $("#amount-JF").text("￥" + accountAmountJF);
        var accountAmountJYZ = data[2].amount;
        accountAmountJYZ = (accountAmountJYZ / 1000).toString();
        accountAmountJYZ = accountAmountJYZ.replace(/(\.\d\d)\d+/ig, "$1");
        accountAmountJYZ = parseFloat(accountAmountJYZ).toFixed(2);
        accountNumberJYZ = data[2].accountNumber;
        $("#amount-JYZ").text("￥" + accountAmountJYZ);
    });

    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER + "_TG"
        }
    }).then(function(data) {
        var accountAmount = data[0].amount;
        accountAmount = (accountAmount / 1000).toString();
        accountAmount = accountAmount.replace(/(\.\d\d)\d+/ig, "$1");
        accountAmount = parseFloat(accountAmount).toFixed(2);
        $("#amount-TG").text("￥" + accountAmount);
        accountNumberTG = data[0].accountNumber;
    });

    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    })

    $("#JFls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberJF;
    })
    $("#JYZ-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberJYZ;
    })
    $("#accoutGrantBtn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberTG;
    })
    $("#accouBtn").click(function() {
        window.location.href = 'account_enchashment.html?accountNumber=' + accountNumberTG;
    });

});