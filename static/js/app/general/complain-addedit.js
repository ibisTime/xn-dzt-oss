$(function() {
    // var commenter = getQueryString('commenter');
    // var commentData;
    // reqApi({
    //     code: '620149',
    //     json: {
    //         companyCode: OSS.company,
    //         type: "0",
    //         receiver: "0",
    //         commenter: commenter,
    //         limit: "100",
    //         start: "0"
    //     }
    // }).then(function(data) {
    //     commentData = data.list;
    //     console.log(commentData);

    // });
    var code = getQueryString('code');
    var view = getQueryString('v');
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
            } else {
                return data.commenter
            }
        }
    }, {
        field: "content",
        title: "内容",
        type: "textarea"
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
        pageCode: '620149',
        searchParams: {
            companyCode: OSS.company,
            type: "0",
            receiver: "0",
            commenter: commenter
        },
        beforeDetail: function(data) {
            window.location.href = 'complain_read.html?code=' + data.code;
        }
    });
});