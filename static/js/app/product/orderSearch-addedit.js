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
        },
        {
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
                if (data.ltProvince == data.ltCity && data.ltCity == data.ltArea) {
                    data.ltCity = "";
                    data.ltArea = "";
                } else if (data.ltProvince == data.ltCity && data.ltCity != data.ltArea) {
                    data.ltCity = '';
                }
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
            formatter: function(v, data) {
                if (data.ltUserDO) {
                    return data.ltUserDO.realName
                } else {
                    return "-"
                }
            },
            readonly: true
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
            field: 'orderCode',
            title: '发货单号',
            type: "hidden",
            value: code,
            readonly: true,
        }, {
            title: '物流公司',
            field: 'logisticsCompany',
            type: 'select',
            key: 'wl_company',
            readonly: true,
        }, {
            title: '物流单号',
            field: 'logisticsCode',
            readonly: true,
        }, {
            field: 'deliverer',
            title: '发货人',
            readonly: true,
        }, {
            field: 'deliveryDatetime',
            title: '发货时间',
            formatter: dateFormat,
            readonly: true,
        }, {
            field: 'pdf',
            title: '物流单',
            type: 'img',
            readonly: true
        }, {
            field: 'remark',
            title: '备注',
            maxlength: 255,
            readonly: true
        }, {
            title: "评价内容",
            field: "comment",
            readonly: true,
            formatter: function(v, data) {
                if (v) {
                    return v.content
                } else {
                    $("#comment").parent().css("display", "none");
                }
            }
        }
    ];

    var options = {
        fields: fields,
        code: code,
        detailCode: '620231'
    };

    options.buttons = [{
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
                        '<span clas="span_left">' + orderSizeData[i].cvalue + '</span>' +
                        '<div class="case">' + orderSizeData[i].dvalue + '</div>' +
                        '</div>';
                } else {
                    html1 += '<div class="item-tab tab-input item-tab-fl">' +
                        '<span clas="span_left">' + orderSizeData[i].cvalue + '</span>' +
                        '<div class="case">' + orderSizeData[i].dkey + '</div>' +
                        '</div>';
                }
            }
            $('#ltsj').html(html1);
            $('#ttsj').html(html2);
        }
        if (data.product.productVarList && data.product.productVarList) {
            productVarList = data.product.productVarList;
            var tabTitileHtml = "";

            for (var i = 0; i < productVarList.length; i++) {
                var tabContent = "";
                var productCategory = productVarList[i].productCategory;
                var productSpecs = productVarList[i].productSpecs;
                tabTitileHtml += '<span class="tabTitle">' + productVarList[i].name + '</span>';
                for (var j = 0; j < productCategory.length; j++) {
                    if (productCategory[j].productCraft) {
                        tabContent += '<div class="item-tab"><span>' + productCategory[j].dvalue + '</span>' +
                            '<div class="case caseimg"> ' + (productCategory[j].productCraft && productCategory[j].productCraft.name || '') + '</div></div>';
                    }
                }
                tabContent = '<div class="item-tab"><span>面料</span>' +
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
        }
        addListeners();
    });



    function initData() {
        $.each(productSpecs, function(index, spec) {
            if (spec.type == "1-02") {
                $("#modal-chose").find(".fab_type[data-name=" + spec.type + "]").click()
                    .end().find("li[data-code=" + spec.code + "]").click();
            } else if (_findIndex(ids, spec.type) != -1) {
                $("#" + spec.type).find(".param[data-code=" + spec.code + "]").click();
            } else if (_findIndex(ids1, spec.type) != -1) {
                $("#" + spec.type).find(".param[data-code=" + spec.code + "]").click();
            } else {
                $("#" + spec.type).val(spec.code).prop("disabled", 1);
            }
        });
        $("#jsForm").off("click");
        first = false;
        $(".cxradio").prop('disabled', true);
    }

    function _findIndex(data, value) {
        return data.findIndex(function(item) {
            return item == value;
        });
    }

    function addListeners() {
        $(".cxradio").click(function() {
            var dataid = $(this).attr("data-id");
            if (dataid == '03') {
                $("#wrap").css("display", "block")
            } else if (dataid == '04') {
                $("#wrap").css("display", "none");
                $("#5-01").val("");
                $("#5-02 .param").removeClass("act");
                $("#5-03 .param").removeClass("act");
                $("#5-04 .param").removeClass("act");
            }
        });
        // // 型号change事件
        // $("#1-0").on('change', function() {
        //     var _value = $(this).val();
        //     createModelAndTechHtml(materials[_value], technologys[_value]);
        //     code['1-0'] = _value;
        // });
        // 页面参数按钮点击
        // $("#jsForm").on("click", ".param", function(e) {

        //     var self = $(this);
        //     self.addClass("act").find("span").addClass("show")
        //         .parents(".param").siblings(".act").removeClass("act").find("span").removeClass("show");
        //     self.addClass("act").siblings(".act").removeClass("act");

        //     id = self.closest(".case").attr("id");
        //     if (id.split("-")[0] == "1") {
        //         code[id] = self.attr("data-code");
        //     } else {
        //         param[id] = self.attr("data-code");
        //     }
        // });


    }



    function goPage(index) {
        $("#navUl").find("span:eq(" + index + ")").addClass("act")
            .siblings("span.act").removeClass("act");
        $("#jsForm").find(".form-tab").eq(index).addClass("act")
            .siblings(".act").removeClass("act");
    }


    function getImg(src) {
        if (/^http/.test(src)) {
            return src;
        } else {
            return OSS.picBaseUrl + "/" + src;
        }
    }
});