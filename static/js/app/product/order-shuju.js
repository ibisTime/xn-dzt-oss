$(function() {
    var allData = {};
    var ids = ["1-1", "1-3", "1-4", "1-5",
        "1-6", "1-7", "1-8", "1-9", "1-10",
        "1-11", "3-1", "3-5", "3-6", "3-7",
        "3-8", "4-2", "4-3", "4-4"
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
            code: "620057"
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
            param[id] = self.attr("code");
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
        $("#to_step_1").on("click", function() {
            goPage(1);
        });

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
        return true;
    }

    function validatePage2() {

    }

    function getImg(src) {
        if (/^http/.test(src)) {
            return src;
        } else {
            return OSS.picBaseUrl + "/" + src;
        }
    }

});