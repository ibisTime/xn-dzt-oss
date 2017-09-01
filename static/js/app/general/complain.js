$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'commentMobile',
        title: '留言人',
        formatter: function(v, data) {
            if (v) {
                return v
            } else if (data.commentName) {
                return data.commentName
            } else if (data.commenter == "0") {
                return "平台"
            }
        }
    }, {
        field: "content",
        title: "内容",
        type: "textarea"
    }, {
        title: "接收人",
        field: "receiveMobile",
        formatter: function(v, data) {
            if (v) {
                return v
            } else if (data.receiveName) {
                return data.receiveName
            } else if (data.receiver == "0") {
                return "平台"
            }
        }
    }];

    buildList({
        columns: columns,
        pageCode: '620148', //B 
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
        window.location.href = './complain_addedit.html?code=' + selRecords[0].code + "&commenter=" + selRecords[0].commenter + "&commenter=" + selRecords[0].commenter;

    });
});