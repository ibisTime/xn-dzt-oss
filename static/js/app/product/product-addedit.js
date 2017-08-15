$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: "类型",
        field: "type",
        type: "select",
        data: {
            "0": "衬衫",
            "1": "H+产品"
        },
        required: true,
        formatter: function(v, data) {
            if (data.type == 1) {
                $("#price").parent().css("display", "none");
            } else if (data.type == 0) {
                $("#processFee").parent().css("display", "none");
                $("#loss").parent().css("display", "none");
            }
        }
    }, {
        title: "广告图",
        field: "advPic",
        type: "img",
        required: true
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat,
        required: true,
    }, {
        title: "面料损耗",
        field: "loss",
        required: true
    }, {
        title: "加工费",
        field: "processFee",
        amount: true,
        formatter: moneyFormat,
        required: true,
    }, {
        title: "图文详述",
        field: "description",
        type: "textarea",
        required: true
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: "620000",
        detailCode: "620011",
        editCode: '620001'
    });

});