const products = [
    {
        id: 1,
        name: "Afeitadora MOd 777 plástica negra",
        price: 9450,
        img: "https://via.placeholder.com/150?text=Afeitadora+777"
    },
    {
        id: 2,
        name: "Afeitadora recargable Mod 776 metálica",
        price: 10000,
        img: "https://via.placeholder.com/150?text=Afeitadora+776"
    },
    {
        id: 3,
        name: "Airpod 2",
        price: 45000,
        img: "https://via.placeholder.com/150?text=Airpod+2"
    },
    {
        id: 4,
        name: "Airpods MAX",
        price: 39000,
        img: "https://via.placeholder.com/150?text=Airpods+MAX"
    }
];

const productsGrid = document.getElementById('productsGrid');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const btnCheckout = document.getElementById('btnCheckout');

let cart = [];

// Renderizar productos
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>$${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productsGrid.appendChild(card);
    });
}

// Agregar al carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    renderCart();
}

// Renderizar carrito
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Precio: $${item.price.toLocaleString()}</p>
                <p>Cantidad: ${item.quantity}</p>
            </div>
            <div class="cart-item-qty">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeItem(${item.id})" title="Eliminar">&#10006;</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = total.toLocaleString();
}

// Cambiar cantidad en carrito
function changeQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    renderCart();
}

// Eliminar ítem
function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
}

// Finalizar compra (simulación + abrir mail y whatsapp)
btnCheckout.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Crear texto resumen para email y WhatsApp
    let resumen = 'Compra realizada:%0A'; // %0A es salto de línea en URL
    let total = 0;

    cart.forEach(item => {
        resumen += `${item.name} - Cantidad: ${item.quantity} - Precio unitario: $${item.price.toLocaleString()}%0A`;
        total += item.price * item.quantity;
    });

    resumen += `%0ATotal: $${total.toLocaleString()}%0AGracias por comprar en Modoon!`;

    // Enlace mailto
    const email = 'lautadah@gmail.com';
    const subject = encodeURIComponent('Nueva compra en Modoon');
    const body = resumen;

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // Enlace WhatsApp
    const phone = '5492604317434'; // +54 Argentina código país y código área sin 0
    const whatsappLink = `https://wa.me/${phone}?text=${resumen}`;

    // Abrir correo y whatsapp en pestañas nuevas
    window.open(mailtoLink, '_blank');
    window.open(whatsappLink, '_blank');

    alert('Se abrirá el cliente de correo y WhatsApp para confirmar el envío de tu compra.');

    cart = [];
    renderCart();
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = 'Por favor, completa todos los campos.';
        formMessage.style.color = 'red';
        return;
    }

    formMessage.textContent = 'Mensaje enviado correctamente. ¡Gracias!';
    formMessage.style.color = '#0af';
    contactForm.reset();
});

// Inicializar
renderProducts();
renderCart();
