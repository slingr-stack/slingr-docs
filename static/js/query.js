document.querySelectorAll('.query-button').forEach(button => {
    (function() {
      const lastClickedButtons = {};

      button.addEventListener('click', (e) => {
        const containerId = e.target.parentNode.id;
        const id = e.target.dataset.id;
        console.log('Button ID:', id);

        // Remover la clase 'active' del último botón presionado en el contenedor correspondiente
        const lastClickedButton = lastClickedButtons[containerId];
        if (lastClickedButton) {
          lastClickedButton.classList.remove('active');
        }

        // Agregar la clase 'active' al botón presionado
        button.classList.add('active');

        // Guardar el último botón presionado en el contenedor correspondiente
        lastClickedButtons[containerId] = button;
      });
    })();
  });