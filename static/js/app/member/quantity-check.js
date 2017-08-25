$(function() {
    var code = getQueryString('userId');
    var view = !!getQueryString('v');
    var mobileView = {
        field: 'mobile1',
        title: "登录名/手机号",
        readonly: true,
        formatter: function(v, data) {
            return data.mobile
        }
    };
    var mobileEdit = {
        field: 'mobile',
        title: "登录名/手机号",
        mobile: true,
        required: true
    };
    if (code) {
        mobileView.hidden = false;
        mobileEdit.hidden = true;
    } else {
        mobileView.hidden = true;
    }

    var fields = [{
        field: "userReferee",
        value: sessionStorage.getItem('userId'),
        type: "hidden",
        required: true
    }, {
        field: "kind",
        value: 'B',
        type: 'hidden',
        required: true
    }, mobileView, mobileEdit, {
        field: 'loginName',
        title: "量体师姓名",
        maxlength: 32,
        required: true,
        readonly: true
    }, {
        field: 'province1',
        title: '辖区',
        required: true,
        readonly: true,
        formatter: function(v, data) {
            if (code) {
                if (data.province == data.city && data.city == data.area) {
                    return data.province
                } else if (data.province == data.city && data.city != data.area) {
                    return data.province + data.area;
                } else {
                    return data.province + data.city + data.area
                }
            }
        }
    }, {
        field: 'idNo',
        idCard: true,
        title: '身份证号码',
        required: true,
        readonly: true
    }, {
        title: "审核人",
        field: "loginName",
        required: true,
        readonly: true,
        formatter: function() {
            return sessionStorage.getItem('loginName');
        }
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255,
        readonly: view
    }];

    var options = {
        fields: fields,
        code: code,
        code: {
            userId: code
        },
        detailCode: "805056",
        view: view,
    };
    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($("#divRate").val()) {
                var data = {};
                data['userId'] = code;
                data["approver"] = sessionStorage.getItem('loginName');
                data["approveResult"] = "1";
                data['divRate'] = $("#divRate").val();
                data['remark'] = $("#remark").val();
                reqApi({
                    code: "805044",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            } else {
                toastr.info("请填写分成比例");
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            var data = {};
            data['userId'] = code;
            data["approver"] = sessionStorage.getItem('loginName');
            data["approveResult"] = "0";
            data['divRate'] = $("#divRate").val();
            data['remark'] = $("#remark").val();
            reqApi({
                code: "805183",
                json: data
            }).done(function() {
                sucDetail();
            });
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail(options);
});