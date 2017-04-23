$(function() {
    var code = getQueryString('userId');
    var view = !!getQueryString('v');
    //var userId = getQueryString('userId') || '';
    var province;
    var city;
    var area;
    reqApi({
        code: "805056",
        json: { userId: sessionStorage.getItem('userId') },
        sync: true
    }).then(function(data) {
        province = data.userExt.province;
        city = data.userExt.city;
        area = data.userExt.area;
    });



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
        field: "province",
        value: province,
        type: "hidden",
        required: true
    }, {
        field: "city",
        value: city,
        type: "hidden",
        required: true
    }, {
        field: "area",
        value: area,
        type: "hidden",
        required: true
    }, {
        field: "kind",
        value: 'f2',
        type: 'hidden',
        required: true
    }, mobileView, mobileEdit, {
        field: 'realName',
        title: "量体师姓名",
        maxlength: 32,
        required: true,
        readonly: view
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
                data.province = province;
                data.city = city;
                data.area = area;
                return data;
            } else {
                return data
            }
        }
    };

    buildDetail(options);
});