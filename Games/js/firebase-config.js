// Importa as funções necessárias do SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Sua configuração do Firebase que já estava correta
const firebaseConfig = {
    apiKey: "AIzaSyDJe81bxA-PKG7q_ouT7MWIe6Od5QwS0VQ",
    authDomain: "app-gestao-alunos.firebaseapp.com",
    projectId: "app-gestao-alunos",
    storageBucket: "app-gestao-alunos.appspot.com", // Corrigido para .appspot.com
    messagingSenderId: "501391699545",
    appId: "1:501391699545:web:c8c581f65d5116d7424b48",
    measurementId: "G-Q8J6YZWNFZ",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços e os exporta para serem usados em outros lugares
export const auth = getAuth(app);
export const db = getFirestore(app);
