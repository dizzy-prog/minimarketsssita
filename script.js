const products = [
    { id: 1, name: 'bengbeng', price: 2000, img: 'img/bengbeng.jpg' },
    { id: 2, name: 'boncabe', price: 1000, img: 'img/boncabe.webp' },
    { id: 3, name: 'chocopie', price: 2000, img: 'img/cocopie.png' },
    { id: 4, name: 'maxicorn', price: 2000, img: 'img/maxicorn.png' },
    { id: 5, name: 'qtela singkong', price: 2000, img: 'img/qtela singkong.jpg' },
    { id: 6, name: 'qtela', price: 2000, img: 'img/qtela.avif' }
];

let cart = [];

// Menampilkan daftar produk
function displayProducts() {
    const productsContainer = document.getElementById('products');

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}"
                 alt="${product.name}"
                 width="150">

            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Tambah ke keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Menambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Menampilkan isi keranjang
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;

        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const payment = Number(prompt(
        `Total belanja Anda Rp ${total}. Masukkan jumlah pembayaran:`
    ));

    if (payment >= total && payment > 0) {
        alert(`Pembayaran berhasil! Kembalian Anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi atau pembayaran tidak valid.');
    }
}

// Tombol checkout
document.getElementById('checkout-btn')
    .addEventListener('click', checkout);

// Menampilkan produk saat halaman siap
document.addEventListener('DOMContentLoaded', displayProducts);