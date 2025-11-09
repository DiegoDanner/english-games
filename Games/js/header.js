
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signInAnonymously,
    signOut,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

// --- 1. Inicialização do Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- 2. Definição do HTML do Cabeçalho ---
const headerHTML = `
<header class="page-header">
    <div class="header-left">
        <img src="img/logo.svg" alt="Logo Danner Idiomas" class="logo">
        <span class="header-title">Danner Idiomas</span>
    </div>
    <div class="header-right">
        <a href="index.html" class="menu-link">Menu</a>
        <button id="theme-toggle-btn">🌞</button>
        <div id="user-info" class="user-display hidden">
            Logado como: <span class="user-name"></span>
        </div>
        <button id="logout-button" class="logout-button hidden">Sair</button>
    </div>
</header>
`;

// --- 3. Injeção e Lógica do Cabeçalho ---
function setupHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) {
        console.error("Elemento #header-placeholder não encontrado. O cabeçalho não pode ser injetado.");
        return;
    }
    placeholder.innerHTML = headerHTML;

    // Elementos da UI do Cabeçalho
    const userInfo = document.getElementById('user-info');
    const userName = userInfo.querySelector('.user-name');
    const logoutButton = document.getElementById('logout-button');
    const themeToggleBtn = document.getElementById('theme-toggle-btn'); // O botão de tema já está no HTML injetado

    // Lógica de autenticação
    onAuthStateChanged(auth, (user) => {
        if (user && !user.isAnonymous) {
            // Usuário logado com Google
            userName.textContent = user.displayName || 'Usuário';
            userInfo.classList.remove('hidden');
            logoutButton.classList.remove('hidden');
        } else if (user && user.isAnonymous) {
            // Usuário anônimo, esconde informações
            userInfo.classList.add('hidden');
            logoutButton.classList.add('hidden');
        } else {
            // Nenhum usuário, tenta login anônimo
            signInAnonymously(auth).catch((error) => {
                console.error("Falha no login anônimo:", error);
            });
        }
    });

    // Evento de Logout
    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Redireciona para a página principal para um novo ciclo de login
            window.location.href = 'index.html';
        }).catch((error) => {
            console.error('Erro ao fazer logout:', error);
        });
    });

    // A lógica de alternância de tema já está em js/main.js,
    // então não precisamos adicioná-la aqui. Apenas garantimos que o botão exista.
}

// --- Executa a função quando o DOM estiver pronto ---
document.addEventListener('DOMContentLoaded', setupHeader);
