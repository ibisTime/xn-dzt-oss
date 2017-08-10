$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var statusList = {
        "0": "待付款",
        "1": "付款成功",
        "4": "申请退款",
        "2": "用户取消订单",
        "3": "平台取消订单",
        "5": "退款成功",
        "6": "退款失败",
        "7": "活动开始",
        "8": "已完成"
    };
    var start = {
        elem: '#startDatetime',
        format: 'YYYY-MM-DD',
        min: laydate.now(), //设定最小日期为当前日期
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateFormat(d);
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#endDatetime',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateFormat(d);
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };

    var fields = [{
        field: 'updater',
        type: 'hidden',
        value: getUserName()
    }, {
        title: '标题',
        field: 'title',
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: '缩略图',
        field: 'pic',
        type: 'img',
        required: true,
        readonly: view
    }, {
        title: "广告图",
        field: "advPic",
        type: 'img',
        required: true,
        readonly: view
    }, {
        title: "广告语",
        field: "slogan",
        required: true,
        readonly: view,
        maxlength: 255
    }, {
        title: '单价',
        field: 'amount',
        required: true,
        amount: true,
        readonly: view
    }, {
        title: "联系方式",
        field: "contact",
        tm: true,
        readonly: view,
        required: true
    }, {
        title: "总人数",
        field: "totalNum",
        number: true,
        readonly: view,
        required: true
    }, {
        title: '图文详述',
        field: 'description',
        required: true,
        type: 'textarea',
        readonly: view
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 255,
        readonly: view
    }];
    var viewList = [{
        title: "剩余人数",
        field: "remainNum",
        readonly: true,
    }, {
        field: 'status',
        title: '状态',
        readonly: true,
        type: 'select',
        data: {
            "0": "草稿",
            "1": "上架",
            "2": "下架",
        }
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data: {
            "1": "热门",
            "0": "普通"
        },
        readonly: true
    }, {
        field: 'orderNo',
        title: 'UI次序',
        number: true,
        readonly: true
    }, ]
    if (view) {
        fields = fields.concat(viewList)
    }

    buildDetail({
        fields: fields,
        code: code,
        detailCode: ' ',
        addCode: ' ',
        editCode: ' ',
        view: view
    });

});