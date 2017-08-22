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
        title: "联系方式",
        field: "applyMobile"
    }, {
        title: '量体师',
        field: "ltName",
        search: true,
        visible: false
    }, {
        title: "订单状态",
        field: "status",
        type: "select",
        data: {
            "10": "已归档",
            "11": "取消订单"
        },
        search: true
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
        title: "备注",
        field: "remark"
    }];
    buildList({
        router: 'orderSearch',
        columns: columns,
        pageCode: '620230',
        searchParams: { statusList: ["10", "11"] }
    });
});