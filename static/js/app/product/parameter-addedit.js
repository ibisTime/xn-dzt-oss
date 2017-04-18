$(function() {

    var code = getQueryString('code');

    var fields = [{
        title: "名称",
        field: "name",
        maxlength: 255,
        required: true,
    }, {
        title: "key",
        field: "parentCode",
        type: 'select',
        key: "product_parent",
        required: true,
    }, {
        field: 'type',
        title: '类型',
        type: "select",
        required: true
    }, {
        field: 'pic',
        title: '图片',
        type: "img",
        required: true
    }, {
        field: 'orderNo',
        title: '顺序',
        type: "img",
        required: true
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true,
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: "620056",
        editCode: '620052'
    });

});