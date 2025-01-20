import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  card.classList.remove('opacity-0', 'scale-95');
  card.classList.add('opacity-100', 'scale-100');
});
