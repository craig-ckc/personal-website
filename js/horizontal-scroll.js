/*--------------------
Vars
--------------------*/
const $slider = document.querySelector('.slider-wrapper')
const $items = document.querySelectorAll('.slider-item')
const $items_img = document.querySelectorAll('.slider-item .img-div')
let itemWidth = $items[0].clientWidth
// let itemWidth = $items[0].clientWidth + (window.innerWidth * .015)
let wrapWidth = $items.length * itemWidth

let scrollSpeed = 0
let oldScrollY = 0
let scrollY = 0
let y = 0


/*--------------------
Lerp
--------------------*/
// const lerp = (v0, v1, t) => { return v0 * (1 - t) + v1 * t }


/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
    gsap.set($items, {
        x: (i) => { return i * itemWidth + scroll },
        modifiers: {
            x: (x, target) => {
                const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
                return `${s}px`
            }
        }
    })
}


/*--------------------
Touch
--------------------*/
let touchStart = 0
let touchX = 0
let isDragging = false
const handleTouchStart = (e) => {
    touchStart = e.clientX || e.touches[0].clientX
    isDragging = true
    $slider.classList.add('is-dragging')
}
const handleTouchMove = (e) => {
    if (!isDragging) return
    touchX = e.clientX || e.touches[0].clientX
    scrollY += (touchX - touchStart) * 2.5
    touchStart = touchX
}
const handleTouchEnd = () => {
    isDragging = false
    $slider.classList.remove('is-dragging')
}


/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
    itemWidth = $items[0].clientWidth
    wrapWidth = $items.length * itemWidth
})


/*--------------------
Render
--------------------*/
const render = () => {
    requestAnimationFrame(render)

    scrollY += -0.8 // used for autoscroll

    y = lerp(y, scrollY, .06)
    dispose(y)

    scrollSpeed = y - oldScrollY
    oldScrollY = y
}