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
        title: "所属产品",
        field: "modelCode",
        formatter: function(v, data) {
            return data.model.name
        },
        type: "select",
        listCode: "620007",
        keyName: "code",
        valueName: 'name',
        searchName: 'name',
        search: true
    }, {
        field: 'parentCode',
        title: '栏目项',
        type: "select",
        key: "measure",
        formatter: Dict.getNameForList("measure"),
        search: true
    }, {
        title: "栏目值",
        field: "name",

    }, {
        title: "类型",
        field: "type",
        type: 'select',
        search: true,
        data: typeKind
    }, {
        field: 'pic',
        title: '图片',
        formatter: function(v, data) {
            return v && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + v + '" >' || "-"
        }
    }, {
        field: 'orderNo',
        title: '次序'
    }];
    buildList({
        router: 'parameter',
        columns: columns,
        pageCode: '620055',

    });

});