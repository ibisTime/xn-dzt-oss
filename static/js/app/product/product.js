$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "名称",
        field: "",
        search: true
    }, {
        title: "价格",
        field: "",
        formatter: moneyFormat
    }, {
        field: 'pic',
        title: '图片'
    }, {
        title: "创建时间",
        field: "",
        formatter: dateTimeFormat
    }, {
        field: '',
        title: '最后修改时间',
        formatter: dateTimeFormat
    }, {
        title: "最后修改人",
        field: "updater"
    }];
    buildList({
        router: 'product',
        columns: columns,
        pageCode: '',

    });

});