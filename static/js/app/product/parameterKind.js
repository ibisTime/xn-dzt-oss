$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "所属规格",
        field: "modelCode",
        type: "select",
        listCode: "620287",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        search: true
    }, {
        field: 'dkey',
        title: '参数键'
    }, {
        field: 'dvalue',
        title: '参数值'
    }, {
        field: 'updater',
        title: '更新人'
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '620255',
        deleteCode: '620251',
        searchParams: {
            companyCode: OSS.companyCode
                // orderColumn: "code",
                // orderDir: "asc"
        }
    });
});