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
        field: 'applyName',
        title: '下单用户',
        search: true
    }, {
        title: "订单状态",
        field: "status",
        type: "select",
        key: "order_status",
        data: {
            "1": "待量体",
            "2": "已定价",
            "3": "已支付",
            "4": "待复核",
            "5": "待生产",
            "6": "生产中",
            "7": "已发货",
            "8": "已收货",
            "9": '已取消'
        },
        formatter: Dict.getNameForList("order_status"),
        search: true
    }, {
        title: "联系方式",
        field: "applyMobile"
    }, {
        field: 'ltDatetime',
        title: '预约量体时间',
        formatter: dateFormat
    }, {
        title: "量体师",
        field: "ltUser",
        formatter: function(v, data) {
            if (data.ltUserDO) {
                return data.ltUserDO.realName
            } else {
                return "-"
            }
        }
    }, {
        title: "订单金额",
        field: "amount",
        formatter: moneyFormat
    }, {
        title: "量体嘱咐",
        field: 'applyNote'
    }, {
        title: "备注",
        field: "remark"
    }];

    buildList({
        router: 'order',
        columns: columns,
        pageCode: '620230',
        searchParams: {
            ltUser: sessionStorage.getItem('userId'),
            statusList: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        },
        beforeDetail: function(data) {
            window.location.href = '../product/orderSearch_addedit.html?code=' + data.code;
        }
    });

    //定价
    $("#priceBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 1) {
            toastr.info("不是代定价的状态");
            return;
        }
        window.location.href = '../product/order_price.html?code=' + selRecords[0].code;
    });


    //数据录入
    $("#shuBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 3) {
            toastr.info("不是可以数据录入的状态");
            return;
        }
        if (selRecords[0].type == 1) {
            window.location.href = '../product/order_shujuH+.html?code=' + selRecords[0].code;
        } else {
            window.location.href = '../product/order_shuju.html?code=' + selRecords[0].code;
        }

    });

    //提交复核
    $("#tijiaoBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 3) {
            toastr.info("不是可以提交复核的状态");
            return;
        }

        window.location.href = '../product/order_tijiao.html?code=' + selRecords[0].code;
    });

});