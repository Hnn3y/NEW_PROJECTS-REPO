// Example: Smooth scroll for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
      alert('Button Clicked!');
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const typingText = "Experience Luxury On The Road";
    const headingElement = document.querySelector("h1");
    let index = 0;
  
    function typeText() {
      if (index < typingText.length) {
        headingElement.innerHTML += typingText[index];
        index++;
        setTimeout(typeText, 100);
      }
    }
  
    headingElement.innerHTML = ""; // Clear text for typing effect
    typeText();
  });
    