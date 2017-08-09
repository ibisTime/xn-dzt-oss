$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '登录名/手机号',
        field: 'mobile'
    }, {
        title: '姓名',
        field: 'realName',
        search: true
    }, {
        title: "辖区",
        field: "province2",
        formatter: function(v, data) {
            if (data.userExt.province == data.userExt.city && data.userExt.city == data.userExt.area) {
                data.userExt.city = "";
                data.userExt.area = "";
            } else if (data.userExt.province == data.userExt.city && data.userExt.city != data.userExt.area) {
                data.userExt.city = '';
            }
            var result = (data.userExt.province || "") + (data.userExt.city || "") + (data.userExt.area || "") + (data.userExt.address || "");
            return result || "-";
        }
    }, {
        title: "身份证号",
        field: "idNo",
    }, {
        title: "分成比例",
        field: "divRate"
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
        search: true
    }, {
        field: 'createDatetime',
        title: '加入时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'quantity',
        columns: columns,
        pageCode: '805054',
        searchParams: {
            kind: "f2"
        },
        beforeDetail: function(data) {
            window.location.href = "quantity_addedit.html?v=1&userId=" + data.userId;
        },
        beforeEdit: function(data) {
            window.location.href = "quantity_addedit.html?userId=" + data.userId;
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
            toastr.info("该账户已被注销");
            return;
        }
        var status = selRecords[0].status,
            toStatus;
        status == 0 ? toStatus = 2 : toStatus = 0;
        confirm("确定注销该账户？").then(function() {
            reqApi({
                code: '805052',
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
            toastr.info("该账户是已正常状态");
            return;
        }
        confirm("确定激活该账户？").then(function() {
            reqApi({
                code: '805052',
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
    //业绩
    $("#achieveBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "quantity_achieve.html?userId=" + selRecords[0].userId;
    });
    //账户
    $("#accountBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "account.html?userId=" + selRecords[0].userId;
    });
    //审核
    $('#cheBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 3) {
            toastr.info("不是可以审核的状态");
            return;
        }
        window.location.href = "quantity_check.html?userId=" + selRecords[0].userId;

    });
    //修改分成比例
    $('#rateBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "quantity_rate.html?userId=" + selRecords[0].userId;

    });
});