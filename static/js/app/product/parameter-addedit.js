$(function() {

    var code = getQueryString('code');
    var typeKind = {
        "80支棉": "80支棉",
        "100支棉": "100支棉",
        "棉真丝": "棉真丝",
        "棉弹力": "棉弹力"
    };

    // var typeSelect = {
    //     field: 'type',
    //     title: '类型',
    //     type: "select",
    //     data: typeKind
    // };
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
        required: true,
        // onChange: function(v, data) {
        //     if (v == "1-2") {
        //         typeSelect.hidden = false;
        //     } else { typeSelect.hidden = true }
        // }
    }, {
        field: 'orderNo',
        title: '顺序',
        number: true,
        required: true
    }, {
        field: 'pic',
        title: '图片',
        type: "img"
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: "620056",
        editCode: '620052'
    });

});