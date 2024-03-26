(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    const text = new SplitType("#heading", { types: "chars" });
    const text2 = new SplitType("#heading-2", { types: "chars" });
    gsap.set(text.chars, { yPercent: 100 });
    gsap.set(text2.chars, { yPercent: -100 });
    gsap.to(text.chars, {
      yPercent: 0,
      ease: "sine.out",
      stagger: { from: "center", amount: 0.5, ease: "power1.out" }
    });
    gsap.to(text2.chars, {
      delay: 0.5,
      yPercent: 0,
      ease: "sine.out",
      stagger: { from: "center", amount: 0.5, ease: "power1.out" }
    });
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
