let order = [];
    let orderNumber = 1;
    let folioNumber = 1;

    // Función para mostrar las categorías del producto
    function showCategoryModal(product, price, categories) {
        const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
        const categoryOptions = document.getElementById('category-options');
        categoryOptions.innerHTML = '';

        categories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-warning', 'mb-2');
            button.textContent = category;
            button.onclick = () => {
                addToOrder(`${product} (${category})`, price);
                modal.hide();  // Cerrar modal después de agregar el producto
            };
            categoryOptions.appendChild(button);
        });

        modal.show();
    }

    // Agregar producto a la orden
    function addToOrder(name, price) {
        const existingItem = order.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            order.push({ name, price, quantity: 1 });
        }
        updateOrderSummary();
    }

    function updateOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const totalPrice = document.getElementById('total-price');
    orderItems.innerHTML = '';
    let total = 0;

    order.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
        div.innerHTML = `
            <div>${item.name} - $${item.price} x ${item.quantity}</div>
            <div>
                <button class="btn btn-sm btn-danger" onclick="decreaseQuantity(${index})">-</button>
                <button class="btn btn-sm btn-success" onclick="increaseQuantity(${index})">+</button>
            </div>
        `;
        orderItems.appendChild(div);
    });

    // Asegúrate de solo agregar el signo de dólar una vez
    totalPrice.innerText = `${total.toFixed(2)}`;
}


    // Aumentar la cantidad de un producto en la orden
    function increaseQuantity(index) {
        order[index].quantity++;
        updateOrderSummary();
    }

    // Disminuir la cantidad de un producto en la orden
    function decreaseQuantity(index) {
        if (order[index].quantity > 1) {
            order[index].quantity--;
        } else {
            order.splice(index, 1);
        }
        updateOrderSummary();
    }

    // Función para enviar la orden
    function submitOrder() {
        const clientName = document.getElementById('client-name').value;
        if (!clientName || order.length === 0) {
            alert('Por favor, agrega productos y el nombre del cliente.');
            return;
        }

        // Mostrar mensaje de éxito
        alert('¡Orden agregada con éxito!');

        // Mostrar la información de la orden en la consola
        console.log({
            orderNumber: formatOrderNumber(orderNumber),
            folioNumber: formatFolioNumber(folioNumber),
            clientName,
            order
        });

        // Resetear la orden después de agregarla
        resetOrder();
    }

    // Resetear la orden y actualizar los números de orden
    function resetOrder() {
        order = [];
        document.getElementById('order-items').innerHTML = '';
        document.getElementById('total-price').innerText = '0.00'; // Resetear el total
        document.getElementById('client-name').value = '';
        orderNumber++;
        folioNumber++;
        document.getElementById('order-number').innerText = formatOrderNumber(orderNumber);
        document.getElementById('folio-number').innerText = formatFolioNumber(folioNumber);
    }

    // Función para formatear el número de orden con un cero si es menor que 10
    function formatOrderNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    // Función para formatear el número de folio con un cero si es menor que 10
    function formatFolioNumber(number) {
        return number < 10 ? `0${number}` : number;
    }