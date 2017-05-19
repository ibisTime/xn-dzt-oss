$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
    }, {
        field: 'accountName',
        title: '户名',
        search: true
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormat
    }, {
        field: 'channelType',
        title: '支付渠道',
        type: 'select',
        key: 'channel_type',
        // keyCode: '802006',
        formatter: Dict.getNameForList('channel_type'),
        // search: true
    }, {
        field: 'payCardInfo',
        title: '开户行',
        type: "select",
        listCode: "802116",
        keyName: 'bankCode',
        valueName: 'bankName',
    }, {
        field: 'payCardNo',
        title: '银行卡号',
    }, {
        field: 'applyUser',
        title: '申请人',
        formatter: function(v, data) {
            if (data.user.kind == '01') {
                return data.user.loginName;
            } else {
                return data.user.mobile;
            }
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type1: 'date',
        field2: 'applyDateEnd',
        type2: 'date',
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        // keyCode: '802006',
        formatter: Dict.getNameForList('withdraw_status'),
        search: true
    }, {
        field1: 'approveDateStart',
        title1: '审核日期',
        type1: 'date',
        field2: 'approveDateEnd',
        type2: 'date',
        search: true,
        visible: false
    }, {
        field: 'approveUser',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802755',
        // singleSelect: false,
        searchParams: {
            channelType: '90',
            companyCode: OSS.companyCode
        }
    });

    $("#detaBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        location.href = "access_check.html?code=" + selRecords[0].code + "&detail=1";
    });

    $("#huiluBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length == 1 && selRecords[0].status == 3) {

            window.location.href = "access_huilu.html?code=" + selRecords[0].code;
        } else {

            var dataCode = []

            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)

                if (selRecords[i].status != 3) {
                    toastr.info(selRecords[i].code + "状态不能回录!");
                    return;
                }

            }

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量回录</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                fields: [{
                    field: 'payNote',
                    title: '回录说明',
                    required: true,
                    maxlength: 250
                }],
                buttons: [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.codeList = dataCode;
                        data.payResult = "1";
                        data.payUser = getUserName();
                        reqApi({
                            code: '802753',
                            json: data
                        }).done(function(data) {
                            toastr.info("操作成功");

                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                            setTimeout(function() {
                                dw.close().remove();
                            }, 500)
                        });

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        var data = [];
                        data.codeList = dataCode;
                        data.payResult = '1';
                        data.payUser = getUserName();
                        reqApi({
                            code: '802753',
                            json: data
                        }).done(function(data) {
                            toastr.info("操作成功");
                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                            setTimeout(function() {
                                dw.close().remove();
                            }, 500)
                        });
                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });

            dw.__center();
        }

    });

    //审核
    $('#cheBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length == 1 && selRecords[0].status == 1) {

            window.location.href = "access_check.html?Code=" + selRecords[0].code;
        } else {

            var dataCode = []

            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)

                if (selRecords[i].status != 1) {
                    toastr.info(selRecords[i].code + "状态不能审核!");
                    return;
                }

            }

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量审核</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                fields: [{
                    field: 'approveNote',
                    title: '审核意见',
                    required: true,
                    maxlength: 250
                }],
                buttons: [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.codeList = dataCode;
                        data.approveResult = "1";
                        data.approveUser = getUserName();
                        reqApi({
                            code: '802752',
                            json: data
                        }).done(function(data) {
                            toastr.info("操作成功");

                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                            setTimeout(function() {
                                dw.close().remove();
                            }, 500)
                        });

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        var data = [];
                        data.codeList = dataCode;
                        data.approveResult = "1";
                        data.approveUser = getUserName();
                        reqApi({
                            code: '802752',
                            json: data
                        }).done(function(data) {
                            toastr.info("操作成功");
                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                            setTimeout(function() {
                                dw.close().remove();
                            }, 500)
                        });
                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });

            dw.__center();
        }

    });
});