$(function() {
    var allData = {};
    var code = getQueryString('code');
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
        // if (data.productList && data.productList.length &&
        //     data.productList[0].productSpecsList &&
        //     data.productList[0].productSpecsList.length) {
        //     productSpecsList = data.productList[0].productSpecsList;

        // }

    });



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
                $("#" + spec.parentCode).find(".param[data-code=" + spec.code + "]").click();
                // var ele = $("#" + spec.parentCode).find(".param[data-code=" + spec.code + "]");
                // spec.pic && ele.find("img").attr("src", getImg(spec.pic));
                // ele.click();

            } else {
                $("#" + spec.parentCode).val(spec.code);
            }
        })
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
            } else if (id == "1-8") {
                if (data[0].code > data[1].code) {
                    var temp = data[0];
                    data[0] = data[1];
                    data[1] = temp;
                }
                createCheckHtml(id, data);
            } else {
                createCheckHtml(id, data);
            }
        }

    }

    function createImgHtmls(id, data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var cls = "param";
            var cls0 = "cover"
            if (i == 0) {
                cls += " act";
                cls0 += " show";
                param[id] = data[i].code;
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
                param[id] = data[i].code;
            }
            html += '<span class="' + cls + '" data-code="' + data[i].code + '">' + data[i].name + '</span>';
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
                $("#5-1").val("");
                $("#5-2 .param").removeClass("act");
                $("#5-3 .param").removeClass("act");
                $("#5-4 .param").removeClass("act");
            }
        });



        // 页面参数按钮点击
        // $("#jsForm").on("click", ".param", function(e) {
        //     var self = $(this);
        //     self.addClass("act").find("span").addClass("show")
        //         .parents(".param").siblings(".act").removeClass("act").find("span").removeClass("show");
        //     id = self.closest(".case").attr("id");
        //     param[id] = self.attr("data-code");
        // });
        // 页面参数按钮点击
        $("#jsForm").on("click", ".param", function(e) {
            var self = $(this);
            self.addClass("act").find("span").addClass("show")
                .parents(".param").siblings(".act").removeClass("act").find("span").removeClass("show");
            self.addClass("act").siblings(".act").removeClass("act");

            id = self.closest(".case").attr("id");
            param[id] = self.attr("data-code");
        });
        // 头部tab切换
        // $("#navUl").on("click", "span", function() {
        //     var self = $(this),
        //         index = self.index();
        //     self.addClass("act")
        //         .siblings("span.act").removeClass("act");
        //     var tabs = $("#jsForm").find(".form-tab");
        //     tabs.eq(index).addClass("act")
        //         .siblings(".act").removeClass("act");
        // });
        // 点击选择面料按钮，弹出面料选择框
        $("#btn_select_fab").click(function() {
            $(".modalbg,.more-condition,.modal-chose").addClass("open");
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
        $("#to_step_3").on("click", function() {
            if (validatePage2()) {
                goPage(2);
            }
        });
        $("#complete").on("click", function() {
            if (validatePageYan()) {
                createDimeByRules();
            }
        });
        $("#to_step_1").on("click", function() {
            goPage(0);
        });
        $("#to_pre_step_2").on("click", function() {
            goPage(1);
        });

        $("#to_nex_step_4").on("click", function() {
            if (validatePage3()) {
                goPage(3);
            }
        });


        $("#form-tab2").validate({
            'rules': {
                '2-1': {
                    required: true,
                    max: 60,
                    min: 30
                },
                // '2-11': {
                //     required: true
                // },
                '2-2': {
                    required: true,
                    max: 180,
                    min: 60
                },
                // '2-12': {
                //     required: true
                // },
                '2-3': {
                    required: true,
                    max: 170,
                    min: 50
                },
                // '2-13': {
                //     required: true
                // },
                '2-4': {
                    required: true,
                    max: 170,
                    min: 50
                },
                // '2-14': {
                //     required: true
                // },
                '2-5': {
                    required: true,
                    max: 70,
                    min: 35
                },
                // '2-15': {
                //     required: true
                // },
                '2-6': {
                    required: true,
                    max: 90,
                    min: 50
                },
                // '2-16': {
                //     required: true
                // },
                '2-7': {
                    required: true,
                    max: 80,
                    min: 15
                },
                // '2-17': {
                //     required: true
                // },
                '2-8': {
                    required: true,
                    max: 65,
                    min: 20
                },
                // '2-18': {
                //     required: true
                // },
                '2-9': {
                    required: true,
                    max: 30,
                    min: 15
                },
                // '2-10': {
                //     required: true
                // },
            }
        });

        $("#form-tab3").validate({
            'rules': {
                '4-3': {
                    min: 10,
                    max: 100,
                    number: true,
                    // required: true
                },
                '4-4': {
                    min: 15,
                    max: 70,
                    number: true,
                    // required: true
                },
                '4-2': {
                    min: 10,
                    max: 100,
                    number: true,
                    // required: true
                }
            }
        });
        $("#form-tab4").validate({
            'rules': {
                '5-1': {
                    required: true,
                    maxlength: 10,
                    isNotFace: true
                }
            }
        });
        $("#form-tab5").validate({
            'rules': {
                '6-1': {
                    required: true,
                    maxlength: 5,
                    number: true
                },
                '6-2': {
                    required: true,
                    maxlength: 10,
                    number: true
                },
                '6-3': {
                    required: true,
                    maxlength: 7,
                    number: true
                },
                '6-4': {
                    required: true,
                    maxlength: 255,
                    isNotFace: true
                },
                '6-5': {
                    maxlength: 255,
                    isNotFace: true,
                    required: true,
                }
            }
        });
        $("#to_pre_step_3").on("click", function() {
            goPage(2);
        });

        $("#to_next_step_5").on("click", function() {
            if (validatePage4()) {
                goPage(4);
            }
        });

        $("#to_pre_step_4").on("click", function() {
            goPage(3);
        });
        $("#submit").on("click", function() {
            if (validatePage5()) {
                var data = {};
                var data2 = $('#form-tab2').serializeObject();
                var data3 = $('#form-tab3').serializeObject();
                var data4 = $('#form-tab4').serializeObject();
                var data5 = $('#form-tab5').serializeObject();

                param = $.extend(param, data2, data3, data4, data5);
                data['orderCode'] = code;
                data['map'] = param;

                reqApi({
                    code: "620205",
                    json: data
                }).done(function() {
                    sucDetail();
                });

            }
        });
    }

    function createDimeByRules() {
        var dataCode = $("input[type='radio']:checked").attr("data-code");
        var val26 = $(".param_26").val()
        var val27 = $(".param_27").val();
        var val28 = $(".param_28").val();
        // var val29 = $(".param_29").val();
        var val30 = $(".param_30").val();
        var val31 = $(".param_31").val();
        var val32 = $(".param_32").val();
        var val33 = $(".param_33").val();
        var val34 = $(".param_34").val();
        if (dataCode == "01") {
            $(".param_26_zoom").val(parseFloat(val26).toFixed(2));
            $(".param_27_zoom").val(parseFloat(val27 * 1.1).toFixed(2));
            $(".param_28_zoom").val(parseFloat(val28 * 1.1).toFixed(2));
            $(".param_29_zoom").val(parseFloat(val27 * 1.1 - 2).toFixed(2))
            $(".param_30_zoom").val(parseFloat(val30).toFixed(2));
            $(".param_31_zoom").val(parseFloat(val31).toFixed(2));
            $(".param_32_zoom").val(parseFloat(val32).toFixed(2));
            $(".param_33_zoom").val(parseFloat(val33*1 +9).toFixed(2));
            $(".param_34_zoom").val(parseFloat(val34*1+6).toFixed(2));
        } else {
            $(".param_26_zoom").val(parseFloat(val26).toFixed(2));
            $(".param_27_zoom").val(parseFloat(val27 * 1.08).toFixed(2));
            $(".param_28_zoom").val(parseFloat(val28 * 1.07).toFixed(2));
            $(".param_29_zoom").val(parseFloat(val27 * 1.08 - 4).toFixed(2));
            $(".param_30_zoom").val(parseFloat(val30).toFixed(2));
            $(".param_31_zoom").val(parseFloat(val31).toFixed(2));
            $(".param_32_zoom").val(parseFloat(val32).toFixed(2));
            $(".param_33_zoom").val(parseFloat(val33*1 +7).toFixed(2));
            $(".param_34_zoom").val(parseFloat(val34*1 +5).toFixed(2));
        }
    }

    function goPage(index) {
        $("#navUl").find("span:eq(" + index + ")").addClass("act")
            .siblings("span.act").removeClass("act");
        $("#jsForm").find(".form-tab").eq(index).addClass("act")
            .siblings(".act").removeClass("act");
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

    function validatePageYan() {
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
        if ($('#form-tab3').valid()) {
            var data = $('#form-tab3').serializeObject();
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

});