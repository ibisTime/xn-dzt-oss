$(function() {
    var userId = getQueryString('userId') || '';

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
        search: true
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'account_status',
        formatter: Dict.getNameForList('account_status'),
        search: true
    }, {
        field: 'amount',
        title: '余额',
        formatter: moneyFormat
    }, {
        field: 'frozenAmount',
        title: '冻结金额',
        formatter: moneyFormat
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'account',
        columns: columns,
        pageCode: '802503',
        searchParams: {
            currency: "CNY",
            userId: userId
        }
    });

    $('#addBtn').remove();
    $('#edit2Btn').remove();
    $('#rockBtn').remove();
    $('#activeBtn').remove();
    $('#achieveBtn').remove();
    $('#accountBtn').remove();
    $('#orderBtn').remove();
    $("#cheBtn").remove();
     $("#rateBtn").remove();
    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "lengder.html?accountNumber=" + selRecords[0].accountNumber;
    });
});