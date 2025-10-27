# 🚢 Procissão Marítima de Angra dos Reis - Sistema de Vendas de Ingressos

Site responsivo para venda de ingressos para a Procissão Marítima de Angra dos Reis, com suporte a pagamento via PIX e cartão de crédito.

## 🎯 Características

✅ **Página inicial** com informações sobre a procissão  
✅ **Galeria** com 13 barcos participantes  
✅ **Formulário de pagamento** com PIX e cartão de crédito  
✅ **Validação de dados** em tempo real  
✅ **Envio de email** de confirmação automático  
✅ **Design responsivo** (mobile, tablet, desktop)  
✅ **Sem dependências externas** (exceto nodemailer)  

---

## 🚀 Quick Start - Testar Localmente

### 1️⃣ Pré-requisitos

- **Node.js** (versão 14+) - [Baixar](https://nodejs.org)
- **Git** (opcional)

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Iniciar Servidor

**Windows:**
```bash
iniciar-servidor.bat
```

**Mac/Linux:**
```bash
./iniciar-servidor.sh
```

**Ou manualmente:**
```bash
node servidor-local.js
```

### 4️⃣ Acessar o Site

Abra seu navegador e acesse: **http://localhost:3000**

---

## 📚 Documentação Completa

Para instruções detalhadas, consulte:

- **[PASSO_A_PASSO.md](PASSO_A_PASSO.md)** - Guia completo (Testar + Deploy)
- **[GUIA_NETLIFY.md](GUIA_NETLIFY.md)** - Configuração do Netlify
- **[README_NETLIFY.md](README_NETLIFY.md)** - Documentação técnica

---

## 📁 Estrutura do Projeto

```
procissao-maritima/
├── index.html                    # Página principal
├── pagamento.html               # Página de pagamento
├── confirmacao.html             # Página de confirmação
├── style.css                    # Estilos responsivos
├── script.js                    # Scripts da página principal
├── pagamento.js                 # Scripts da página de pagamento
├── confirmacao.js               # Scripts da confirmação
├── images/                      # 13 imagens dos barcos
├── netlify/
│   └── functions/
│       └── salvar_dados.js      # Função serverless
├── servidor-local.js            # Servidor local para testes
├── iniciar-servidor.bat         # Script para Windows
├── iniciar-servidor.sh          # Script para Mac/Linux
├── netlify.toml                 # Configuração Netlify
├── package.json                 # Dependências
├── .gitignore                   # Arquivos a ignorar
├── PASSO_A_PASSO.md            # Guia passo a passo
├── GUIA_NETLIFY.md             # Guia Netlify
└── README_NETLIFY.md           # Documentação técnica
```

---

## 💳 Métodos de Pagamento

### PIX
- **Chave**: `aobpmar@procissao.com.br`
- **Valor**: R$ 150,00
- **Sem QR Code** (apenas chave)

### Cartão de Crédito
- **Parcelamento**: 1x a 12x
- **Valor**: R$ 150,00
- **Validação**: Dados validados em tempo real

---

## 🔧 Configurar Email (Opcional)

Se você quer testar o envio de emails:

### 1. Gerar Senha de App do Gmail

1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá para **Segurança**
3. Ative **Verificação em 2 etapas** (se não estiver)
4. Procure por **"Senhas de app"**
5. Selecione: App: **E-mail** | Dispositivo: **Outro (Teste Local)**
6. Copie a senha de 16 dígitos

### 2. Configurar Variáveis de Ambiente

**Windows (PowerShell):**
```powershell
$env:EMAIL_DE_ENVIO="seu-email@gmail.com"
$env:SENHA_DO_EMAIL="sua-senha-de-app-16-digitos"
$env:EMAIL_DE_DESTINO="email-para-receber@gmail.com"
```

**Mac/Linux:**
```bash
export EMAIL_DE_ENVIO="seu-email@gmail.com"
export SENHA_DO_EMAIL="sua-senha-de-app-16-digitos"
export EMAIL_DE_DESTINO="email-para-receber@gmail.com"
```

### 3. Iniciar Servidor

```bash
node servidor-local.js
```

---

## 🌐 Deploy no Netlify

Para fazer deploy no Netlify, siga o guia em [PASSO_A_PASSO.md](PASSO_A_PASSO.md).

**Resumo:**
1. Criar repositório no GitHub
2. Fazer push do código
3. Conectar ao Netlify
4. Configurar variáveis de ambiente
5. Deploy automático!

---

## 🔐 Segurança

⚠️ **IMPORTANTE**: Este projeto é para fins educacionais.

Em produção:
- ❌ Nunca salve dados de cartão em texto plano
- ✅ Use um gateway de pagamento real (Stripe, PagSeguro, etc.)
- ✅ Implemente HTTPS (Netlify faz automaticamente)
- ✅ Use variáveis de ambiente para credenciais
- ✅ Valide dados no backend

---

## 📱 Responsividade

O site é totalmente responsivo:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🐛 Troubleshooting

### "npm: command not found"
→ Instale Node.js em [nodejs.org](https://nodejs.org)

### "Email não é enviado"
→ Verifique as variáveis de ambiente e a senha de app do Gmail

### "Página não carrega"
→ Verifique se o servidor está rodando e acesse http://localhost:3000

---

## 📞 Suporte

- [Documentação do Netlify](https://docs.netlify.com)
- [Node.js Documentation](https://nodejs.org/docs)
- [GitHub Help](https://docs.github.com)

---

## 📄 Licença

MIT

---

**Desenvolvido para AOBPMAR - Procissão Marítima de Angra dos Reis**

**Versão**: 2.0.0  
**Última atualização**: Outubro 2025  
**Plataforma**: Node.js + Netlify Functions

