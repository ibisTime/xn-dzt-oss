$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: '订单号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code
        },
        readonly: true
    }, {
        title: "购买产品",
        field: "changpin",
        formatter: function(v, data) {
            if (data.product) {
                return data.product.modelName
            }
        },
        readonly: true
    }, {
        title: '状态',
        field: 'status',
        key: "order_status",
        formatter: Dict.getNameForList("order_status"),
        readonly: true
    }, {
        title: '下单人',
        field: 'applyName',
        readonly: true
    }, {
        title: '联系方式',
        field: 'applyMobile',
        readonly: true
    }, {
        title: '量体地址',
        field: 'province1',
        formatter: function(v, data) {
            var result = (data.ltProvince || "") + (data.ltCity || "") + (data.ltArea || "") + (data.ltAddress || "");
            return result || "-";
        },
        readonly: true
    }, {
        title: '量体时间',
        field: 'ltDatetime',
        formatter: dateFormat,
        readonly: true
    }, {
        title: "量体师",
        field: "ltUser",
        readonly: true,
        formatter: function(v, data) {
            if (data.ltUserDO) {
                return data.ltUserDO.realName
            } else {
                return "-"
            }
        },
    }, {
        title: '价格',
        field: "amount",
        formatter: moneyFormat,
        readonly: true
    }, {
        title: "收件人姓名",
        field: "receiver",
        type: "select",
        readonly: true
    }, {
        title: "收件人联系方式",
        field: 'reMobile',
        readonly: true
    }, {
        title: "收件人地址",
        field: "reAddress",
        readonly: true
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '620231'
    };

    options.buttons = [{
        title: '确定',
        handler: function() {
            if ($('#jsForm1').valid()) {
                var data = {};
                data['orderCode'] = code;
                data['remark'] = $("#remark").val();
                reqApi({
                    code: "620206",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail(options);
    var productSpecs;
    var orderSizeData;
    var productVarList;
    reqApi({
        code: "620231",
        json: { code },
        sync: true
    }).then(function(data) {
        if (data.orderSizeData && data.orderSizeData.length) {
            orderSizeData = data.orderSizeData;
            var html1 = '',
                html2 = '';
            for (var i = 0, length = orderSizeData.length; i < length; i++) {
                if (orderSizeData[i].ckey.indexOf("4") == 0) {
                    html2 += '<div class="item-tab tab-input item-tab-fl">' +
                        '<span clas="span_left">' + orderSizeData[i].cvalue + "：" + '</span>' +
                        '<div class="case">' + orderSizeData[i].dvalue + '</div>' +
                        '</div>';
                } else if (orderSizeData[i].ckey.indexOf("6-02") != -1) {
                    html1 += '<div class="item-tab tab-input item-tab-fl">' +
                        '<span clas="span_left">' + orderSizeData[i].cvalue + "(cm)：" + '</span>' +
                        '<div class="case">' + orderSizeData[i].dkey + '</div>' +
                        '</div>';
                } else if (orderSizeData[i].ckey.indexOf("6-03") != -1) {
                    html1 += '<div class="item-tab tab-input item-tab-fl">' +
                        '<span clas="span_left">' + orderSizeData[i].cvalue + "(kg)：" + '</span>' +
                        '<div class="case">' + orderSizeData[i].dkey + '</div>' +
                        '</div>';
                } else if (orderSizeData[i].ckey.indexOf("6") != 0) {
                    html1 += '<div class="item-tab tab-input item-tab-fl">' +
                        '<span clas="span_left">' + orderSizeData[i].cvalue + "：" + '</span>' +
                        '<div class="case">' + orderSizeData[i].dkey + '</div>' +
                        '</div>';
                }
            }
            $('#ltsj').html(html1);
            $('#ttsj').html(html2);
        }
        if (data.product) {
            if (data.product.productVarList && data.product.productVarList.length) {
                productVarList = data.product.productVarList;
                var tabTitileHtml = "";

                for (var i = 0; i < productVarList.length; i++) {
                    var tabContent = "";
                    var productCategory = productVarList[i].productCategory;
                    var productSpecs = productVarList[i].productSpecs;
                    tabTitileHtml += '<span class="tabTitle">' + productVarList[i].name + '</span>';
                    for (var j = 0; j < productCategory.length; j++) {
                        if (productCategory[j].productCraft) {
                            tabContent += '<div class="item-tab"><span>' + productCategory[j].dvalue + "：" + '</span>' +
                                '<div class="case caseimg"> ' + (productCategory[j].productCraft && productCategory[j].productCraft.name || '') + '</div></div>';
                        }
                    }
                    tabContent = '<div class="item-tab"><span>面料：</span>' +
                        '<div class="case caseimg">' + productSpecs[0].modelNum + '</div></div>' + tabContent;
                    $('#content').append('<div class="form-tab">' + tabContent + '</div>');
                }
                $("#navUl").append(tabTitileHtml);
                // 头部tab切换
                $("#navUl").on("click", "span", function() {
                    var self = $(this),
                        index = self.index();
                    self.addClass("act")
                        .siblings("span.act").removeClass("act");
                    var tabs = $("#content").find('.form-tab');
                    tabs.eq(index).addClass("act")
                        .siblings(".act").removeClass("act");
                }).find('span').eq(0).trigger('click');
            } else {
                $("#navUl").css("display", "none");
            }
        }
    });
});