var hiddenSection = document.getElementById('cartSection');
document.addEventListener("DOMContentLoaded", function() {
    loadOrders();
});

function addToOrder(sectionId) {
    var order = {};
    order.type = sectionId;
    if (sectionId === 'content-section1' || sectionId === 'content-section2') {
        var materialSelect = document.getElementById(sectionId).querySelector('[name=material]');
        var sizeSelect = document.getElementById(sectionId).querySelector('[name=size]');

        order.material = materialSelect.options[materialSelect.selectedIndex].value;
        order.size = sizeSelect.options[sizeSelect.selectedIndex].value;
        order.quantity = parseInt(document.getElementById(sectionId).querySelector('[name=quantity]').value);
    } else if (sectionId === 'content-section3') {
        order.address = document.getElementById('address').value;
        order.date = document.getElementById('delivery-date').value;
    }
    saveOrder(order);
    loadOrders();
    hiddenSection.classList.add('show-content');
}

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.push(order);

    localStorage.setItem('orders', JSON.stringify(orders));

    alert("Your order has been added!");
}

if (localStorage.getItem("orders") !== null && localStorage.getItem("orders").length > 0) {
    hiddenSection.classList.add('show-content');
}
function loadOrders() {
    var orderData= localStorage.getItem("orders");
    const ordersDiv = document.getElementById('orders-div');

    // Clear current order list
    ordersDiv.innerHTML = '';

    // Parse saved orders data
    const orders = JSON.parse(orderData);

    // Create list of order elements
    orders.forEach((item, index) => {
        const orderElem = document.createElement('div');
        orderElem.className = 'order-item';
        let content = '';

        // Check what type of information should be displayed based on its type
        if (item.type.includes('section')) {
            content += `Type: ${item.type}, Material: ${item.material}, Size: ${item.size}, Quantity: ${item.quantity}`;
        } else {
            content += `Address:${item.address}, Date:${item.date}`;
        }

        orderElem.textContent = content;

        // Creating and appending the remove button to each item element
        const removeBtn = document.createElement('span');
        removeBtn.textContent = 'x';
        removeBtn.className = 'remove-btn';

         // Attach click event handler to the remove button
         removeBtn.addEventListener('click', function() {
            removeFromOrder(index);
         });

         orderElem.appendChild(removeBtn);

      // Append item to container div
      ordersDiv.appendChild(orderElem);
   });
}

function removeFromOrder(index) {
   let updatedOrders = JSON.parse(localStorage.getItem('orders'));

   if (updatedOrders && updatedOrders.length > index) {
      updatedOrders.splice(index, 1);       // Remove item by index

      localStorage.setItem('orders', JSON.stringify(updatedOrders));   // Update local storage with new array

      loadOrders();                         // Refresh display
   }
}

// Initialization function when page loads:
loadOrders();