document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuHamburger = document.getElementById('menuHamburger');
    const cartButton = document.getElementById('cartButton');
    const cartPopup = document.getElementById('cartPopup');
    const closeCart = document.getElementById('closeCart');
    const contactForm = document.getElementById('contactForm');
    const featuredModels = document.querySelectorAll('.model');
    const largeImage = document.getElementById('largeImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const addToCart = document.getElementById('addToCart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    menuHamburger.addEventListener('click', () => {
        navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
    });

    cartButton.addEventListener('click', () => {
        cartPopup.style.display = 'block';
        updateCart();
    });

    closeCart.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        localStorage.setItem('nome', nome);
        localStorage.setItem('email', email);
        localStorage.setItem('telefone', telefone);
        alert('Informações salvas!');
        // Aqui você enviaria os dados para a API do "dronahq"
    });

    featuredModels.forEach(model => {
        model.addEventListener('click', () => {
            window.location.href = `product.html?id=${model.dataset.id}`;
        });
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            largeImage.src = thumbnail.src;
        });
    });

    addToCart.addEventListener('click', () => {
        const quantity = document.getElementById('quantity').value;
        const size = document.getElementById('size').value;
        const productName = 'Nome do Produto';
        const productPrice = 100; // Preço fixo para exemplo
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = { name: productName, quantity: parseInt(quantity), size, price: productPrice };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produto adicionado ao carrinho!');
        updateCart();
    });

    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            cartItems.innerHTML += `<p>${item.name} - ${item.quantity} x R$${item.price}</p>`;
            total += item.quantity * item.price;
        });
        cartTotal.innerHTML = `<p>Total: R$${total}</p>`;
    }

    // Preenchendo o formulário com dados do localStorage, se existirem
    document.getElementById('nome').value = localStorage.getItem('nome') || '';
    document.getElementById('email').value = localStorage.getItem('email') || '';
    document.getElementById('telefone').value = localStorage.getItem('telefone') || '';
});
