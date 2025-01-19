import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  gsap.fromTo(
    "#card",
    { scale: 0.9, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#card",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
});
