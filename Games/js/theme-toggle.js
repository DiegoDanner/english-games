document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;

    // Função para atualizar o ícone do botão
    const updateButtonIcon = () => {
        if (htmlElement.classList.contains('dark')) {
            themeToggleButton.textContent = '🌞'; // Em modo escuro, mostra o sol (para mudar para claro)
        } else {
            themeToggleButton.textContent = '🌙'; // Em modo claro, mostra a lua (para mudar para escuro)
        }
    };

    // Aplica o tema salvo ao carregar e atualiza o ícone
    // (O script inline no <head> já cuida da aplicação inicial,
    // mas isso garante que o botão esteja correto)
    updateButtonIcon();

    // Adiciona o listener para o clique do botão
    themeToggleButton.addEventListener('click', () => {
        // Alterna a classe 'dark' no elemento <html>
        htmlElement.classList.toggle('dark');

        // Salva a nova preferência de tema no localStorage
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }

        // Atualiza o ícone do botão
        updateButtonIcon();
    });
});
