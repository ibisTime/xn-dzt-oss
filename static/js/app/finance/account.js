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
      
        accountNumberCNY = data[0].accountNumber;
        $("#amount-CNY").text("￥" + monenyFormat(data[0].amount);
        accountNumberJF = data[1].accountNumber;
        $("#amount-JF").text("￥" + moneyFormat(data[1].amount));
        accountNumberJYZ = data[2].accountNumber;
        $("#amount-JYZ").text("￥" + moneyFormat(data[2].amount));
    });

    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER + "_TG"
        }
    }).then(function(data) {
        $("#amount-TG").text("￥" + moneyFormat(data[0].amount));
        accountNumberTG = data[0].accountNumber;
    });

    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    });

    $("#JFls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberJF;
    });
    $("#JYZ-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberJYZ;
    });
    $("#accoutGrantBtn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberTG;
    });
    $("#accouBtn").click(function() {
        window.location.href = 'account_enchashment.html?accountNumber=' + accountNumberTG;
    });

});