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

### 4. Force o Envio do Arquivo (Passo Crucial)

Como este arquivo é normalmente ignorado pelo Git, você precisa **forçar** o seu envio na primeira vez. Abra o terminal na pasta do seu projeto e execute os seguintes comandos:

```bash
# 1. Force o Git a "ver" o seu arquivo de configuração
git add --force Games/js/firebase-config.js

# 2. Faça o commit da alteração
git commit -m "Adiciona o arquivo de configuração do Firebase"

# 3. Envie para o repositório
git push
```

Após executar esses passos, o seu site na Netlify terá o arquivo de configuração necessário, e o erro `auth/configuration-not-found` será resolvido.
