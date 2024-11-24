document.addEventListener("DOMContentLoaded", () => {
    const ordersContainer = document.getElementById("orders-container");
    const messageContainer = document.getElementById("message-container"); // El contenedor del mensaje

    // Ordenes de ejemplo
    const orders = [
        { id: 6, cliente: "Sofía Herrera", items: [{ name: "Chilaquiles", quantity: 1, price: 60 }, { name: "Café", quantity: 1, price: 25 }, { name: "Chilaquiles", quantity: 1, price: 60 }, { name: "Café", quantity: 1, price: 25 }, { name: "Chilaquiles", quantity: 1, price: 60 }, { name: "Café", quantity: 1, price: 25 }], fecha: "2024-11-22", hora: "16:00", total: "$85.00" },
        { id: 5, cliente: "Luis Torres", items: [{ name: "Tacos al pastor", quantity: 3, price: 25 }, { name: "Refresco", quantity: 1, price: 15 }], fecha: "2024-11-22", hora: "15:30", total: "$75.00" },
        { id: 8, cliente: "Sofía Herrera", items: [{ name: "Chilaquiles", quantity: 1, price: 60 }, { name: "Café", quantity: 1, price: 25 }], fecha: "2024-11-22", hora: "16:00", total: "$85.00" },
        { id: 9, cliente: "Luis Torres", items: [{ name: "Tacos al pastor", quantity: 3, price: 25 }, { name: "Refresco", quantity: 1, price: 15 }], fecha: "2024-11-22", hora: "15:30", total: "$75.00" },
        { id: 10, cliente: "Sofía Herrera", items: [{ name: "Chilaquiles", quantity: 1, price: 60 }, { name: "Café", quantity: 1, price: 25 }], fecha: "2024-11-22", hora: "16:00", total: "$85.00" },
        { id: 11, cliente: "Luis Torres", items: [{ name: "Tacos al pastor", quantity: 3, price: 25 }, { name: "Refresco", quantity: 1, price: 15 }], fecha: "2024-11-22", hora: "15:30", total: "$75.00" }
    ];

    let currentIndex = 0;

    // Función para renderizar las órdenes visibles
    const renderOrders = () => {
        ordersContainer.innerHTML = ''; // Limpiar el contenedor
        const ordersToDisplay = orders.slice(currentIndex, currentIndex + 2); // Solo mostrar 2 órdenes

        ordersToDisplay.forEach((order) => {
            const orderBox = document.createElement("div");
            orderBox.className = "order-box";
            orderBox.innerHTML = `
                <h2>Orden #${order.id}</h2>
                <p><strong>Cliente:</strong> ${order.cliente}</p>
                <div class="order-items">
                    ${order.items.map((item) => `
                        <span class="item">
                            ${item.name} x ${item.quantity} $${(item.price * item.quantity).toFixed(2)}
                        </span>`).join("")}
                </div>
                <div class="separator"></div>
                <div class="order-details">
                    <p><strong>Fecha:</strong> ${order.fecha}</p>
                    <p><strong>Hora:</strong> ${order.hora}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-success accept-btn">Listo</button>
                    <button class="btn btn-danger cancel-btn">Cancelar</button>
                    <span class="status" style="display:none;"></span>
                </div>
            `;
            ordersContainer.appendChild(orderBox);

            const acceptButton = orderBox.querySelector(".accept-btn");
            const cancelButton = orderBox.querySelector(".cancel-btn");
            const statusElement = orderBox.querySelector(".status");

            // Función para manejar el estado de "Completado"
            acceptButton.addEventListener("click", () => {
                statusElement.style.display = "inline-block";
                statusElement.textContent = "Completado";
                statusElement.className = "status completado";
                acceptButton.style.display = "none"; // Ocultar el botón "Aceptar"
                cancelButton.style.display = "none"; // Ocultar el botón "Cancelar"
                order.status = "completado";
                showMessage("¡Orden completada!");
            });

            // Función para manejar el estado de "Cancelado"
            cancelButton.addEventListener("click", () => {
                statusElement.style.display = "inline-block";
                statusElement.textContent = "Cancelado";
                statusElement.className = "status cancelado";
                acceptButton.style.display = "none"; // Ocultar el botón "Aceptar"
                cancelButton.style.display = "none"; // Ocultar el botón "Cancelar"
                order.status = "cancelado";
                showMessage("¡Orden cancelada!");
            });
        });

    };

    // Función para mostrar el mensaje
    const showMessage = (message) => {
        messageContainer.textContent = message;
        messageContainer.style.display = "block"; // Mostrar el mensaje
        setTimeout(() => {
            messageContainer.style.display = "none"; // Ocultar el mensaje después de 3 segundos
        }, 3000);
    };

    // Funcionalidad para las flechas
    const navigateOrders = (direction) => {
        if (direction === "right") {
            if (currentIndex > 0) {
                currentIndex -= 2; // Retroceder dos órdenes
            }
        } else if (direction === "left") {
            if (currentIndex + 2 < orders.length) {
                currentIndex += 2; // Avanzar dos órdenes
            }
        }

        renderOrders(); // Actualizar la vista
    };

    // Inicializar la vista
    renderOrders();

    // Añadir event listeners a las flechas
    document.querySelector(".left-arrow").addEventListener("click", () => navigateOrders("left"));
    document.querySelector(".right-arrow").addEventListener("click", () => navigateOrders("right"));
});

// Función para cerrar sesión
function logout() {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login.html';
    }
}

// Código ejecutable al cargar la página
document.addEventListener('DOMContentLoaded', () => {
// Cualquier inicialización necesaria
});
