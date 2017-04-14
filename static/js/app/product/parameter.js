$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "产品",
        field: "",

    }, {
        title: "type",
        field: "",
        type: "select",
        key: "",
        formatter: Dict.getNameForList(""),
        search: true
    }, {
        field: 'key',
        title: '父名称',
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
        pageCode: '',

    });

});