$(function() {
    var userId = getQueryString('userId');
    var view = 1;

    var fields = [{
        field: 'loginName',
        title: '登录名',
    }, {
        field: 'nickname',
        title: '微信昵称',
    }, {
        field: 'mobile',
        title: '手机号',
    }, {
        field: 'userRefereeMobile',
        title: '推荐人'
    }, {
        field: 'userRefereeKind',
        title: '推荐人类型',
        type: "select",
        data: {
            "B": "B端用户",
            "PA": "合伙人",
            "C": "C端用户"
        }
    }, {
        //     field: 'idKind',
        //     title: '证件类型',
        //     type: 'select',
        //     key: 'id_kind'
        // }, {
        //     field: 'idNo',
        //     title: '证件号',
        // }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
    }, {
        field: 'bankcardList',
        title: '银行卡信息',
        type: 'o2m',
        pageCode: '802015',
        o2mvalue: {
            'userId': userId
        },
        columns: [{
            field: 'realName',
            title: '真实名称',
        }, {
            field: 'bankcardNumber',
            title: '银行卡号',
        }, {
            field: 'bankName',
            title: '银行名称',
        }, {
            field: 'subbranch',
            title: '开户支行',
        }, {
            field: 'bindMobile',
            title: '预留手机号',
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }]
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        view: view,
        detailCode: '805121'
    });


});