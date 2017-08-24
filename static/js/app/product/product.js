$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "类型",
        field: "type",
        type: "select",
        data: {
            "0": "衬衫",
            "1": "H+产品"
        },
        search: true
    }, {
        field: 'name',
        title: '名称'
    }, {
        title: "价格",
        field: "price",
        amount: true,
        formatter: moneyFormat
    }, {
        title: "面料损耗",
        field: "loss",
    }, {
        title: "加工费",
        field: "processFee",
        amount: true,
        formatter: moneyFormat,
    }, {
        title: "状态",
        field: "status",
        type: "select",
        data: {
            '0': "待上架",
            "1": "已上架",
            "2": "已下架"
        },
        search: true
    }, {
        title: "UI位置",
        field: "location",
        type: 'select',
        data: {
            "0": "普通",
            "1": "热门"
        },
        search: true
    }, {
        field: "orderNo",
        title: "UI次序"
    }, {
        title: "创建时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "最后修改人",
        field: "updater"
    }, {
        field: 'updateDatetime',
        title: '最后修改时间',
        formatter: dateTimeFormat
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        router: 'product',
        columns: columns,
        pageCode: '620010',
        beforeDelete: function(data) {
            if (data.status != 0) {
                toastr.warning("只有草稿状态，才可以删除");
                return;
            }
            confirm("确定删除？").then(function() {
                reqApi({
                    code: '620001',
                    json: { "code": data.code }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        },
        beforeEdit: function(data) {
            if (data.status == 1) {
                toastr.warning("上架中不可修改");
                return;
            }
            window.location.href = "product_addedit.html?code=" + data.code;
        }
    });
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0 || selRecords[0].status == 2) {
            window.location.href = "product_up.html?code=" + selRecords[0].code;
        } else {
            toastr.warning('不是可以上架的状态');
            return;
        }

    });
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            confirm("确定下架？").then(function() {
                reqApi({
                    code: '620004',
                    json: { "code": selRecords[0].code, updater: getUserName(), remark: "下架" }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});

        } else {
            toastr.warning('不是可以下架的状态');
            return;
        }

    });

});