document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const updateButtonIcon = () => {
        if (body.classList.contains('light-mode')) {
            themeToggleButton.textContent = '🌙'; // Em modo claro, mostra a lua (para mudar para escuro)
        } else {
            themeToggleButton.textContent = '🌞'; // Em modo escuro, mostra o sol (para mudar para claro)
        }
    };

    // Define o tema inicial do localStorage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }

    updateButtonIcon(); // Define o ícone inicial

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        // Atualiza o tema no localStorage
        let theme = 'dark';
        if (body.classList.contains('light-mode')) {
            theme = 'light';
        }
        localStorage.setItem('theme', theme);

        updateButtonIcon(); // Atualiza o ícone ao alternar
    });
});
