$(function() {


    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            title: '姓名',
            field: 'loginName',
            // formatter: function(value, row, index) {
            //     return row['realName'] ? row['realName'] : value;
            // },
            search: true
        }, {
            title: "辖区",
            field: "province2",
            formatter: function(v, data) {
                var result = (data.userExt.province || "") + (data.userExt.city || "") + (data.userExt.area || "") + (data.userExt.address || "");
                return result || "-";
            }
        }, {
            title: "身份证号",
            field: "idNo",
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
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
        },
        // {
        //     title: "加入时间",
        //     field: "",
        //     formatter: dateTimeFormat
        // }, 
        {
            title: '备注',
            field: 'remark'
        }
    ];
    buildList({
        router: 'quantity',
        columns: columns,
        pageCode: '805054',
        searchParams: {
            kind: "f2"
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
    $("#edit2Btn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "partner_addedit.html?userId=" + selRecords[0].userId;

    });
    $("#achieveBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "quantity_achieve.html?userId=" + selRecords[0].userId;
    });
    $("#accountBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "account.html?userId=" + selRecords[0].userId;
    });
});