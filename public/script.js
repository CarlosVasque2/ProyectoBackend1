document.addEventListener('DOMContentLoaded', async () => {
    // Carga inicial de productos
    await loadProducts();

    // Manejar el formulario de filtrado
    const filterForm = document.getElementById('filter-form');
    filterForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir el envío normal del formulario
        await loadProducts();
    });

    // Manejo del formulario de nuevo producto
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

    // Manejo de la actualización de productos en tiempo real
    const socket = io();
    socket.on('updateProducts', (products) => {
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.title} - ${product.price}`;
            productsList.appendChild(li);
        });
    });
});

// Función para cargar productos
async function loadProducts() {
    const limit = document.getElementById('limit').value || 10;
    const page = document.getElementById('page').value || 1;
    const query = document.getElementById('query').value || '';

    const response = await fetch(`/api/products?limit=${limit}&page=${page}&query=${query}`);
    const data = await response.json();

    const productsList = document.getElementById('productsList');
    productsList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos

    data.payload.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.price}`;
        productsList.appendChild(li);
    });

    // Actualizar la paginación
    updatePagination(data.totalPages, data.page);
}

// Función para actualizar la paginación
function updatePagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Limpiar paginación existente

    for (let page = 1; page <= totalPages; page++) {
        const link = document.createElement('a');
        link.href = `#`;
        link.textContent = page;
        link.onclick = async (e) => {
            e.preventDefault();
            document.getElementById('page').value = page; // Actualizar el valor de la página
            await loadProducts(); // Cargar productos de la página seleccionada
        };

        if (page === currentPage) {
            link.style.fontWeight = 'bold'; // Marcar la página actual
        }

        pagination.appendChild(link);
    }
}

