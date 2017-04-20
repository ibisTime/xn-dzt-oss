$(function() {
    var view = 1;

    reqApi({
        code: '802503',
        json: {
            userId: sessionStorage.getItem('userId')
        }
    }).done(function(data) {
        $("#amount-CNY").text("￥" + data[0].amount / 1000);
    });


    $("#accouBtn").click(
        function() {
            window.location.href = 'account_quxian.html'
        }
    );
    $("#accoutBtn").click(
        function() {
            window.location.href = 'account_detail.html'
        }
    );

});