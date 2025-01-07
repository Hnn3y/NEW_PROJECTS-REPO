document.addEventListener("DOMContentLoaded", () => {
    const sizeElements = document.querySelectorAll('.sizes span');
    sizeElements.forEach((size) => {
        size.addEventListener('click', () => {
            sizeElements.forEach((s) => s.classList.remove('focus'));
            size.classList.add('focus');
        });
    });

    const slideButtons = document.querySelectorAll('.slide-buttons span');
    slideButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            slideButtons.forEach((b) => b.classList.remove('focus'));
            button.classList.add('focus');
        });
    });

    const cartButton = document.querySelector('.cart');
    cartButton.addEventListener('click', () => {
        const selectedSize = document.querySelector('.sizes .focus').textContent;
        alert(`Added Ford GT40 size ${selectedSize} to cart!`);
    });

    const reactButton = document.querySelector('.react');
    reactButton.addEventListener('click', () => {
        alert('You liked the Ford GT40!');
    });
});