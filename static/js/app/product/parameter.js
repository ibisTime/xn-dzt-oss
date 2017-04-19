$(function() {
    var typeKind = {
        "80支棉": "80支棉",
        "100支棉": "100支棉",
        "棉真丝": "棉真丝",
        "棉弹力": "棉弹力"
    };

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "产品",
        field: "name",

    }, {
        title: "type",
        field: "type",
        type: 'select',
        search: true,
        data: typeKind
    }, {
        field: 'parentCode',
        title: 'key',
        type: "select",
        key: "measure",
        formatter: Dict.getNameForList("measure"),
        search: true
    }, {
        field: 'pic',
        title: '图片',
        formatter: function(v, data) {
            return v && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + v + '" >' || "-"
        }
    }, {
        field: 'orderNo',
        title: '次序'
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        router: 'parameter',
        columns: columns,
        pageCode: '620055',

    });

});