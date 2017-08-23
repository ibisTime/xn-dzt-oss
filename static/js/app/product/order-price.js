$(function() {
    var code = getQueryString('code');
    var modelCode;

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
        title: "量体嘱咐",
        field: "applyNote",
        readonly: true
    }, {
        title: "所属产品",
        field: "modelCode",
        type: "select",
        listCode: "620012",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        required: true,
        onChange: function(v, data) {
            if (data) {
                if (data.type == 1) {
                    modelCode = $("#modelCode").val();

                    $("#jsForm").css("display", "block");
                    $("#btn-0").css("display", "none");
                    $("#btn-1").css("display", "none");
                    $("#btn-1").css("display", "none");
                    $("#tab11").css("display", "none");
                } else if (data.type == 0) {
                    $("#jsForm").css("display", "none");
                }
            }
        }
    }, {
        field: "quantity",
        title: '数量',
        type: "hidden",
        value: "1",
        required: true
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
        title: '确认',
        handler: function() {
            if ($('#jsForm1').valid()) {
                var data = {};
                data['orderCode'] = code;
                data['modelCode'] = $("#modelCode").val();
                data["quantity"] = $("#quantity").val();
                data["ramark"] = $("#ramark").val();
                reqApi({
                    code: "620203",
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

    var allData = {};
    var productSpecsList;

    reqApi({
        code: "620231",
        json: { code },
        sync: true
    }).then(function(data) {
        if (data.productList && data.productList.length) {
            // modelCode = data.productList[0].modelCode;
            if (data.productList[0].productSpecsList &&
                data.productList[0].productSpecsList.length) {
                productList = data.productList[0];
                productSpecsList = data.productList[0].productSpecsList;
                var v51 = 0;
                data.productList[0].productSpecsList.forEach(function(v, i) {
                    if (v.type == "5-1") {
                        v51 = 1;
                    }
                });
                if (v51) {
                    $(".cxradio").eq(0).attr("checked", "checked");
                    $("#wrap").css("display", "block")

                } else {
                    $(".cxradio").eq(1).attr("checked", "checked");
                    $("#wrap").css("display", "none");
                    $("#5-1").val("");
                    $("#5-2 .param").removeClass("act");
                    $("#5-3 .param").removeClass("act");
                    $("#5-4 .param").removeClass("act");
                }
            }
        }


    });

    var ids = ["4-1", "4-2", "4-3", "4-4", "4-5", "4-6", "4-7", "4-8", '4-9', '4-10', '4-11', '4-12'];
    var ids1 = ["1-3", "1-4", "1-5", "1-6", "1-7", "1-8", "1-9", '5-2', "5-3", "5-4"];
    var param = {};
    var codeList = {};
    var globalDicts = {};
    var fabricYarns = []; //纱支

    var materials = {};
    var technologys = {};

    getInfo();

    function getInfo() {
        $.when(
            reqApi({
                code: "805906",
                json: { updater: "" }
            }),
            reqApi({
                code: "620012",
                json: { updater: "" }
            }),
            reqApi({
                code: "620032",
                json: {
                    updater: "",
                }
            }),
            reqApi({
                code: "620052",
                json: { updater: "" }
            })
        ).then(function(data0, data1, data3, data4) {
            getData(data0);
            // 面料
            var html = '',
                html1 = '';
            for (var i = 0; i < fabricYarns.length; i++) {
                html += '<span class="fab_type ' + (i === 0 ? 'act' : '') + '" data-name="' + fabricYarns[i].dvalue + '" style="width:70px; min-width: 70px;" fab_price_level="' + fabricYarns[i].dkey + '">' + fabricYarns[i].dvalue + '</span>';

                html1 += '<ul class="fab_type_list ' + (i === 0 ? 'act' : '') + '" id="' + fabricYarns[i].dkey + '"></ul>';
            }
            html1 += '<p class="cb"></p>';
            $("#select_fabric_div").find('.item-tab .case').html(html);
            $("#select_fabric_div").find('.shell-con').html(html1);
            for (var i = 0; i < data3.length; i++) {
                var item = data3[i];
                if (!materials[item.modelCode]) {
                    materials[item.modelCode] = {};
                }
                if (!materials[item.modelCode][item.yarn]) {
                    materials[item.modelCode][item.yarn] = [];
                }
                materials[item.modelCode][item.yarn].push(item);
            }
            // 工艺
            for (var i = 0; i < data4.length; i++) {
                var item = data4[i];
                if (!technologys[item.modelCode]) {
                    technologys[item.modelCode] = {};
                }
                if (!technologys[item.modelCode][item.type]) {
                    technologys[item.modelCode][item.type] = [];
                }
                technologys[item.modelCode][item.type].push(item);
            }

            // 型号
            var html = '';
            for (var i = 0; i < data1.length; i++) {
                html += '<option value="' + data1[i].code + '">' + data1[i].name + '</option>';
            }
            $("#1-1").html(html).trigger('change');
            chosen();
            var modelCode = $("#modelCode").val();
            if (modelCode) {
                $("#1_1_chosen").remove();
                $("#1-1").val(modelCode).trigger('change').css("visibility", "visible").prop('disabled', true);
            }

            if (productSpecsList) {
                initData();
            }
        });
        addListeners();
    }

    function getData(arr) {
        for (var i = 0; i < arr.length; i++) {
            var dkey = arr[i].dkey;
            var dvalue = arr[i].dvalue;
            var parentKey = arr[i].parentKey;
            if (parentKey === 'measure') {
                if (!allData[dkey]) {
                    allData[dkey] = [];
                }
                allData[dkey].push(arr[i]);
            } else if (parentKey === 'fabric_yarn') {
                fabricYarns.push(arr[i]);
            }
        }
        createPage1();
    }

    function initData() {
        $.each(productSpecsList, function(index, spec) {
            if (spec.type == "1-2") {
                $("#modal-chose").find(".fab_type[data-name=" + spec.type + "]").click()
                    .end().find("li[data-code=" + spec.code + "]").click();
            } else if (_findIndex(ids1, spec.type) != -1) {
                $("#" + spec.type).find(".param[data-code=" + spec.code + "]").click();
            }
        });
    }

    function _findIndex(data, value) {
        return data.findIndex(function(item) {
            return item == value;
        });
    }

    function createPage1() {
        for (var key in allData) {
            var id = key.split("-").join('');
            $("#" + id).html(allData[key][0].dvalue);
        }
    }

    function createModelAndTechHtml(maters, techs) {
        var _warp = $("#select_fabric_div");
        if (!maters || !techs) {
            $("#fTab1").hide();
            return;
        }
        for (var i = 0; i < fabricYarns.length; i++) {
            var html = "";
            var _dict = fabricYarns[i];
            var data = maters[_dict.dkey];
            if (!data) {
                _warp.find("[fab_price_level=" + _dict.dkey + "]").hide();
                $("#" + _dict.dkey).empty();
            } else {
                _warp.find("[fab_price_level=" + _dict.dkey + "]").show();
                for (var j = 0; j < data.length; j++) {
                    html += '<li data-code="' + data[j].code + '" data-name="' + data[j].code + '" data-type="' + data[j].type + '" class="one_fab">' +
                        '<img src="' + getImg(data[j].pic) + '"><br>' + data[j].code +
                        '</li>';
                }
                $("#" + _dict.dkey).html(html);
            }
        }
        for (var i = 0; i < ids1.length; i++) {
            var html = '';
            var id = ids1[i];
            var data = techs[id];
            if (!data) {
                $("#" + id).empty();
            } else {
                createImgHtmls(id, data);
            }
        }
        $("#fTab1").show();
    }


    function createImgHtmls(id, data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var cls = "param";
            var cls0 = "cover"
            if (i == 0) {
                cls += " act";
                cls0 += " show";
                if (id.split("-")[0] == "1") {
                    codeList[id] = data[i].code;
                } else {
                    param[id] = data[i].code;
                }
            }
            html += '<div class="' + cls + '" data-code="' + data[i].code + '">' +
                '<p><img src="' + getImg(data[i].pic) + '">' + '<span class = "' + cls0 + '"></span> ' + '</p>' + data[i].name +
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
                param[id] = data[i].dkey;
            }
            html += '<span class="' + cls + '" data-code="' + data[i].dkey + '">' + data[i].dvalue + '</span>';
        }
        $("#" + id).html(html);
    }

    function addListeners() {

        // 型号change事件
        $("#1-1").on('change', function() {
            var _value = $(this).val();
            createModelAndTechHtml(materials[_value], technologys[_value]);
            codeList['1-1'] = _value;
        });
        // 页面参数按钮点击
        $("#jsForm").on("click", ".param", function(e) {
            var self = $(this);
            self.addClass("act").find("span").addClass("show")
                .parents(".param").siblings(".act").removeClass("act").find("span").removeClass("show");
            self.addClass("act").siblings(".act").removeClass("act");

            id = self.closest(".case").attr("id");
            if (id.split("-")[0] == "1") {
                codeList[id] = self.attr("data-code");
            } else {
                param[id] = self.attr("data-code");
            }
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
        // 点击选择面料按钮，弹出面料选择框
        $("#btn_select_fab").click(function() {
            $(".modalbg,.more-condition,.modal-chose").addClass("open");
        });
        // 面料tab切换
        $("#select_fabric_div").on("click", ".fab_type", function() {
            var fab_price_level = $(this).attr('fab_price_level');
            $(".fab_type").removeClass("act");
            $(this).addClass("act");

            $(".fab_type_list.act").removeClass("act");
            $("#" + fab_price_level).addClass("act");

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
            codeList['1-2'] = code;
        });
        // 点击背景隐藏面料弹出框
        $(".modalbg").click(function() {
            $(".modalbg,.more-condition,.modal-chose").removeClass("open");
        });
        // 面料弹出框搜索框点击确认
        $("#confirm_input_code").click(function() {
            var v_input = $("#input_fab_code").val();
            if (v_input == undefined || v_input.trim() == "") return;
            v_input = v_input.toUpperCase();

            var fabs = $(".one_fab");
            fabs.each(function(index) {
                var self = $(this);
                var name = self.attr("data-name");
                if (name.toUpperCase().indexOf(v_input) != -1) {
                    self.addClass("act");
                } else {
                    self.removeClass("act");
                }
                if (index == fabs.length) {
                    $(".fab_type_list.act").removeClass("act");
                    self.closest(".fab_type_list").addClass("act");
                }
            });
        });
        $("#to_step_2").on("click", function() {
            if (validatePage1()) {
                goPage(1);
            }
        });
        $("#to_pre_step_3").on("click", function() {
            goPage(0);
        });
        $("#form-tab1").validate({
            'rules': {
                '1-3': {
                    required: true,

                },
                '1-4': {
                    required: true
                },
                '1-5': {
                    required: true
                },
                '1-6': {
                    required: true
                },
                '1-7': {
                    required: true
                },
                '1-8': {
                    required: true
                },
                '1-9': {
                    required: true
                },
                '1-10': {
                    required: true
                },
                '1-11': {
                    required: true
                },
            }
        });


        $("#submit").on("click", function() {
            if (validatePage1()) {
                var data = {};
                var data4 = $('#form-tab4').serializeObject();
                // var map = $.extend(param, data2, data3, data4, data5);

                var _codelist = [];
                for (var key in codeList) {
                    _codelist.push(codeList[key]);
                };
                for (var key in param) {
                    if (key == "5-2" || key == "5-3" || key == "5-4") {
                        _codelist.push(param[key]);
                    }
                };
                var v51 = $("#5-1").val()
                data['orderCode'] = code;
                data['codeList'] = _codelist
                data["quantity"] = $("#quantity").val();
                data["ramark"] = $("#ramark").val();
                data.map = { "5-1": v51 }
                reqApi({
                    code: "620205",
                    json: data
                }).done(function() {
                    sucDetail();
                });

            }
        });
        $("#goBack").on("click", function() {
            goBack();
        });
    }


    function goPage(index) {
        $("#navUl").find("span:eq(" + index + ")").addClass("act")
            .siblings("span.act").removeClass("act");
        $("#jsForm").find(".form-tab").eq(index).addClass("act")
            .siblings(".act").removeClass("act");
    }

    function validatePage1() {
        if ($('#form-tab1').valid()) {
            var ele = $("#1-2");
            var code = ele.attr("data-code");
            if (!code) {
                toastr.info("衬衫面料不能为空");
                return false;
            }

            param['1-2'] = code;
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


});