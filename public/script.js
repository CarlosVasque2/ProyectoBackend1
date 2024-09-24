const socket = io();

const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(productForm);
    const productData = {};
    formData.forEach((value, key) => {
        productData[key] = value;
    });
    
    socket.emit('newProduct', productData);
    productForm.reset();
});

socket.on('updateProducts', (products) => {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.price}`;
        productsList.appendChild(li);
    });
});
