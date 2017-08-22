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
        title: '下单用户',
        search: true
    }, {
        title: '量体师',
        field: "ltName",
        search: true,
        visible: false
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
        field: "applyNote"
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({

        columns: columns,
        pageCode: '620230',
        searchParams: {
            toUser: sessionStorage.getItem('userId'),
            companyCode: OSS.companyCode,
            statusList: ["10", "11"]
        },
        beforeDetail: function(data) {
            window.location.href = '../product/orderSearch_addedit.html?code=' + data.code;
        }

    });


});