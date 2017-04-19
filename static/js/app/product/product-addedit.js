$(function() {

    var code = getQueryString('code');

    var fields = [{
        title: "名称",
        field: "name",
        maxlength: 255,
        required: true,
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true,
    }, {
        field: 'pic',
        title: '图片',
        type: "img",
        //required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: "620006",
        editCode: '620002'
    });

});