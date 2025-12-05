
import { auth } from './firebase-config.js';
import { onAuthStateChanged, signInAnonymously, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

const themeSelectorHTML = `
<div class="theme-selector">
    <button id="theme-menu-button" class="theme-menu-button">
        <span id="theme-icon">🎨</span> Theme
    </button>
    <div id="theme-menu" class="theme-menu hidden">
        <a href="#" data-theme="light"><span class="theme-option-icon">🌞</span> Light</a>
        <a href="#" data-theme="dark"><span class="theme-option-icon">🌜</span> Dark</a>
        <a href="#" data-theme="system"><span class="theme-option-icon">💻</span> System</a>
    </div>
</div>
`;

const headerHTML = `
<header class="page-header">
    <div class="header-left">
        <img src="img/logo.svg" alt="Logo Danner Idiomas" class="logo">
        <span class="header-title">Danner Idiomas</span>
    </div>
    <div class="header-right">
        <a href="index.html" class="menu-link">Menu</a>
        ${themeSelectorHTML}
        <div id="user-info" class="user-display hidden">
            Logado como: <span class="user-name"></span>
        </div>
        <button id="logout-button" class="logout-button hidden">Sair</button>
    </div>
</header>
`;

function setupHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) {
        console.error("#header-placeholder not found.");
        return;
    }
    placeholder.innerHTML = headerHTML;

    const userInfo = document.getElementById('user-info');
    const userName = userInfo.querySelector('.user-name');
    const logoutButton = document.getElementById('logout-button');

    onAuthStateChanged(auth, (user) => {
        if (user && !user.isAnonymous) {
            // Se for um usuário logado com Google (não anônimo)
            userName.textContent = user.displayName || 'Usuário';
            userInfo.classList.remove('hidden');
            logoutButton.classList.remove('hidden');
        } else {
            // Para usuários anônimos ou deslogados
            userInfo.classList.add('hidden');
            logoutButton.classList.add('hidden');

            // Apenas tenta o login anônimo se NÃO estivermos na página de login principal
            if (!isIndexPage) {
                signInAnonymously(auth).catch((error) => console.error("Falha no login anônimo:", error));
            }
        }
    });

    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = 'index.html';
        }).catch((error) => console.error('Erro ao fazer logout:', error));
    });

    // A lógica do tema deve ser aplicada em todas as páginas
    const themeMenuButton = document.getElementById('theme-menu-button');
    const themeMenu = document.getElementById('theme-menu');
    if (themeMenuButton && themeMenu) {
        themeMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            themeMenu.classList.toggle('hidden');
        });
        document.addEventListener('click', (event) => {
            if (!themeMenu.contains(event.target) && !themeMenuButton.contains(event.target)) {
                themeMenu.classList.add('hidden');
            }
        });
        themeMenu.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target.closest('a');
            if (target && target.dataset.theme) {
                if (window.setTheme) {
                    window.setTheme(target.dataset.theme);
                }
                themeMenu.classList.add('hidden');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', setupHeader);
