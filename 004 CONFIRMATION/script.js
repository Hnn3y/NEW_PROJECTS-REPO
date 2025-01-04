// Handle icon click events
const icons = document.querySelectorAll('.icons i');

icons.forEach((icon) => {
  icon.addEventListener('click', () => {
    alert(`You clicked on the ${icon.className.split(' ')[1]} icon!`);
  });
});
