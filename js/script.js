// Horizontal scroll
let tlMain = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section-height",
      start: "top top",
      end: "98% bottom",
      scrub: 1,
    },
  })
  .to(".section-track", { xPercent: -100, ease: "none" });

// hero photo
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".panel-02",
      containerAnimation: tlMain,
      start: "left left",
      end: "right left",
      scrub: true,
      markers: true,
    },
  })
  .to(".field-img-wrap", { x: "0vw" });

console.log("Wokring");
