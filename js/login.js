// Validación básica en el frontend
document.querySelector('form').addEventListener('submit', function (event) {
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    
    if (!usuario || !contrasena) {
      alert('Por favor, ingrese su usuario y contraseña.');
      event.preventDefault();  
    }
  });