$(function() {

    var code = getQueryString('code');
    var typeKind = {
        "1-2-1": "80支棉",
        "1-2-2": "100支棉",
        "1-2-3": "棉真丝",
        "1-2-4": "棉弹力"
    };

    var fields = [{
        title: "名称",
        field: "name",
        maxlength: 255,
        required: true,
    }, {
        title: "key",
        field: "parentCode",
        type: 'select',
        key: "measure",
        formatter: Dict.getNameForList("measure"),
        // key: "product_parent",
        required: true,
    }, {
        field: 'type',
        title: '类型',
        type: "select",
        data: typeKind
            // required: true
    }, {
        field: 'pic',
        title: '图片',
        type: "img",
        //required: true
    }, {
        field: 'orderNo',
        title: '顺序',
        number: true,
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: "620056",
        editCode: '620052'
    });

});