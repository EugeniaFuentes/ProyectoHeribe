document.addEventListener('DOMContentLoaded', () => {
    const orderSearch = document.getElementById('order-search');
    const pendingOrdersContainer = document.querySelector('.orders-container .order-box:nth-child(1) .order-list');
    const completedOrdersContainer = document.querySelector('.orders-container .order-box:nth-child(2) .order-list');

    // Simulando las órdenes para la demostración
    let orders = [
        {
            id: '#1',
            name: 'Juan Pérez',
            date: '2024-11-23',
            time: '14:30',
            items: [
                { name: 'Tacos de lechón', quantity: 2 },
                { name: 'Recaudo', quantity: 1 }
            ],
            total: 250,
            status: 'Pendiente',
        },
        {
            id: '#2',
            name: 'María Gómez',
            date: '2024-11-23',
            time: '15:00',
            items: [
                { name: 'Tacos de carne', quantity: 3 },
                { name: 'Salsa verde', quantity: 1 }
            ],
            total: 300,
            status: 'Pendiente',
        }
    ];

    // Función para renderizar órdenes pendientes y finalizadas
    function renderOrders() {
        pendingOrdersContainer.innerHTML = '';
        completedOrdersContainer.innerHTML = '';

        orders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('order-item');
            
            const isPending = order.status === 'Pendiente';
            orderDiv.innerHTML = `
                <div class="order-summary">
                    <span><strong>Orden ${order.id} (${order.name})</strong></span>
                    <span>Folio: 000</span>
                    <span>${order.date} ${order.time}</span>
                    ${!isPending ? '<span>Pagado</span>' : ''}
                    <button class="toggle-details">▼</button>
                </div>
                <div class="order-details" style="display: none;">
                    <p><strong>Estado:</strong> ${isPending ? 'Preparando o listo' : 'Pagado'}</p>
                    <ul>
                        ${order.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}
                    </ul>
                    <p><strong>Total:</strong> $${order.total}</p>
                    ${isPending ? `
                        <div class="action-buttons">
                            <button class="btn-edit">Editar</button>
                            <button class="btn-delete">Borrar</button>
                            <button class="btn-pay">Pagar</button>
                        </div>
                    ` : ''}
                </div>
            `;
            
            // Botones funcionales
            const toggleDetails = orderDiv.querySelector('.toggle-details');
            const detailsDiv = orderDiv.querySelector('.order-details');

            toggleDetails.addEventListener('click', () => {
                detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
            });

            if (isPending) {
                // Funcionalidad del botón "Pagar"
                const payButton = orderDiv.querySelector('.btn-pay');
                payButton.addEventListener('click', () => {
                    // Mostrar ventana emergente para seleccionar método de pago
                    const paymentMethod = prompt('Selecciona el método de pago:\n1. Efectivo\n2. Tarjeta\n3. Transferencia');

                    if (paymentMethod === '1') {
                        order.paymentMethod = 'Efectivo';
                    } else if (paymentMethod === '2') {
                        order.paymentMethod = 'Tarjeta';
                    } else if (paymentMethod === '3') {
                        order.paymentMethod = 'Transferencia';
                    } else {
                        alert('Método de pago no válido');
                        return;
                    }

                    order.status = 'Pagado';
                    alert(`La orden ${order.id} ha sido pagada con ${order.paymentMethod}`);
                    renderOrders(); // Volver a renderizar las órdenes
                });

                // Funcionalidad del botón "Borrar"
                const deleteButton = orderDiv.querySelector('.btn-delete');
                deleteButton.addEventListener('click', () => {
                    if (confirm(`¿Seguro que deseas borrar la orden ${order.id}?`)) {
                        orders = orders.filter(o => o.id !== order.id);
                        renderOrders();
                    }
                });

                // Funcionalidad del botón "Editar"
                const editButton = orderDiv.querySelector('.btn-edit');
                editButton.addEventListener('click', () => {
                    alert(`Función de editar para la orden ${order.id} aún no implementada.`);
                });

                pendingOrdersContainer.appendChild(orderDiv);
            } else {
                completedOrdersContainer.appendChild(orderDiv);
            }
        });
    }

    // Buscar por número de orden
    orderSearch.addEventListener('input', () => {
        const searchTerm = orderSearch.value.toLowerCase();
        orders.forEach(order => {
            const orderDiv = document.querySelector(`.order-item:contains(${order.id})`);
            if (order.id.toLowerCase().includes(searchTerm)) {
                orderDiv.style.display = 'block';
            } else {
                orderDiv.style.display = 'none';
            }
        });
    });

    // Renderizar órdenes al cargar la página
    renderOrders();
});
