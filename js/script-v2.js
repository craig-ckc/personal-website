// Optional - Set sticky section heights based on inner content width
// Makes scroll timing feel more natural
function setTrackHeights() {
  $(".section-height").each(function (index) {
    let trackWidth = $(this).find(".section-track").outerWidth();
    $(this).height(trackWidth);
  });
}
setTrackHeights();
window.addEventListener("resize", function () {
  setTrackHeights();
});

// LENIS SMOOTH SCROLL
let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Horizontal scroll
let tlMain = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section-height",
      start: "top top",
      end: "98% bottom",
      scrub: 1
    }
  })
  .to(".section-track", {
    xPercent: -100,
    ease: "none"
  });
  
  // Hero image
  gsap
  .timeline({
    scrollTrigger: {
      trigger: ".empty-panel",
      containerAnimation: tlMain,
      start: "left left",
      end: "right left",
      scrub: true
    }
  }).fromTo(".img-wrap.is-full.is-hero",
  	{ xPercent: -33.33, transform: 'translate3d(0,0,0)', },
  	{ xPercent: 15, transform: 'translate3d(0,0,0)', ease: "none" }
  );
  
  // values panel
  gsap
  .timeline({
    scrollTrigger: {
      trigger: ".value-panel",
      containerAnimation: tlMain,
      start: "left left",
      end: "right right",
      scrub: true
    }
  })
  .to(".value-container", { xPercent: 300, ease: "none" });
  
// innovation panel
  gsap
  .timeline({
    scrollTrigger: {
      trigger: ".innovation-panel",
      containerAnimation: tlMain,
      start: "left left",
      end: "right right",
      scrub: true
    }
  })
  .to(".clip-wrap", { xPercent: 300, ease: "none" })
  .fromTo(
    ".trust-container",
    {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
    },
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" },
    0
  );


console.log("v2 working still bb again");
