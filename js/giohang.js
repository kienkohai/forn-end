let list = document.querySelectorAll('.list .item');

list.forEach(item => {
    item.addEventListener('click', function(event){
        if(event.target.classList.contains('add')){
            var itemNew = item.cloneNode(true);
            let checkIsset  = false;

            let listCart = document.querySelectorAll('.cart .item');
            listCart.forEach(cart =>{
                if(cart.getAttribute('data-key') == itemNew.getAttribute('data-key')){
                    checkIsset = true;
                    cart.classList.add('danger');
                    setTimeout(function(){
                        cart.classList.remove('danger');
                    },1000)
                }
            })
            if(checkIsset == false){
                document.querySelector('.listCart').appendChild(itemNew);
            }
            updateTotal(); // Update total price
        }
    });
});

function Remove($key){
    let listCart = document.querySelectorAll('.cart .item');
    listCart.forEach(item => {
        if(item.getAttribute('data-key') == $key){
            item.remove();
            updateTotal(); // Update total price
            return;
        }
    });
}

function updateTotal() {
    let totalPrice = 0;
    document.querySelectorAll('.cart .item').forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
        const count = parseInt(item.querySelector('.count').value);
        totalPrice += price * count;
    });
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}
let cart = [];

function addToCart(item) {
    cart.push(item);
    renderCart();
}

function removeFromCart(itemKey) {
    cart = cart.filter(item => item.key !== itemKey);
    renderCart();
}

function renderCart() {
    const listCart = document.querySelector('.listCart');
    listCart.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <div>${item.title} - ${item.price}</div>
            <div>Quantity: ${item.quantity}</div>
            <button onclick="removeFromCart(${item.key})">Remove</button>
        `;
        listCart.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });
    
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}
