
let totalCost = 0;
let roundedTotalCost = 0

// Get total from cookie if it exists
let cookieTotal = getCookie('cartTotal');
if(cookieTotal) {
  totalCost = parseFloat(cookieTotal);
  roundedTotalCost = totalCost.toFixed(2);
}
document.getElementById('cart-total').innerText = 'Your total: $' + roundedTotalCost;
// Add event listeners to each button
let addButtons = document.querySelectorAll('.product2 button');
addButtons.forEach(button => {
  button.addEventListener('click', () => {
    let priceElement = button.parentElement.querySelector('p');

    // Get non-crossed-out price
    let price = priceElement.innerText.split('$')[priceElement.innerText.split('$').length-1];
    // Parse price
    let cost = parseFloat(price);
    totalCost += cost;
    roundedTotalCost = totalCost.toFixed(2);
    document.getElementById('cart-total').innerText = 'Your total: $' + roundedTotalCost;
    // Save updated total to cookie
    setCookie('cartTotal', totalCost, 30);
  });
});
let clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  totalCost = 0;
  document.getElementById('cart-total').innerText = 'Your total: $0';
  // Save updated total to cookie
  setCookie('cartTotal', totalCost, 30);
});

// Helper functions for cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  
  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});