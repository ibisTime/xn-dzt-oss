$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "名称",
        field: "name",
        search: true
    }, {
        title: "价格",
        field: "price",
        formatter: moneyFormat
    }, {
        field: 'pic',
        title: '图片',
        formatter: function(v, data) {
            return '<img  style="width:40px;height:40px" src=' + OSS.picBaseUrl + '/' + v + ' >'
        }
    }, {
        title: "创建时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "最后修改人",
        field: "updater"
    }, {
        field: 'updateDatetime',
        title: '最后修改时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'product',
        columns: columns,
        pageCode: '620005',

    });

});