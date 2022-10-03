/*--------------------
Vars
--------------------*/
const $slider = document.querySelector('.slider-wrapper')
const $items = document.querySelectorAll('.slider-item')
let sliderWidth = $slider.clientWidth
let itemWidth = $items[0].clientWidth
let wrapWidth = $items.length * itemWidth

let scrollSpeed = 0
let oldScrollY = 0
let scrollY = 0
let y = 0


/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => { return v0 * (1 - t) + v1 * t }


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
dispose(0)


/*--------------------
Wheel
--------------------*/
// const handleMouseWheel = (e) => { scrollY -= e.deltaY * 0.9 }


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
Listeners
--------------------*/
// $slider.addEventListener('mousewheel', handleMouseWheel)

$slider.addEventListener('touchstart', handleTouchStart)
$slider.addEventListener('touchmove', handleTouchMove)
$slider.addEventListener('touchend', handleTouchEnd)

$slider.addEventListener('mousedown', handleTouchStart)
$slider.addEventListener('mousemove', handleTouchMove)
$slider.addEventListener('mouseleave', handleTouchEnd)
$slider.addEventListener('mouseup', handleTouchEnd)

$slider.addEventListener('selectstart', () => { return false })


/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
    sliderWidth = $slider.clientWidth
    itemWidth = $items[0].clientWidth
    wrapWidth = $items.length * itemWidth
})


/*--------------------
Render
--------------------*/
const render = () => {
    requestAnimationFrame(render)
    y = lerp(y, scrollY, .1)
    dispose(y)

    scrollSpeed = y - oldScrollY
    oldScrollY = y
}
render()


const autorender = () => { requestAnimationFrame(autorender); scrollY += -0.8 }
autorender()
