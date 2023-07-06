document.querySelectorAll('.query-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      console.log('Button ID:', id);
    });
  });