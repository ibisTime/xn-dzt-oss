$(function() {
    var accountNumberCNY;
    var kind = getQueryString('kind') || "";

    var accountAmount;
    reqApi({
        code: '802503',
        json: {
            userId: sessionStorage.getItem('userId')
        }
    }).done(function(data) {
        accountAmount = data[0].amount;
        accountAmount = (accountAmount / 1000).toString();
        accountAmount = accountAmount.replace(/(\.\d\d)\d+/ig, "$1");
        accountAmount = parseFloat(accountAmount).toFixed(2);
        $("#amount-CNY").text("￥" + accountAmount);
        accountNumberCNY = data[0].accountNumber;

    });


    $("#accouBtn").click(function() {
        window.location.href = 'account_quxian.html?accountNumber=' + accountNumberCNY + "&accountAmount=" + accountAmount + "&kind=" + kind;
    });

    $("#accoutBtn").click(function() {
        if (kind == "Bl") {
            window.location.href = '../finance/ledgerLT.html?accountNumber=' + accountNumberCNY;
        } else {
            window.location.href = '../finance/ledger.html?accountNumber=' + accountNumberCNY;
        }

    });

});