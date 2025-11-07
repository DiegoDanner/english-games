# Projeto de Quizzes - Danner Idiomas

Este projeto contém uma coleção de quizzes e ferramentas interativas. A página principal (`Games/index.html`) utiliza autenticação do Google via Firebase para controlar o acesso.

## 🚀 Configuração Obrigatória para o Login

Para que o botão de "Login com Google" na página principal (`Games/index.html`) funcione, é **essencial** criar um arquivo de configuração com as suas credenciais do Firebase.

Siga os passos abaixo:

### 1. Encontre o Arquivo de Exemplo

Navegue até a pasta `Games/js/`. Lá, você encontrará um arquivo chamado `firebase-config.js.example`.

### 2. Crie o Seu Arquivo de Configuração

- Crie uma **cópia** do arquivo `firebase-config.js.example`.
- Renomeie a cópia para **`firebase-config.js`**.

### 3. Preencha com Suas Credenciais

- Abra o novo arquivo `firebase-config.js`.
- Substitua os valores de exemplo (como `"SUA_API_KEY"`) pelas suas credenciais reais do Firebase. Você pode encontrá-las no console do seu projeto Firebase.

O arquivo final deverá ter esta aparência:

```javascript
export const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456",
    measurementId: "G-ABCDEFGHIJ"
};
```

**Importante:** O arquivo `firebase-config.js` já está incluído no `.gitignore`, então as suas credenciais nunca serão enviadas para o repositório, mantendo-as seguras.
