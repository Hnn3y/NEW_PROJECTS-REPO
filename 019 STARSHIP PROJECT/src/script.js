import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

    document.addEventListener("DOMContentLoaded", () => {
      gsap.fromTo(
        "#card",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
      );
    });
