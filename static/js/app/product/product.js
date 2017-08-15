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
        field: 'pic',
        title: '图片',
        formatter: function(v, data) {
            return '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + v + '" >'
        }
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
        title: "备注",
        field: "remark"
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
    }];
    buildList({
        router: 'product',
        columns: columns,
        pageCode: '620010',
        deleteCode: '620002'
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