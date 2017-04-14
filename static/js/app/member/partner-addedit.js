$(function() {
    var code = getQueryString('userId');
    var view = !!getQueryString('v');
    // var userId = getQueryString('userId');

    var fields = [{
            field: "kind",
            value: "11",
            type: "hidden",
            required: true
        },
        {
            field: 'loginName',
            title: "合伙人姓名",
            maxlength: 32,
            required: true,
            readonly: view
        }, {
            field: 'province1',
            title: '辖区',
            required: true,
            type: 'citySelect',
            // readonly: view,
            // formatter: function(v, data) {
            //     var result = (data.demand.province || "") + (data.demand.city || "") + (data.demand.area || "") + (data.demand.address || "");
            //     return result || "-";
            // },
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
                }
            },
        }, {
            field: 'mobile',
            title: '联系方式',
            mobile: true,
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
            field: "divideRate",
            required: true,
            readonly: view
        }
    ];

    var options = {
        fields: fields,
        code: {
            userId: code
        },
        addCode: '805180',
        editCode: "805181",
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