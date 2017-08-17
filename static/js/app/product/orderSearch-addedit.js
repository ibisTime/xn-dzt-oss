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
            title: "量体嘱咐",
            field: "applyNote",
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
    var allData = {};
    var productSpecsList;
    var modelCode;
    reqApi({
        code: "620221",
        json: { code },
        sync: true
    }).then(function(data) {
        if (data.productList && data.productList.length) {
            modelCode = data.productList[0].modelCode;
            if (data.productList[0].productSpecsList &&
                data.productList[0].productSpecsList.length) {
                productSpecsList = data.productList[0].productSpecsList;
                var v51 = 0;
                data.productList[0].productSpecsList.forEach(function(v, i) {
                    if (v.parentCode == "5-1") {
                        v51 = 1;
                    }
                });
                if (v51) {
                    $(".cxradio").eq(0).attr("checked", "checked");
                    $("#wrap").css("display", "block");
                    $("#cixiu").css("display", "none")
                } else {
                    $(".cxradio").eq(1).attr("checked", "checked");
                    $("#wrap").css("display", "none");
                    $("#5-1").val("");
                    $("#5-2 .param").removeClass("act");
                    $("#5-3 .param").removeClass("act");
                    $("#5-4 .param").removeClass("act");
                }
            }
        } else {
            modelCode = "3"
        }

    });
    if (modelCode != "3") {
        var ids = ["1-1", "1-3", "1-4", "1-5",
            "1-6", "1-7", "1-8", "1-9", "1-10",
            "1-11", "3-1", "3-5", "3-6", "3-7",
            "3-8", '4-1', "4-2", "4-3", "4-4", "4-5",
            "5-2", "5-3", "5-4", '4-6', '4-7', '4-8'
        ];
        var ids1 = [{
            id: "1-2-1",
            type: "80支棉"
        }, {
            id: "1-2-2",
            type: "100支棉"
        }, {
            id: "1-2-3",
            type: "棉真丝"
        }, {
            id: "1-2-4",
            type: "棉弹力"
        }];
        var param = {};

        getInfo();

        function getInfo() {
            reqApi({
                code: "620057",
                json: { modelCode }
            }).then(function(data) {
                getData(data);
            });
            addListeners();
        }

        function getData(arr) {
            for (var i = 0; i < arr.length; i++) {
                var parentCode = arr[i].parentCode;
                if (parentCode == "1-2") {
                    parentCode = arr[i].type;
                }
                if (!allData[parentCode]) {
                    allData[parentCode] = [];
                }
                allData[parentCode].push(arr[i]);
            }
            createPage1();
            caretePage2();
            if (productSpecsList) {
                initData();
            }
        }

        function initData() {
            $.each(productSpecsList, function(index, spec) {
                if (spec.parentCode == "1-2") {
                    $("#modal-chose").find(".fab_type[data-name=" + spec.type + "]").click()
                        .end().find("li[data-code=" + spec.code + "]").click();
                } else if (spec.name) {
                    var ele = $("#" + spec.parentCode).find(".param[data-code=" + spec.code + "]");
                    spec.pic && ele.attr("src", getImg(spec.pic));
                    ele.click();
                } else {
                    $("#" + spec.parentCode).val(spec.code).prop("disabled", 1);
                }
            });
            $("#jsForm").off("click");
        }

        function createPage1() {
            for (var i = 0; i < ids.length; i++) {
                createHtml(ids[i]);
            }
        }

        function caretePage2() {
            for (var i = 0; i < ids1.length; i++) {
                createModelHtml(ids1[i]);
            }
        }

        function createModelHtml(option) {
            var data = allData[option.type];
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += '<li data-code="' + data[i].code + '" data-name="' + data[i].name + '" data-type="' + data[i].type + '" class="one_fab">' +
                    '<img src="' + getImg(data[i].pic) + '"><br>' + data[i].name +
                    '</li>';
            }
            $("#" + option.id).html(html);
        }

        function createHtml(id) {
            var data = allData[id];
            if (data) {
                if (data[0].pic) {
                    createImgHtmls(id, data);
                } else {
                    createCheckHtml(id, data);
                }
            }

        }

        function createImgHtmls(id, data) {
            var html = "";
            for (var i = 0; i < data.length; i++) {
                var cls = "param";
                if (i == 0) {
                    cls += " act";
                    param[id] = data[i].code;
                }
                html += '<div class="' + cls + '" data-code="' + data[i].code + '">' +
                    '<p><img src="' + getImg(data[i].pic) + '"></p>' + data[i].name +
                    '</div>';
            }
            $("#" + id).html(html);
        }

        function createCheckHtml(id, data) {
            var html = "";
            for (var i = 0; i < data.length; i++) {
                var cls = "param";
                if (i == 0) {
                    cls += " act";
                    param[id] = data[i].code;
                }
                html += '<span class="' + cls + '" data-code="' + data[i].code + '">' + data[i].name + '</span>';
            }
            $("#" + id).html(html);
        }

        function addListeners() {
            // 页面参数按钮点击
            $("#jsForm").on("click", ".param", function(e) {
                var self = $(this);
                self.addClass("act")
                    .siblings(".act").removeClass("act");
                id = self.closest(".case").attr("id");
                param[id] = self.attr("data-code");
            });
            // 头部tab切换
            $("#navUl").on("click", "span", function() {
                var self = $(this),
                    index = self.index();
                self.addClass("act")
                    .siblings("span.act").removeClass("act");
                var tabs = $("#jsForm").find(".form-tab");
                tabs.eq(index).addClass("act")
                    .siblings(".act").removeClass("act");
            });
            // 面料tab切换
            $(".fab_type").click(function() {
                var v_idx = $(".fab_type").index(this);
                $(".fab_type").removeClass("act");
                $(this).addClass("act");

                $(".fab_type_list.act").removeClass("act");
                $(".fab_type_list").eq(v_idx).addClass("act");

            });
            // 面料选择

            $("#select_fabric_div").on("click", ".one_fab", function(e) {
                var self = $(this);
                var code = self.attr('data-code');
                var name = self.attr('data-name');
                var type = self.attr('data-type');

                $(".one_fab.act").removeClass("act");
                self.addClass("act");

                $("#select_fab_img").attr("src", self.children("img").attr("src"));
                $("#selected_fab_full_info").html(name + "　　" + type + "　　");

                $(".modalbg,.more-condition,.modal-chose").removeClass("open");
                $("#1-2").attr("data-code", code).attr("data-name", name);
            });
        }

        function validatePage1() {
            var ele = $("#1-2");
            var code = ele.attr("data-code");
            if (!code) {
                toastr.info("衬衫面料不能为空");
                return false;
            }
            param['1-2'] = code;
            return true;
        }

        function validatePage2() {
            if ($('#form-tab2').valid()) {
                var data = $('#form-tab2').serializeObject();
                if (data == "") {
                    toastr.info("请按要求填写完整");
                    return false;
                }
                return true;
            }
            return false;
        }

        function validatePage3() {
            if ($('#form-tab2').valid()) {
                var data = $('#form-tab2').serializeObject();
                return true;
            }
            return false;

        }

        function validatePage4() {
            if ($('#form-tab4').valid()) {
                var data = $('#form-tab4').serializeObject();
                if (data == "") {
                    toastr.info("请按要求填写完整");
                    return false;
                }
                return true;
            }
            return false;

        }

        function validatePage5() {
            if ($('#form-tab5').valid()) {
                var data = $('#form-tab5').serializeObject();
                if (data == "") {
                    toastr.info("请按要求填写完整");
                    return false;
                }
                return true;
            }
            return false;

        }

        function getImg(src) {
            if (/^http/.test(src)) {
                return src;
            } else {
                return OSS.picBaseUrl + "/" + src;
            }
        }
    } else {
        $("#jsForm").css("display", "none")
    }
});