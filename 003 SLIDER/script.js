const card = document.querySelector('.testimonial-card');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let rotation = -5;

prevButton.addEventListener('click', () => {
  rotation -= 10;
  card.style.transform = `rotate(${rotation}deg)`;
});

nextButton.addEventListener('click', () => {
  rotation += 10;
  card.style.transform = `rotate(${rotation}deg)`;
});
