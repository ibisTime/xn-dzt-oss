$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "昵称",
        field: "nickname"
    }, {
        title: '手机号',
        field: 'mobile',
        search: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
        search: true
    }, {
        title: "注册时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        router: 'custom',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: "C",
            companyCode: OSS.companyCode
        },
        beforeDetail: function(data) {
            window.location.href = "custom_addedit.html?userId=" + data.userId;
        }
    });
    //注销
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 2) {
            toastr.warning("该账户已被注销");
            return;
        }
        var status = selRecords[0].status,
            toStatus;
        status == 0 ? toStatus = 2 : toStatus = 0;
        confirm("确定注销该账户？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: toStatus
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });

    });
    //激活
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            toastr.warning("该账户是已正常状态");
            return;
        }
        confirm("确定激活该账户？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '0'
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });
    });
    //账户
    $('#accountBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        window.location.href = "account.html?userId=" + selRecords[0].userId;

    });
});