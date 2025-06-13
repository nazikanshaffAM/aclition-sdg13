const cart = [];

function addToCart(productName, productPrice) {
    // this function is to add product and price to cart
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    displayCart();
}

function updateQuantity(productIndex, quantity) {
    // this function is to update quantity in the cart
    if (quantity <= 0) {
        cart.splice(productIndex, 1);
    } else {
        cart[productIndex].quantity = quantity;
    }
    displayCart();
}

function displayCart() {
    // This function is to display product in cart
    const cartDiv = document.getElementById('cart');
    const totalDiv = document.getElementById('total');
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Cart is empty</p>';
        totalDiv.innerHTML = '';
    } else {
        cartDiv.innerHTML = cart.map((item, index) => `
            <li>
                ${item.name} - RS ${item.price.toFixed(2)} x 
                <input type="number" value="${item.quantity}" min="0" onchange="updateQuantity(${index}, this.value)">
            </li>
        `).join('');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalDiv.innerHTML = `Total: Rs ${total.toFixed(2)}`;
    }
}

function clearCart() {
    // this function is for clearing cart
    cart.length = 0;
    displayCart();
}

function showCheckout() {
    if (cart.length === 0) {
        alert('Cart is empty. Add some items to proceed.');
    } else {
        const modal = document.getElementById('checkout-modal');
        modal.style.display = 'block';
        displayOrderSummary();
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}

function displayOrderSummary() {
    // this function is to display order summary
    const orderSummaryDiv = document.getElementById('order-summary');
    orderSummaryDiv.innerHTML = `
        <h3>Order Summary</h3>
        <ul>
            ${cart.map(item => `<li>${item.name} - Rs ${item.price.toFixed(2)} x ${item.quantity}</li>`).join('')}
        </ul>
        <p>Total: Rs ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
    `;
}

function submitOrder(event) {
    event.preventDefault();

    
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zipcode = document.getElementById('zipcode').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // for validation
    if (!isValidCardNumber(cardNumber)) {
        alert('Please enter a valid card number.');
        return;
    }

    if (!isValidExpiry(expiry)) {
        alert('Please enter a valid expiry date in MM/YY format.');
        return;
    }

    if (!isValidCVV(cvv)) {
        alert('Please enter a valid CVV.');
        return;
    }

    if (address === '') {
        alert('Please enter your address.');
        return;
    }

    if (city === '') {
        alert('Please enter your city.');
        return;
    }

    if (!isValidZipcode(zipcode)) {
        alert('Please enter a valid zip code.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!isValidPhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    // If all validations pass, simulate order submission
    alert('Order placed successfully!');
    closeCheckoutModal();
    clearCart();
}

function isValidCardNumber(cardNumber) {
    // validation for 16 digits
    return /^\d{16}$/.test(cardNumber);
}

function isValidExpiry(expiry) {
    
    return /^\d{2}\/\d{2}$/.test(expiry);
}

function isValidCVV(cvv) {
    
    return /^\d{3,4}$/.test(cvv);
}

function isValidZipcode(zipcode) {
    // validation for 5 digit
    return /^\d{5}$/.test(zipcode);
}

function isValidEmail(email) {
    // validation for email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    //validation for 10digit
    return /^\d{10}$/.test(phone);
}
