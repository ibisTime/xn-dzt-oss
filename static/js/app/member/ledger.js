$(function() {
    var accountNumber = getQueryString('accountNumber') || '';
    var kind = getQueryString('kind') || "";
    var bizTypeDictArr = Dict.getName2('biz_type');
    var bizTypeDict = {};
    for(var i = 0; i < bizTypeDictArr.length; i++) {
        bizTypeDict[bizTypeDictArr[i].dkey] = bizTypeDictArr[i].dvalue;
    }

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: "realName",
            title: "用户名"
        },
        {
            field: 'channelType',
            title: '渠道类型',
            type: "select",
            key: "channel_type",
            formatter: Dict.getNameForList('channel_type'),
            search: true,
        }, {
            field: 'bizType',
            title: '业务类型',
            data: bizTypeDict,
            search: true,
            type: 'select'
        }, {
            field: 'status',
            title: '流水状态',
            type: 'select',
            key: "jour_status",
            formatter: Dict.getNameForList("jour_status"),
            search: true
        }, {
            field: 'transAmount',
            title: '变动金额',
            formatter: moneyFormat
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }, {
            field: 'bizNote',
            title: "备注"
        }
    ];

    buildList({
        columns: columns,
        pageCode: '802520',
        searchParams: {
            accountNumber: accountNumber,
            companyCode: OSS.companyCode
        }
    });

    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        goBack();
    });

});