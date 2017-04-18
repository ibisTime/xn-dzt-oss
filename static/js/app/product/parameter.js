$(function() {

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
        type: "select",
        key: "m_type",
        formatter: Dict.getNameForList("m_type"),
        search: true
    }, {
        field: 'parentCode',
        title: 'key',
        type: "select",
        key: "product_parent",
        formatter: Dict.getNameForList("product_parent"),
        search: true
    }, {
        field: 'pic',
        title: '图片'
    }, {
        field: '',
        title: '文字'
    }, {
        field: '',
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