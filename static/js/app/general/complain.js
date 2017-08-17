$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'commenter',
        title: '留言人'
    }, {
        field: "content",
        title: "内容"
    }, {
        field: 'status',
        title: '状态',
        search: true,
        type: 'select',
        data: {
            "0": "未读",
            "1": "已读"
        }
    }, {
        title: '备注',
        field: 'remark'
    }];

    buildList({
        columns: columns,
        pageCode: '620145',
        searchParams: {
            companyCode: OSS.company,
            type: "0",
            receiver: "0"
        },
        beforeDetail: function(data) {
            window.location.href = 'complain_read.html?code=' + data.code;
        }
    });
    //回复
    $('#replyBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = './complain_addedit.html?code=' + selRecords[0].code + "&commenter=" + selRecords[0].commenter;

    });
});