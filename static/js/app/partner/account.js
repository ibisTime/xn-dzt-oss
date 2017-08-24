$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberJYZ;
    reqApi({
        code: '802503',
        json: {
            userId: sessionStorage.getItem('userId')
        }
    }).done(function(data) {
        $("#amount-CNY").text("￥" + (data[0].amount / 1000).toFixed(2));
        accountNumberCNY = data[0].accountNumber;
        $("#amount-JF").text("￥" + (data[1].amount / 1000).toFixed(2));
        accountNumberJF = data[1].accountNumber;
        $("#amount-JYZ").text("￥" + (data[2].amount / 1000).toFixed(2));
        accountNumberJYZ = data[2].accountNumber;
    });


    $("#accouBtn").click(function() {
        window.location.href = 'account_quxian.html?accountNumber=' + accountNumberCNY;
    });
    $("#accoutBtn").click(function() {
        window.location.href = '../finance/ledger.html?accountNumber=' + accountNumberCNY;
    });
    $("#accoutJYZBtn").click(function() {
        location.href = '../finance/ledger.html?accountNumber=' + accountNumberJYZ;
    })

    $("#accoutJFBtn").click(function() {
        window.location.href = '../finance/ledger.html?accountNumber=' + accountNumberJF;
    });

});