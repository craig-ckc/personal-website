function menuControll(toggle) {
    const tl = gsap.timeline({ defualts: { ease: "power4.out" } })
    if (toggle) {
        tl.set(".menu-logo .cr-logo", { opacity: 0 })
            .set(".menu-toggle .toggle-title", { opacity: 0 })
            .set(".nav-container .cr-logo", { opacity: 1 })
            .to(".back-drop", { duration: .2, "pointer-events": "none", opacity: 0 })
            .to(".menu-item", { duration: .5, x: "200px", stagger: .03 }, "-=.2")
            .to(".menu-content", { duration: .4, x: "101%" }, "-=.52")
            .set(".menu-toggle .toggle-btn>span", { "background": "var(--black)" }, "-=.2")
    } else {
        tl.set(".menu-toggle .toggle-btn>span", { "background": "var(--white)" })
            .set(".menu-logo .cr-logo", { opacity: 1 })
            .set(".menu-toggle .toggle-title", { opacity: 1 })
            .set(".nav-container .cr-logo", { opacity: 0 })
            .to(".back-drop", { duration: .2, "pointer-events": "all", opacity: 1 })
            .to(".menu-content", { duration: .4, x: "0%" }, "-=.2")
            .to(".menu-item", { duration: .5, x: "0px", stagger: .03 }, "-=.28")
    }
}

function menu_btn(active) {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } })

    if (active) {
        tl.to(".toggle-btn span", { rotate: 0 })
            .to(".toggle-btn span:first-child", { y: 6 })
            .to(".toggle-btn span:last-child", { y: 16 }, "-=.3")
    } else {
        tl.to(".toggle-btn span", { y: 12 })
            .to(".toggle-btn span:first-child", { rotate: 45 })
            .to(".toggle-btn span:last-child", { rotate: -45 }, "-=.3")
    }

}

function menu() {
    var active = false

    $(".menu-toggle .toggle-btn").click(() => {
        menuControll(active)
        menu_btn(active)

        scrollLock(!active)

        active = active ? false : true
    })
    $(".back-drop").click(() => {
        menuControll(active)
        menu_btn(active)

        scrollLock(!active)

        active = active ? false : true
    })
}

function buttonHover() {

    const tl = gsap.timeline({ defaults: { duration: 0.4 } })

    if ($(".btn").attr("data-fipple") == "false") {
        return
    }

    $(".btn").hover(
        function () {
            var text = $(this).find(".btn-text")
            var fill = $(this).find(".btn-fill")

            tl.set(fill, { transform: 'translate3d(0,76%,0)' })
                .to(fill, { transform: 'translate3d(0,0%,0)' })

            text.addClass('white')
        },
        function () {
            var text = $(this).find(".btn-text")
            var fill = $(this).find(".btn-fill")

            tl.to(fill, { transform: 'translate3d(0,-76%,0)' })

            text.removeClass('white')
        }
    )
}

function magenet() {
    $('.magenet-area').on('mousemove', function (e) {
        var boundingRect = $(this).get(0).getBoundingClientRect();
        var relX = e.pageX - boundingRect.left;
        var relY = e.pageY - boundingRect.top;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var movement = parseFloat($(this).attr("data-magnetic-strength"));

        gsap.to($(this).siblings(), { x: (relX - boundingRect.width / 2) * movement, y: (relY - boundingRect.height / 2 - scrollTop) * movement, ease: "power1", duration: 0.4 });
    })

    $('.magenet-area').on('mouseleave', function (e) {
        gsap.to($(this).siblings(), { x: 0, y: 0, ease: Back.easeOut, duration: 0.6 });
    })
}

function cursor() {
    var cursor = $(".cr-cursor")

    $(".cursor-hover").hover(
        function () {
            cursor.find("span").text($(this).attr("data-cursor-text"))
            cursor.css({ "--size": "100px", "background-color": "rgba(255, 255, 255, 0.4)", "border-width": "2px" })
            cursor.find('span').css({ "font-size": "16px", "line-height": "100%" })
        },
        function () {
            cursor.css({ "--size": "7px", "background-color": "var(--black)", "border-width": "0px" })
            cursor.find('span').css({ "font-size": "0px", "line-height": "0%" })
        }
    )

    $(".link").hover(
        () => {
            cursor.css({ "--size": "60px", "background-color": "transparent", "backdrop-filter": "invert()" })
        },
        () => {
            cursor.css({ "--size": "7px", "background-color": "var(--black)", "backdrop-filter": "blur(5px)" })
        }
    )

    $("window").mouseleave(function () {
        console.log("mouse out")
        cursor.addClass("zero")
    });
    $("window").mouseenter(function () {
        console.log("mouse in")
        cursor.removeClass("zero")
    });

}

function menu_item() {
    $(".menu-links li a").hover(
        function () {
            $(".menu-links li a").css({ "opacity": ".3" })
            $(this).css({ "opacity": "1" })
        },
        function () {
            $(".menu-links li a").css({ "opacity": "1" })
        }
    )
}

function inView(el, func) {
    var element = $(el)

    var top = element.offset().top - $(window).scrollTop()

    var bottom = top + element.outerHeight()

    if (top < $(window).height() & bottom > 0) {
        func()
    }
}

function emailCheck(input) {
    var field = document.getElementsByName(input)[0]
    var message = document.querySelector(".error-message")
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (field == null) return;

    field.addEventListener("focusout", () => {
        if (field.value.length == 0) return

        if (field.value.match(mailformat)) {
            field.classList.remove("error")
            message.classList.add("active")
        } else {
            field.classList.add("error")
            message.classList.remove("active")
        }
    });
}

function footerScroll() {
    var footer = $(".footer")

    if (footer.html() == undefined) return

    var distance = footer.offset().top - $(window).scrollTop()

    var percent = (distance / $(window).height()) * - 60

    inView(
        ".footer",
        () => { footer.css({ "transform": `translateY(${percent}%)` }) }
    )
    requestAnimationFrame(footerScroll)
}

function intersect(observe, lookup, function1, function2) {
    var lookupTop = $(lookup).offset().top
    var lookupBottom = lookupTop + $(lookup).outerHeight()

    var observeTop = $(observe).offset().top
    var observeBottom = observeTop + $(observe).outerHeight()

    var t1 = (observeTop > lookupTop & observeTop < lookupBottom)
    var t2 = (observeBottom > lookupTop & observeBottom < lookupBottom)

    if (t1 | t2) {
        function1()
    } else {
        function2()
    }

}

function parallax() {
    $(".screenshot-preview").each((i, div) => {
        if ($(div).attr("data-parallax") == "true") {
            var top = $(div).offset().top - $(window).scrollTop()

            var winHeight = $(window).height()

            var divHeight = $(div).outerHeight()

            inView(div, () => {
                var child = $(div).find('img');

                var x = (winHeight - 2 * top - divHeight) / (winHeight + divHeight)

                child.css({ "-webkit-transform": `translate3d(0px,${x * 30}%, 0px)`, "will-change": "transform" });
            })
        }
    })

    requestAnimationFrame(parallax)
}

function checkbox() {
    $(".checkbox-btn").click(function () {
        var b = $(this).siblings("input").prop('checked')
        var btn = $(this)
        var text = $(this).find(".btn-text")
        var fill = $(this).find(".btn-fill")

        const tl = gsap.timeline({ defaults: { duration: 0.4 } })

        if (b) {
            btn.attr("data-fipple", "false")
            fill.css({ background: "var(--black)" })
            text.removeClass('white')
            tl.to(fill, { transform: 'translate3d(0,-76%,0)' })
                .set(fill, { transform: 'translate3d(0,76%,0)' })
        } else {
            btn.attr("data-fipple", "true")
            fill.css({ background: "var(--black)" })
            text.addClass('white')

            tl.to(fill, { transform: 'translate3d(0,0%,0)' })

        }
    })
}

function textIntro() {
    var tml = gsap.timeline({ defaults: { duration: 1.2, ease: Power2.easeOut } })

    tml.to(".intro-nav", { opacity: 1 })
        .to(".intro-header", { opacity: 1, yPercent: -40 }, "-=0.4")
        .to(".intro-body", { opacity: 1, yPercent: -40 }, "-=0.4")

}

function imgResource(){
    let images = [...document.querySelectorAll(".img-div")]

    images.forEach((img, index)=> {
        img.style.backgroundImage = `url(/img/slides/${index + 1}.jpg)`
    }) 
}

// Image Hover effect
var width = $(".img").width();

var qoutient = 1080 / 1920

$(".img").height(qoutient * width)

$(window).on('resize', function () {
    var width = $(".img").width();
    var qoutient = 1080 / 1920
    $(".img").height(qoutient * width)
});

function hover() {
    var img = $(".img");

    img.mousemove(function (e) {
        var left = e.pageX - $(this).data("xPos");;
        var top = e.pageY - $(this).data("yPos");
        var xPerc = ((left - $(this).data("itemWidth") / 2) / $(this).data("itemWidth")) * 200;
        var yPerc = ((top - $(this).data("itemHeight") / 2) / $(this).data("itemHeight")) * 200;

        var origin = "center center -300";

        TweenMax.to($(this).data("imgOuter"), 3, {
            rotationX: 0.1 * yPerc,
            rotationY: -0.1 * xPerc,
            transformOrigin: origin,
            ease: Expo.easeOut,
        });
    });

    img.each(function () {
        $(this).data("xPos", $(this).offset().left);
        $(this).data("yPos", $(this).offset().top);
        $(this).data("itemWidth", $(this).width());
        $(this).data("itemHeight", $(this).height());
        $(this).data("imgOuter", $(this).find(".img-inner"));
    });

    img.on("mouseleave", function () {
        const tl = gsap.timeline({ defualts: { ease: "power4.out", duration: .1, } })

        tl.to($(this).data("imgOuter"), 3, { rotationX: 0, rotationY: 0 });

    });

    console.log("Workig")
}

function animteHover() {
    var $img = $(".img");

    $img.mousemove(function (e) {
        var xPos = $(this).data("xPos");
        var yPos = $(this).data("yPos");
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        var left = mouseX - xPos;
        var top = mouseY - yPos;
        var origin = "center center -300";
        var xPerc =
            ((left - $(this).data("itemWidth") / 2) / $(this).data("itemWidth")) * 200;
        var yPerc =
            ((top - $(this).data("itemHeight") / 2) / $(this).data("itemHeight")) * 200;

        TweenMax.to($(this).data("imgOuter"), 3, {
            rotationX: 0.1 * yPerc,
            rotationY: -0.1 * xPerc,
            transformOrigin: origin,
            ease: Expo.easeOut,
        });
    });

    $img.each(function () {
        $(this).data("xPos", $(this).offset().left);
        $(this).data("yPos", $(this).offset().top);
        $(this).data("itemWidth", $(this).width());
        $(this).data("itemHeight", $(this).height());
        $(this).data("imgOuter", $(this).find(".img-inner"));
    });

    $img.on("mouseleave", function () {
        TweenMax.to($(this).data("imgOuter"), 3, {
            rotationX: 0,
            rotationY: 0,
            transformOrigin: origin,
            ease: Expo.easeOut,
            duration: 1
        });
    });
}





$(window).on("load", () => {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        $(document).mousemove(e => {
            var cursor = $(".cr-cursor")
            cursor.css({ "display": "flex" })
            gsap.to(".cr-cursor", { x: e.clientX, y: e.clientY, duration: 0.1, });
        })

        setupAnimation()
        cursor()
        magenet()
        buttonHover()

        footerScroll()
        parallax()
    }
    $(window).scroll(() => {
        $(document).prop({ '--scroll-y': `${window.scrollY}px` })
    })

    if (window.location.pathname == '/' || window.location.pathname == '/index.html') {
        $slider.addEventListener('touchstart', handleTouchStart)
        $slider.addEventListener('touchmove', handleTouchMove)
        $slider.addEventListener('touchend', handleTouchEnd)

        $slider.addEventListener('mousedown', handleTouchStart)
        $slider.addEventListener('mousemove', handleTouchMove)
        $slider.addEventListener('mouseleave', handleTouchEnd)
        $slider.addEventListener('mouseup', handleTouchEnd)

        $slider.addEventListener('selectstart', () => { return false })

        render()
    }

    custOnScroll(() => {
        intersect(
            ".menu-toggle .toggle-btn",
            ".footer",
            () => { $(".toggle-btn span").css({ "background": "var(--white)" }) },
            () => { $(".toggle-btn span").css({ "background": "var(--black)" }) }
        )
    })

    emailCheck("email");

    menu()
    checkbox()
    menu_item()
    textIntro()
    imgResource()
    
    hover();
});