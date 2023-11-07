
let totalCost = 0;
let roundedTotalCost = 0

// Get total from cookie if it exists
let cookieTotal = getCookie('cartTotal');
if(cookieTotal) {
  totalCost = parseFloat(cookieTotal);
}
document.getElementById('cart-total').innerText = 'Your total: $' + totalCost;
// Add event listeners to each button
let addButtons = document.querySelectorAll('.product button');
addButtons.forEach(button => {
  button.addEventListener('click', () => {
    let price = button.parentElement.querySelector('p').innerText;
    let cost = parseFloat(price.replace('$', ''));

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
  