$(function() {
    var code = getQueryString('userId');
    var view = !!getQueryString('v');
    //var userId = getQueryString('userId') || '';

    var fields = [{
        field: "userReferee",
        value: sessionStorage.getItem('userId'),
        type: "hidden",
        required: true
    }, {
        field: "kind",
        value: 'f2',
        type: 'hidden',
        required: true
    }, {
        field: 'mobile',
        title: '登录名/手机号',
        mobile: true,
        required: true,
        // readonly: true
    }, {
        field: 'realName',
        title: "量体师姓名",
        maxlength: 32,
        required: true,
        readonly: view
    }, {
        field: 'province1',
        title: '辖区',
        required: true,
        type: "citySelect",
        readonly: view,
        afterSet: function(v, data) {
            if (code) {
                if (data.userExt.province == data.userExt.city && data.userExt.city == data.userExt.area) {
                    data.userExt.city = "";
                    data.userExt.area = "";
                } else if (data.userExt.province == data.userExt.city && data.userExt.city != data.userExt.area) {
                    data.userExt.city = data.userExt.area;
                }
                $('#province').val(data.userExt.province);
                $("#province").trigger("change");
                data.userExt.city && $('#city').val(data.userExt.city);
                data.userExt.area && $('#area').val(data.userExt.area);
                data.userExt.city ? $('#city').trigger('change') : $('#province').trigger('change');
                data.userExt.area && $('#area').val(data.userExt.area);
            }
        }
    }, {
        field: 'idNo',
        idCard: true,
        title: '身份证号码',
        required: true,
        readonly: view
    }, {
        title: "分成比例",
        field: "divRate",
        required: true,
        readonly: view
    }];

    var options = {
        fields: fields,
        code: code,
        code: {
            userId: code
        },
        addCode: '805042',
        editCode: "805182",
        detailCode: "805056",
        view: view,
        beforeSubmit: function(data) {
            if (code) {
                data.userId = code;
                return data;
            } else {
                return data
            }
        }
    };

    buildDetail(options);
});