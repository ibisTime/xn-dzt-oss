$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "订单编号",
        field: "code"
    }, {
        title: "订单编号",
        field: "codeForQuery",
        search: true,
        visible: false
    }, {
        field: 'applyName',
        title: '下单用户',
        search: true
    }, {
        title: "联系方式",
        field: "applyMobile"
    }, {
        field: 'ltDatetime',
        title: '预约量体时间',
        type: "date",
        formatter: dateFormat,
        search: true
    }, {
        title: "量体师",
        field: "ltUser",
        formatter: function(v, data) {
            if (data.ltUserDO) {
                return data.ltUserDO.realName
            } else {
                return "-"
            }
        }
    }, {
        title: "订单金额",
        field: "amount",
        formatter: moneyFormat
    }, {
        title: "订单状态",
        field: "status",
        type: "select",
        data: {
            "1": "待量体",
            "2": "已定价",
            "3": "已支付",
            "4": "待复核"
        },
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];

    buildList({
        router: 'order',
        columns: columns,
        pageCode: '620230',
        searchParams: {
            ltUser: sessionStorage.getItem('userId'),
            statusList: ["1", "2", "3", "4"]
        },
        beforeDetail: function(data) {
            window.location.href = '../product/orderSearch_addedit.html?code=' + data.code;
        },
        beforeSearch: function(data) {
            if (data.ltDatetime) {
                console.log(data.ltDatetime)
                data.ltDatetime = data.ltDatetime.concat(" 00:00:00")
                return data;
            } else {
                return data;
            }
        },
    });
    //取消
    $('#cancelBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">取消订单</li>' +
                '<li><label>*备注：</label><input id="remark" name="remark" class="control-def"></input></li>' +
                '<li><input id="subBtn" name="subBtn"type="button" class="btn margin-left-100 submit" value="确定"><li><input id="goBackBtn" name="goBackBtn" type="button" class=" btn margin-left-20 goBack" value="返回"></ul>' +
                '</form>'
        });
        dw.showModal();
        $(document).on('click', '#subBtn', function() {
            $('#popForm').validate({
                'rules': {
                    remark: {
                        required: true,
                        maxlength: 255
                    }
                }
            });
            if ($('#popForm').valid()) {
                var data = $('#popForm').serializeObject();
                data.orderCode = selRecords[0].code;
                data.remark = $("#remark").val();
                reqApi({
                    code: "620216",
                    json: data
                }).done(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                    setTimeout(function() {
                        dw.close().remove();
                    }, 500)
                });
            }
        });
        $(document).on('click', '#goBackBtn', function() {
            setTimeout(function() {
                dw.close().remove();
            }, 500)

        });
        dw.__center();
    });
    //定价
    $("#priceBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 1) {
            toastr.info("不是代定价的状态");
            return;
        }
        window.location.href = '../product/order_price.html?code=' + selRecords[0].code;
    });


    //数据录入
    $("#shuBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 3) {
            toastr.info("不是可以数据录入的状态");
            return;
        }
        if (selRecords[0].type == 1) {
            window.location.href = '../product/order_shujuH+.html?code=' + selRecords[0].code;
        } else {
            window.location.href = '../product/order_shuju.html?code=' + selRecords[0].code;
        }

    });

    //提交复核
    $("#tijiaoBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].checkOrder != 1) {
            toastr.warning("不是可以提交复核的状态");
            return;
        }

        window.location.href = '../product/order_tijiao.html?code=' + selRecords[0].code;
    });

});