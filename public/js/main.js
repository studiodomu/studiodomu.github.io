(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    let loader = document.getElementById("loading-screen");
    let video = document.getElementById("video-intro");
    let content = document.getElementById("content");
    let nav = document.getElementById("nav");
    let startButton = document.getElementById("start-button");
    let logo = new SplitType("#logo", { types: "chars" });
    let text_hero = new SplitType("#hero-text", { types: "chars" });
    let tl_logo = gsap.timeline();
    tl_logo.from(logo.chars, { yPercent: 100, opacity: 0, ease: "sine.out", stagger: { from: "center", amount: 0.5, ease: "power1.out" } });
    tl_logo.from("#menu li", { opacity: 0, stagger: { each: 0.25 } });
    let about = gsap.utils.toArray("#about-text span");
    gsap.from("#about-text".children, {
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom center",
        toggleActions: "restart pause reverse pause"
      },
      yPercent: 100
    });
    let typeSplit = new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span"
    });
    function createScrollTrigger(triggerElement, timeline) {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(0);
          timeline.pause();
        }
      });
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 60%",
        onEnter: () => timeline.play()
      });
    }
    const wordsSlideUpElements = document.querySelectorAll("[words-slide-up]");
    wordsSlideUpElements.forEach((element, index) => {
      let tl = gsap.timeline({ paused: true });
      const words = element.querySelectorAll(".word");
      tl.from(words, { opacity: 0, yPercent: 100, duration: 0.5, ease: "back.out(2)", stagger: { amount: 0.5 } });
      createScrollTrigger(element, tl);
    });
    const wordsRotateInElements = document.querySelectorAll("[words-rotate-in]");
    wordsRotateInElements.forEach((element, index) => {
      let tl = gsap.timeline({ paused: true });
      const words = element.querySelectorAll(".word");
      tl.set(words, { transformPerspective: 1e3 });
      tl.from(words, { rotationX: -90, duration: 0.6, ease: "power2.out", stagger: { amount: 0.6 } });
      createScrollTrigger(element, tl);
    });
    const wordsSlideFromRightElements = document.querySelectorAll("[words-slide-from-right]");
    wordsSlideFromRightElements.forEach((element, index) => {
      let tl = gsap.timeline({ paused: true });
      const words = element.querySelectorAll(".word");
      tl.from(words, { opacity: 0, x: "1em", duration: 0.6, ease: "power2.out", stagger: { amount: 0.2 } });
      createScrollTrigger(element, tl);
    });
    const lettersSlideUpElements = document.querySelectorAll("[letters-slide-up]");
    lettersSlideUpElements.forEach((element, index) => {
      let tl = gsap.timeline({ paused: true });
      const chars = element.querySelectorAll(".char");
      tl.from(chars, { yPercent: 100, duration: 0.2, ease: "power1.out", stagger: { amount: 0.6 } });
      createScrollTrigger(element, tl);
    });
    const lettersSlideDownElements = document.querySelectorAll("[letters-slide-down]");
    lettersSlideDownElements.forEach((element, index) => {
      let tl = gsap.timeline({ paused: true });
      const chars = element.querySelectorAll(".char");
      tl.from(chars, { yPercent: -120, duration: 0.3, ease: "power1.out", stagger: { amount: 0.7 } });
      createScrollTrigger(element, tl);
    });
    const lettersFadeInElements = document.querySelectorAll("[letters-fade-in]");
    lettersFadeInElements.forEach((element, index) => {
      let tl = gsap.timeline({ paused: true });
      const chars = element.querySelectorAll(".char");
      tl.from(chars, { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
      createScrollTrigger(element, tl);
    });
    const lettersFadeInRandomElements = document.querySelectorAll("[letters-fade-in-random]");
    lettersFadeInRandomElements.forEach((element, index) => {
      let tl = gsap.timeline({ paused: true });
      const chars = element.querySelectorAll(".char");
      tl.from(chars, { opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" } });
      createScrollTrigger(element, tl);
    });
    const scrubEachWordElements = document.querySelectorAll("[scrub-each-word]");
    scrubEachWordElements.forEach((element, index) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "top center",
          scrub: true
        }
      });
      const words = element.querySelectorAll(".word");
      tl.from(words, { opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 } });
    });
    gsap.set("[text-split]", { opacity: 1 });
    let cursor = document.querySelector(".cursor");
    let cursorScale = document.querySelectorAll(".cursor-scale");
    let mouseX = 0;
    let mouseY = 0;
    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: function() {
        gsap.set(cursor, {
          css: {
            left: mouseX,
            top: mouseY
          }
        });
      }
    });
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    cursorScale.forEach((link) => {
      link.addEventListener("mousemove", () => {
        cursor.classList.add("grow");
        if (link.classList.contains("small")) {
          cursor.classList.remove("grow");
          cursor.classList.add("grow-small");
        }
      });
      link.addEventListener("mouseleave", () => {
        cursor.classList.remove("grow");
        cursor.classList.remove("grow-small");
      });
    });
  });
})();
