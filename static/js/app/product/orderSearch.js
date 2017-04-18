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
        router: 'orderSearch',
        columns: columns,
        pageCode: '620220'
    });
});