document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.transition = 'all 0.2s ease-in-out';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  });
  
  const orderNowButton = document.querySelector('.btn-orange');
  const checkRatesButton = document.querySelector('.btn-outline-light');
  
  orderNowButton.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Order Now functionality coming soon!');
  });
  
  checkRatesButton.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Check Rates functionality coming soon!');
  });
  
  orderNowButton.addEventListener('click', () => {
    orderNowButton.style.backgroundColor = '#e67e22'; 
    setTimeout(() => {
      orderNowButton.style.backgroundColor = '#f39c12'; 
    }, 300);
  });
  
  checkRatesButton.addEventListener('click', () => {
    checkRatesButton.style.backgroundColor = '#cccccc'; 
    setTimeout(() => {
      checkRatesButton.style.backgroundColor = ''; 
    }, 300);
  });