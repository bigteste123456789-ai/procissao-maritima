# 📚 Guia Passo a Passo - Procissão Marítima de Angra dos Reis

## Índice
1. [Testar Localmente](#testar-localmente)
2. [Fazer Deploy no Netlify](#fazer-deploy-no-netlify)
3. [Troubleshooting](#troubleshooting)

---

# 🖥️ Testar Localmente

## Pré-requisitos

Você precisa ter instalado:
- **Node.js** (versão 14+) - [Baixar aqui](https://nodejs.org)
- **Git** (opcional, mas recomendado) - [Baixar aqui](https://git-scm.com)

### Verificar se está instalado:

```bash
node --version
npm --version
```

---

## Passo 1: Extrair o Projeto

1. Baixe o arquivo `procissao-maritima.zip`
2. Extraia em uma pasta (ex: `C:\Users\seu-usuario\procissao-maritima`)
3. Abra o terminal/prompt nessa pasta

### No Windows:
- Clique com botão direito na pasta
- Selecione "Abrir terminal aqui"

### No Mac/Linux:
```bash
cd /caminho/para/procissao-maritima
```

---

## Passo 2: Instalar Dependências

No terminal, execute:

```bash
npm install
```

Isso vai instalar o **nodemailer** (necessário para enviar emails).

---

## Passo 3: Configurar Email (Opcional)

Se você quer testar o envio de emails, configure as variáveis de ambiente:

### No Windows (PowerShell):
```powershell
$env:EMAIL_DE_ENVIO="seu-email@gmail.com"
$env:SENHA_DO_EMAIL="sua-senha-de-app-16-digitos"
$env:EMAIL_DE_DESTINO="email-para-receber@gmail.com"
```

### No Windows (Prompt):
```cmd
set EMAIL_DE_ENVIO=seu-email@gmail.com
set SENHA_DO_EMAIL=sua-senha-de-app-16-digitos
set EMAIL_DE_DESTINO=email-para-receber@gmail.com
```

### No Mac/Linux:
```bash
export EMAIL_DE_ENVIO="seu-email@gmail.com"
export SENHA_DO_EMAIL="sua-senha-de-app-16-digitos"
export EMAIL_DE_DESTINO="email-para-receber@gmail.com"
```

---

## Passo 4: Gerar Senha de App do Gmail

Se você quer testar email, precisa de uma "Senha de App" do Gmail:

1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Clique em **"Segurança"** (lado esquerdo)
3. Procure por **"Verificação em 2 etapas"** e ative (se não estiver)
4. Procure por **"Senhas de app"** (aparece após ativar 2FA)
5. Selecione:
   - App: **E-mail**
   - Dispositivo: **Outro (Nome personalizado)** → Digite "Teste Local"
6. Clique em **"Gerar"**
7. Copie a senha de 16 dígitos gerada
8. Cole no campo `SENHA_DO_EMAIL` (passo anterior)

---

## Passo 5: Iniciar o Servidor Local

No terminal, execute:

```bash
node servidor-local.js
```

Você verá algo assim:

```
============================================================
🚀 Servidor Local Iniciado!
============================================================

📍 Acesse: http://localhost:3000

⚙️  Configurações de Email:
   Email de envio: seu-email@gmail.com
   Email de destino: email-para-receber@gmail.com

💡 Dicas:
   - Pressione Ctrl+C para parar o servidor
   - Use variáveis de ambiente para configurar email

📚 Documentação: Veja PASSO_A_PASSO.md
============================================================
```

---

## Passo 6: Acessar o Site

1. Abra seu navegador
2. Acesse: **http://localhost:3000**
3. Você verá a página inicial com os 13 barcos

---

## Passo 7: Testar a Compra

1. Clique em um dos barcos
2. Preencha o formulário de pagamento
3. Escolha PIX ou Cartão
4. Clique em "Confirmar Pagamento"
5. Se configurou email, você receberá um email de confirmação

---

## Parar o Servidor

No terminal, pressione: **Ctrl + C**

---

# 🚀 Fazer Deploy no Netlify

## Pré-requisitos

- Conta no [Netlify](https://netlify.com) (gratuita)
- Conta no [GitHub](https://github.com) (gratuita)
- Git instalado no seu computador

---

## Passo 1: Criar Repositório no GitHub

### 1.1 Criar conta no GitHub (se não tiver)

Acesse [github.com](https://github.com) e crie uma conta gratuita.

### 1.2 Criar novo repositório

1. Clique em **"+"** (canto superior direito)
2. Selecione **"New repository"**
3. Nome: `procissao-maritima`
4. Descrição: `Site de vendas de ingressos para a Procissão Marítima`
5. Deixe como **"Public"**
6. Clique em **"Create repository"**

### 1.3 Copiar o URL do repositório

Você verá algo como: `https://github.com/seu-usuario/procissao-maritima.git`

---

## Passo 2: Fazer Upload do Projeto para GitHub

### 2.1 Abrir terminal na pasta do projeto

```bash
cd /caminho/para/procissao-maritima
```

### 2.2 Inicializar Git (se não tiver feito)

```bash
git init
git add .
git commit -m "Versão inicial do projeto"
```

### 2.3 Adicionar repositório remoto

```bash
git remote add origin https://github.com/seu-usuario/procissao-maritima.git
git branch -M main
git push -u origin main
```

Se pedir usuário/senha, use:
- **Usuário**: seu-usuario-github
- **Senha**: seu-token-github (gere em [github.com/settings/tokens](https://github.com/settings/tokens))

---

## Passo 3: Conectar ao Netlify

### 3.1 Acessar Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"Sign up"** (se não tiver conta)
3. Selecione **"Sign up with GitHub"**
4. Autorize o Netlify

### 3.2 Criar novo site

1. No painel do Netlify, clique em **"Add new site"**
2. Selecione **"Import an existing project"**
3. Escolha **"GitHub"**
4. Selecione o repositório `procissao-maritima`
5. Clique em **"Deploy site"**

---

## Passo 4: Configurar Variáveis de Ambiente

### 4.1 Acessar configurações

1. No painel do Netlify, vá para **"Site settings"**
2. Clique em **"Build & deploy"** (lado esquerdo)
3. Clique em **"Environment"**
4. Clique em **"Edit variables"**

### 4.2 Adicionar variáveis

Clique em **"New variable"** e adicione:

| Chave | Valor |
|-------|-------|
| `EMAIL_DE_ENVIO` | seu-email@gmail.com |
| `SENHA_DO_EMAIL` | sua-senha-de-app-16-digitos |
| `EMAIL_DE_DESTINO` | email-para-receber@gmail.com |

---

## Passo 5: Fazer Deploy

### 5.1 Trigger deploy manual

1. Vá para **"Deploys"** no painel do Netlify
2. Clique em **"Trigger deploy"**
3. Selecione **"Deploy site"**
4. Aguarde o build completar (geralmente 1-2 minutos)

### 5.2 Acessar o site

Quando o deploy terminar, você verá um URL como:
```
https://procissao-maritima-xyz123.netlify.app
```

Clique nele para acessar seu site ao vivo!

---

## Passo 6: Deploy Automático

Agora, sempre que você fizer um push para o GitHub, o Netlify fará deploy automaticamente:

```bash
# Fazer mudanças no código
git add .
git commit -m "Descrição da mudança"
git push origin main
```

O Netlify detectará o push e fará deploy automaticamente!

---

# 🔧 Troubleshooting

## Problema: "npm: command not found"

**Solução**: Node.js não está instalado. Baixe em [nodejs.org](https://nodejs.org)

---

## Problema: "SMTP authentication failed"

**Solução**:
1. Verifique se a senha de app está correta
2. Verifique se 2FA está ativado no Gmail
3. Tente gerar uma nova senha de app

---

## Problema: "Email não é enviado"

**Solução**:
1. Verifique as variáveis de ambiente no Netlify
2. Confira os logs: **Deploys** → **Logs** → **Functions**
3. Verifique se o email de destino está correto

---

## Problema: "Página não carrega no Netlify"

**Solução**:
1. Verifique se o build foi bem-sucedido
2. Confira os logs: **Deploys** → **Build logs**
3. Limpe o cache do navegador (Ctrl+Shift+Delete)

---

## Problema: "Erro ao enviar dados"

**Solução**:
1. Verifique se a Netlify Function está rodando
2. Confira a conexão com a internet
3. Abra o console do navegador (F12) e veja os erros

---

# 📞 Suporte

Para mais informações:
- [Documentação do Netlify](https://docs.netlify.com)
- [Netlify Functions](https://docs.netlify.com/functions/overview)
- [GitHub Help](https://docs.github.com)
- [Node.js Documentation](https://nodejs.org/docs)

---

**Boa sorte! 🎉**

