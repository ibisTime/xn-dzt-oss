$(function() {
    var commenter = getQueryString('commenter');
    var commentData = {};
    reqApi({
        code: '620149',
        json: {
            companyCode: OSS.company,
            type: "0",
            receiver: "0",
            commenter: commenter,
            limit: "100",
            start: "0"
        },
        sync: true
    }).then(function(data) {
        commentData = data.list;
        console.log(commentData);
        console.log(commentData[0].commentName);
        for (var i = 0, length = commentData.length; i < length; i++) {
            if (commentData[i].commenter != "0") {
                console.log(commentData[0].commentName);
                $("#commentName").text(commentData[i].commentMobile + "：");
                $("#content").text(commentData[i].content);
            } else {
                // $("")
            }
        }

    })


});