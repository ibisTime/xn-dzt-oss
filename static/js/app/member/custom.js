$(function() {
    var userKind = {
        "f1": "C端用户",
        "f2": "B端用户"
    }
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '姓名',
        field: 'nickname',
        formatter: function(value, row, index) {
            return row['realName'] ? row['realName'] : value;
        },
        search: true
    }, {
        title: "辖区",
        field: "province2",
        // formatter: function(v, data) {
        //     var result = (data.province || "") + (data.city || "") + (data.area || "") + (data.address || "");
        //     return result || "-";
        // },
        afterSet: function(v, data) {
            if (view) {
                $('#province').html(data.province);
                data.city && $('#city').html(data.city);
                data.area && $('#area').html(data.area);
                data.address && $("#address").html(data.address);
            }
        },
    }, {
        title: "身份证号",
        field: "idNo",
    }, {
        title: '手机号',
        field: 'mobile',
        search: true
    }, {
        title: "分成比例",
        field: ""
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
        search: true
    }, {
        title: "加入时间",
        field: "",
        formatter: dateTimeFormat
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        router: 'custom',
        columns: columns,
        pageCode: '805054',
        searchParams: {
            kind: "f1"
        },
        // beforeSearch: function(json) {
        //     if ($("#kind").val() == "") {
        //         json.kind = "ff3";
        //     }
        // }
    });
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
    $('#inteBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "member_inte.html?userId=" + selRecords[0].userId;

    });

    $("#detail2Btn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "member_addedit.html?userId=" + selRecords[0].userId;

    });

    $("#streamBtn").remove();
});