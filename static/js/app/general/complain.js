$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'receiver',
        title: '接收人',
        search: true
    }, {
        field: "content",
        title: "内容"
    }, {
        field: 'commenter',
        title: '留言人',
        search: true
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
        },
        deleteCode: "620142"
            // beforeDelete: function(data) {
            //     if (data.status != 0) {
            //         toastr.warning("该活动不是可以删除的状态");
            //         return;
            //     }
            //     confirm("确认是否删除该记录？").then(function() {
            //         reqApi({
            //             code: '',
            //             json: data
            //         }).done(function(data) {
            //             sucList();
            //         });
            //     });
            // }
    });
    //阅读
    $('#readBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            window.location.href = "complain_read.html?code=" + selRecords[0].code;
        } else {
            toastr.warning('该留言是已读的状态');
            return;
        }

    });
    //回复
    $('#replyBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = './complain_addedit.html?commenter=' + selRecords[0].commenter;

    });
});