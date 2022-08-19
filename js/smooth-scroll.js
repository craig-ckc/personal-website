let prev = 0;
let current = 0;
let target = 0;
let ease = 0.13;
let currentDis = 0;
let scroll = true;
let isScrolling = false;
let scrolltrackHover = false;

let cointainer = '.scroll-wrap';
let body = document.body;

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function resize(el, height) {
    el.style.height = `${height}px`
}


function smoothScroll() {
    prev = current

    current = parseFloat(lerp(current, target, ease).toFixed(2));

    target = scroll ? window.scrollY : current;

    isScrolling = (prev != current)

    $(cointainer).css({ 'transform': `translateY(${-current}px)` })

    requestAnimationFrame(smoothScroll)
}

function scrollbar() {
    var scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    var per = window.scrollY / scrollMaxY

    var height = ($(window).height() / scrollMaxY) * $(".scrolltrack").height()

    var trackHeight = $(".scrolltrack").height() - height

    $('.scrollbar').css({ 'transform': `translateY(${trackHeight * per}px)`, 'height': `${height}px` })
}

function scrollWrap() {
    $(".content-wrap").css({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100vh"
    });

    $(".scroll-wrap").css({
        'position': 'absolute',
        "z-index": "1",
        'width': '100vw',
        'will-change': 'transform',
    })
}

function scrollLock(active) {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        if (active) {
            scroll = false;
        } else {
            scroll = true;
            window.scroll(0, current)
        }
    } else {
        if (active) {
            const scrollY = $(document).prop('--scroll-y')
            $(document.body).css({ 'position': 'fixed', 'top': `-${scrollY}` })
        } else {
            const scrollY = $('body').css('top')
            $(document.body).css({ 'position': '', 'top': '' })
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
}

function scrollbarOpacity() {
    var scrollbar = $(".scrollbar")
    if (isScrolling) {
        scrollbar.removeClass("disappear")
    } else {
        if(!scrolltrackHover) scrollbar.addClass("disappear")
    }

    requestAnimationFrame(scrollbarOpacity)
}

function scrollbarHover() {
    $('.scrolltrack').hover(
        function () {
            $(".scrollbar").removeClass("disappear")
            scrolltrackHover = true
        }, function () {
            $(".scrollbar").addClass("disappear")
            scrolltrackHover = false
        }
    );
}

function custOnScroll(func) {
    if (isScrolling) func()

    requestAnimationFrame(() => { custOnScroll(func) })
}

function onResize() {
    $(window).on('resize', function () {
        resize(body, $(cointainer).outerHeight())
    });
}

function setupAnimation() {
    $('.scrolltrack').css({ 'display': 'block' })

    scrollbarHover()

    scrollWrap()

    resize(body, $(cointainer).outerHeight())

    smoothScroll()

    $(window).scroll(() => {
        scrollbar()
    })

    onResize()

    scrollbarOpacity()



}

