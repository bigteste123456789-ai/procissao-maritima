# Guia de Configuração - Netlify

Este guia explica como configurar e fazer deploy do projeto no Netlify.

## 📋 Pré-requisitos

- Conta no [Netlify](https://netlify.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- Credenciais do Gmail (Email e Senha de App)

## 🚀 Passos para Deploy

### 1. Preparar o Repositório Git

Se ainda não tiver feito:

```bash
cd /caminho/do/projeto
git init
git add .
git commit -m "Versão inicial do projeto"
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git push -u origin main
```

### 2. Conectar ao Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Escolha seu provedor Git (GitHub, GitLab, etc.)
4. Selecione o repositório
5. Clique em **"Deploy site"**

### 3. Configurar Variáveis de Ambiente

Após o deploy inicial (que pode falhar), configure as variáveis:

1. No painel do Netlify, vá para **Site settings** → **Build & deploy** → **Environment**
2. Clique em **"Edit variables"**
3. Adicione as seguintes variáveis:

| Variável | Valor |
|----------|-------|
| `EMAIL_DE_ENVIO` | seu-email@gmail.com |
| `SENHA_DO_EMAIL` | sua-senha-de-app-16-digitos |
| `EMAIL_DE_DESTINO` | email-para-receber-notificacoes@gmail.com |

### 4. Obter Senha de App do Gmail

1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá para **Segurança** (lado esquerdo)
3. Ative **Verificação em 2 etapas** (se não estiver ativada)
4. Procure por **"Senhas de app"** (aparece após ativar 2FA)
5. Selecione:
   - App: **E-mail**
   - Dispositivo: **Outro (Nome personalizado)** → Digite "Netlify"
6. Clique em **"Gerar"**
7. Copie a senha de 16 dígitos gerada
8. Cole no campo `SENHA_DO_EMAIL` no Netlify

### 5. Fazer Deploy

Após configurar as variáveis:

1. Vá para **Deploys** no painel do Netlify
2. Clique em **"Trigger deploy"** → **"Deploy site"**
3. Aguarde o build completar

## 📁 Estrutura do Projeto

```
projeto/
├── index.html                 # Página principal
├── pagamento.html            # Página de pagamento
├── confirmacao.html          # Página de confirmação
├── style.css                 # Estilos
├── script.js                 # Scripts da página principal
├── pagamento.js              # Scripts da página de pagamento
├── confirmacao.js            # Scripts da página de confirmação
├── images/                   # Imagens dos barcos
├── netlify.toml              # Configuração do Netlify
├── package.json              # Dependências Node.js
├── .gitignore                # Arquivos a ignorar no Git
└── netlify/
    └── functions/
        └── salvar_dados.js   # Função serverless para salvar dados
```

## 🔧 Configurações do Netlify

O arquivo `netlify.toml` contém:

- **Build settings**: Comando de build e diretório de publicação
- **Functions**: Configuração das Netlify Functions
- **Redirects**: Redirecionamento de `/salvar_dados.php` para a função serverless
- **Environment variables**: Variáveis de ambiente

## 🔐 Segurança

- **Nunca** commit credenciais no repositório
- Use variáveis de ambiente do Netlify para dados sensíveis
- A senha de app do Gmail é segura (específica para este app)
- Os dados enviados são processados via HTTPS

## 📧 Como Funciona o Email

1. Usuário preenche o formulário e clica em "Confirmar Pagamento"
2. JavaScript envia os dados para `/.netlify/functions/salvar_dados`
3. A Netlify Function recebe os dados
4. A função formata e envia um email via Gmail
5. Usuário é redirecionado para página de confirmação

## ❌ Troubleshooting

### Erro: "Function not found"
- Verifique se `netlify/functions/salvar_dados.js` existe
- Faça um novo deploy

### Erro: "SMTP authentication failed"
- Verifique se a senha de app está correta
- Verifique se 2FA está ativado na conta Google
- Tente gerar uma nova senha de app

### Email não é enviado
- Verifique as variáveis de ambiente no painel do Netlify
- Confira os logs no painel: **Deploys** → **Logs**
- Verifique se o email de destino está correto

### Página não carrega
- Verifique se o diretório de publicação está correto (deve ser `.`)
- Confira se não há erros no build nos logs

## 📊 Monitoramento

Para ver os logs das funções:

1. No painel do Netlify, vá para **Functions**
2. Clique em **salvar_dados**
3. Veja os logs em tempo real

## 🔄 Atualizações

Para fazer atualizações:

1. Faça as mudanças no código local
2. Commit e push para o repositório:
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push
   ```
3. O Netlify fará deploy automaticamente

## 📞 Suporte

Para problemas com Netlify, consulte:
- [Documentação do Netlify](https://docs.netlify.com)
- [Netlify Functions](https://docs.netlify.com/functions/overview)
- [Suporte do Netlify](https://support.netlify.com)

