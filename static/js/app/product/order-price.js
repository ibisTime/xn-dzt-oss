$(function() {
    var code = getQueryString('code');
    var modelCode;
    var allData = {};
    var productSpecsList;

    reqApi({
        code: "620231",
        json: { code },
        sync: true
    }).then(function(data) {
        if (data.productList && data.productList.length) {
            modelCode = data.productList[0].modelCode;
        }
    });
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
        title: "所属产品",
        field: "modelCode",
        type: "select",
        listCode: "620012",
        value: modelCode,
        params: {
            status: "1",
            updater: ""
        },
        keyName: "code",
        valueName: "name",
        searchName: "name",
        required: true,
        onChange: function(v, data) {
            if (data) {
                if (data.type == 1) {
                    $("#jsForm").css("display", "block");
                    $("#btn-0").css("display", "none");
                    $("#btn-1").css("display", "none");
                    $("#tab11").css("display", "none");
                    createModelAndTechHtml(materials[v], technologys[v]);
                    codeList['1-0'] = v;
                } else if (data.type == 0) {
                    $("#jsForm").css("display", "none");
                    $("#btn-0").css("display", "block");
                    $("#btn-1").css("display", "block").addClass("gobackBtn");
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
                data["token"] = sessionStorage.getItem('token');
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
    var ids1 = ["1-01", "1-03", "1-04", "1-05", "1-06", "1-07", "1-08", "5-02", "5-03", "5-04"];
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
                code: "620906",
                json: {
                    updater: ""
                }
            }),
            reqApi({
                code: "620012",
                json: {
                    updater: "",
                    status: "1"
                }
            }),
            reqApi({
                code: "620032",
                json: {
                    updater: "",
                    status: '1'
                }
            }),
            reqApi({
                code: "620052",
                json: {
                    updater: "",
                    status: "1"
                }
            }),
            reqApi({
                code: "805906",
                json: {
                    updater: "",
                    parentKey: "fabric_yarn"
                }
            }),
        ).then(function(data0, data1, data3, data4, data5) {
            for (var i = 0; i < data5.length; i++) {
                var dkey = data5[i].dkey;
                var dvalue = data5[i].dvalue;
                var parentKey = data5[i].parentKey;
                if (parentKey === 'fabric_yarn') {
                    fabricYarns.push(data5[i]);
                }
            }
            getData(data0);
            // fabricYarns.push(data5[i])
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
            $("#1-0").html(html).trigger('change');
            chosen();
            var modelCode = $("#modelCode").val();
            if (modelCode) {
                $("#1_0_chosen").remove();
                $("#1-0").val(modelCode).trigger('change').css("visibility", "visible").prop('disabled', true);
            }

            buildDetail(options);
        });
        addListeners();

    }

    function getData(arr) {
        for (var i = 0; i < arr.length; i++) {
            var dkey = arr[i].dkey;
            var dvalue = arr[i].dvalue;
            var parentKey = arr[i].parentKey;
            if (parentKey === '4-01') {
                if (!globalDicts['4-01']) {
                    globalDicts['4-01'] = [];
                }
                globalDicts['4-01'].push(arr[i]);
            } else if (parentKey === '4-05') {
                if (!globalDicts['4-05']) {
                    globalDicts['4-05'] = [];
                }
                globalDicts['4-05'].push(arr[i]);
            } else if (parentKey === '4-06') {
                if (!globalDicts['4-06']) {
                    globalDicts['4-06'] = [];
                }
                globalDicts['4-06'].push(arr[i]);
            } else if (parentKey === '4-02') {
                if (!globalDicts['4-02']) {
                    globalDicts['4-02'] = [];
                }
                globalDicts['4-02'].push(arr[i]);
            } else if (parentKey === '4-03') {
                if (!globalDicts['4-03']) {
                    globalDicts['4-03'] = [];
                }
                globalDicts['4-03'].push(arr[i]);
            } else if (parentKey === '4-04') {
                if (!globalDicts['4-04']) {
                    globalDicts['4-04'] = [];
                }
                globalDicts['4-04'].push(arr[i]);
            } else if (parentKey === '4-07') {
                if (!globalDicts['4-07']) {
                    globalDicts['4-07'] = [];
                }
                globalDicts['4-07'].push(arr[i]);
            } else if (parentKey === '4-08') {
                if (!globalDicts['4-08']) {
                    globalDicts['4-08'] = [];
                }
                globalDicts['4-08'].push(arr[i]);
            } else if (parentKey === '4-09') {
                if (!globalDicts['4-09']) {
                    globalDicts['4-09'] = [];
                }
                globalDicts['4-09'].push(arr[i]);
            } else if (parentKey === '4-10') {
                if (!globalDicts['4-10']) {
                    globalDicts['4-10'] = [];
                }
                globalDicts['4-10'].push(arr[i]);
            } else if (parentKey === '4-11') {
                if (!globalDicts['4-11']) {
                    globalDicts['4-11'] = [];
                }
                globalDicts['4-11'].push(arr[i]);
            } else if (parentKey === '4-12') {
                if (!globalDicts['4-12']) {
                    globalDicts['4-12'] = [];
                }
                globalDicts['4-12'].push(arr[i]);
            }
            // else if (parentKey === 'fabric_yarn') {
            //     fabricYarns.push(arr[i]);
            // }
        }
        createPage1();
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
                    html += '<li data-code="' + data[j].code + '" data-name="' + data[j].modelNum + '" data-type="' + data[j].yarn + '" class="one_fab">' +
                        '<img src="' + getImg(data[j].pic) + '"><br>' + data[j].modelNum +
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
            var yarn = self.attr('data-type');

            $(".one_fab.act").removeClass("act");
            self.addClass("act");
            var fabricYarnsName;
            for (var i = 0; i < fabricYarns.length; i++) {
                if (fabricYarns[i].dkey == yarn) {
                    fabricYarnsName = fabricYarns[i].dvalue;
                }
            }
            $("#select_fab_img").attr("src", self.children("img").attr("src"));
            $("#selected_fab_full_info").html(name + "　　" + fabricYarnsName + "　　");

            $(".modalbg,.more-condition,.modal-chose").removeClass("open");
            $("#1-02").attr("data-code", code).attr("data-name", name);
            codeList['1-02'] = code;
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
        $("#form-tab4").validate({
            'rules': {
                '5-01': {
                    required: true,
                    maxlength: 10
                }
            }
        });
        $("#to_step_2").on("click", function() {
            if (validatePage1()) {
                goPage(1);
            }
        });
        $("#to_pre_step_3").on("click", function() {
            goPage(0);
        });



        $("#submit").on("click", function() {
            if (validatePage1()) {
                var data = {};

                var _codelist = [];
                for (var key in codeList) {
                    _codelist.push(codeList[key]);
                };
                for (var key in param) {
                    if (key == "5-02" || key == "5-03" || key == "5-04") {
                        _codelist.push(param[key]);
                    }
                };
                var v51 = $("#5-01").val()
                data['orderCode'] = code;
                data['codeList'] = _codelist
                data["quantity"] = $("#quantity").val();
                data["ramark"] = $("#ramark").val();
                data["token"] = sessionStorage.getItem('token');
                data.map = { "5-01": v51 }
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
        var ele = $("#1-02");
        var code = ele.attr("data-code");
        if (!code) {
            toastr.info("衬衫面料不能为空");
            return false;
        }

        param['1-02'] = code;
        return true;
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

    function getImg(src) {
        if (/^http/.test(src)) {
            return src;
        } else {
            return OSS.picBaseUrl + "/" + src;
        }
    }


});