document.querySelectorAll('.query-button').forEach(button => {
    (function() {
        const containerId = button.parentNode.id;
        const buttons = document.querySelectorAll(`#${containerId} .query-button`);
    
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                buttons.forEach(b => b.classList.remove('active')); // Remove "active" class from all buttons
    
                const id = e.target.dataset.id;
                console.log('Button ID:', id);
    
                // Add "active" class to the clicked button
                e.target.classList.add('active');
            });
        });
    })();
});
  