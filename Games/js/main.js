// --- Funções de Tema ---

/**
 * Aplica o tema na página com base na preferência salva.
 * Se a preferência for 'system', detecta e aplica o tema do SO.
 */
function applyTheme() {
    const theme = localStorage.getItem('theme') || 'system';
    const themeIcon = document.getElementById('theme-icon'); // Ícone no botão do menu

    if (theme === 'system') {
        // Verifica a preferência do sistema operacional
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('light-mode', !systemPrefersDark);

        if (themeIcon) {
            themeIcon.textContent = '💻';
        }
    } else {
        // Aplica o tema salvo diretamente
        const isLight = theme === 'light';
        document.body.classList.toggle('light-mode', isLight);
        if (themeIcon) {
            themeIcon.textContent = isLight ? '🌞' : '🌜';
        }
    }
}

/**
 * Salva a preferência de tema do usuário e a aplica.
 * @param {string} theme - O tema a ser definido ('light', 'dark', ou 'system').
 */
function setTheme(theme) {
    if (['light', 'dark', 'system'].includes(theme)) {
        localStorage.setItem('theme', theme);
        applyTheme();
    } else {
        console.error('Tema inválido:', theme);
    }
}

// --- Exposição e Eventos ---

// Expõe a função setTheme globalmente para ser acessível pelo header.js (módulo)
window.setTheme = setTheme;

// Aplica o tema assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();

    // Adiciona um listener para mudanças na preferência do sistema,
    // caso o usuário esteja usando o tema 'system'.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Reaplica o tema apenas se a preferência atual for 'system'
        if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
            applyTheme();
        }
    });
});
