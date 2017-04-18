$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "订单编号",
        field: "code",
        search: true
    }, {
        title: "订单状态",
        field: "status",
        type: "select",
        key: "order_status",
        formatter: Dict.getNameForList("order_status"),
        search: true
    }, {
        field: 'applyName',
        title: '下单用户'
    }, {
        title: "联系方式",
        field: "applyMobile"
    }, {
        field: 'ltDatetime',
        title: '预约量体时间',
        formatter: dateTimeFormat
    }, {
        title: "量体师",
        field: "ltName"
    }, {
        title: "订单金额",
        field: "",
        formatter: moneyFormat
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        router: 'order',
        columns: columns,
        pageCode: '620220',

    });
    $("#rePurchaseBtn").click(function() {
        window.location.href = 'order_rePurchase.html';
    });
    $("#edit2Btn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = 'order_dispatch.html?code=' + selRecords[0].code;
    });
    $("#priceBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = 'order_price.html?code=' + selRecords[0].code;
    });
    $("#priceBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = 'order_price.html?code=' + selRecords[0].code;
    });
    $("#payBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = 'order_pay.html?code=' + selRecords[0].code;
    });

    $("#shuBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = 'order_shuju.html?code=' + selRecords[0].code;
    });
    $("#cheBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 4) {
            toastr.info("不是待审核状态");
            return;
        }
        window.location.href = 'order_partnerCheck.html?code=' + selRecords[0].code;
    });
    $("#subBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 5) {
            toastr.info("不是待提交生产状态");
            return;
        }
        window.location.href = 'order_submit.html?code=' + selRecords[0].code;
    });

    $("#sendBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 6) {
            toastr.info("不是待提交生产状态");
            return;
        }
        window.location.href = 'order_sendProduct.html?code=' + selRecords[0].code;
    });
    $("#receBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 7) {
            toastr.info("不是可以确认收货的状态");
            return;
        }
        window.location.href = 'order_receiveProduct.html?code=' + selRecords[0].code;
    });

    $("#calcelBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1 || selRecords[0].status == 2) {

            window.location.href = 'order_cancel.html?code=' + selRecords[0].code;
        } else {
            toastr.info("不是可以取消订单状态");
            return;
        }

    });

});