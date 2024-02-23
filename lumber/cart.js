var hiddenSection = document.getElementById('cartSection');
var targetSection = document.querySelector('#cartSection');
var buttonShow = false;
var costElement = document.getElementById('totalCost');

function toggleButtonVisibility(shouldShow) {
    if (buttonShow) {
        var btn = document.getElementById('scrollButton');
        btn.style.opacity = shouldShow ? '1' : '0';
        btn.style.pointerEvents = shouldShow ? 'auto' : 'none';
    }
}
document.getElementById('scrollButton').addEventListener('click', function () {
    if (targetSection) {
        window.scroll({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    }
});
window.addEventListener('scroll', function () {
    var scrolledPastTargetTop = window.scrollY > targetSection.offsetTop - vh(50);

    if (scrolledPastTargetTop) {
        // User has scrolled beyond the top of the designated section, fade out the button.
        toggleButtonVisibility(false);
    } else {
        // User is above or within the designated section, show/fade in button.
        toggleButtonVisibility(true);
    }
});

function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}
document.addEventListener("DOMContentLoaded", function () {
    loadOrders();

    // Event listener for button click to scroll into view
    if (localStorage.getItem("orders") !== null && localStorage.getItem("orders") != '[]') {
        hiddenSection.classList.add('show-content');
        buttonShow = true;
        toggleButtonVisibility(true);
    }
});

function addToOrder(sectionId) {
    var order = {};
    order.type = sectionId;
    if (sectionId === 'content-section1' || sectionId === 'content-section2') {
        var materialSelect = document.getElementById(sectionId).querySelector('[name=material]');
        var sizeSelect = document.getElementById(sectionId).querySelector('[name=size]');
        var price = document.getElementById(sectionId).querySelector('[id=price]');

        order.material = materialSelect.options[materialSelect.selectedIndex].value;
        order.size = sizeSelect.options[sizeSelect.selectedIndex].value;
        order.quantity = parseInt(document.getElementById(sectionId).querySelector('[name=quantity]').value);
        order.price = price.innerText.slice(0, -13);
    } else if (sectionId === 'content-section3') {
        const address = document.getElementById('address').value;
        const date = document.getElementById('delivery-date').value;
    
        // Check if either field is empty
        if (!address || !date) {
            alert("Пожалуйста, введите адрес и дату доставки!");
            return; // Exit function early
        }
    
        order.address = address;
        order.date = date;
    }
    saveOrder(order);
    loadOrders();
    buttonShow = true;
    hiddenSection.classList.add('show-content');
    toggleButtonVisibility(true);
}

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.push(order);

    localStorage.setItem('orders', JSON.stringify(orders));

    alert("Your order has been added!");
}


function loadOrders() {
    var totalPrice = 0;
    var orderData = localStorage.getItem("orders");
    const ordersDiv = document.getElementById('orders-div');

    // Clear current order list
    ordersDiv.innerHTML = '<p>Ваш заказ:</p>';

    // Parse saved orders data
    const orders = JSON.parse(orderData);

    // Create list of order elements
    orders.forEach((item, index) => {
        const orderElem = document.createElement('div');
        orderElem.className = 'order-item';
        let content = '';

        // Check what type of information should be displayed based on its type
        if (item.type === 'content-section1' || item.type === 'content-section2') {
            console.log(item.price);
            totalPrice += parseInt(item.price);
            // Set section name according to type
            const sectionName = item.type === 'content-section1' ? 'Пиломатериалы' : 'Щепа';
    
            // Compose the content string using template literals for readability
            content = `${sectionName}, ${item.material}, ${item.size} м<sup>3</sup>, ${item.quantity} шт. - ${item.price} руб.`;
        } else if (item.type === 'content-section3') {
            // Compose the content string for service orders
            content = `Услуги щеповоза, ${item.address}, ${item.date}`;
        }

        orderElem.innerHTML = content;

        // Creating and appending the remove button to each item element
        const removeBtn = document.createElement('span');
        removeBtn.textContent = 'x';
        removeBtn.className = 'remove-btn';

        // Attach click event handler to the remove button
        removeBtn.addEventListener('click', function () {
            removeFromOrder(index);
        });

        orderElem.appendChild(removeBtn);

        // Append item to container div
        ordersDiv.appendChild(orderElem);
        costElement.innerHTML = 'Стоимость заказа: ' + totalPrice +' руб. без НДС';
    });
}

function removeFromOrder(index) {
    let updatedOrders = JSON.parse(localStorage.getItem('orders'));

    if (updatedOrders && updatedOrders.length > index) {
        updatedOrders.splice(index, 1); // Remove item by index

        localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Update local storage with new array

        loadOrders(); // Refresh display
    }
}

// Initialization function when page load