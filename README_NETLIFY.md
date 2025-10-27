# Procissão Marítima de Angra dos Reis - Sistema de Vendas de Ingressos

Site responsivo para venda de ingressos para a Procissão Marítima de Angra dos Reis, com suporte a pagamento via PIX e cartão de crédito.

## 🌐 Hospedagem

Este projeto foi configurado para rodar no **Netlify** com Netlify Functions (serverless).

### Alternativas de Hospedagem

| Plataforma | Tipo | Custo | Notas |
|-----------|------|-------|-------|
| **Netlify** | Serverless | Gratuito | Recomendado - Fácil de usar |
| Render | Servidor | Gratuito | Alternativa com mais controle |
| Vercel | Serverless | Gratuito | Similar ao Netlify |
| PythonAnywhere | Servidor | ~$5/mês | Para Python puro |

## 📋 Requisitos

- Node.js (para desenvolvimento local)
- Conta no Netlify
- Conta Gmail (para envio de emails)

## 🚀 Quick Start

### 1. Clonar o Repositório

```bash
git clone https://seu-repositorio.git
cd procissao-maritima
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Testar Localmente

```bash
npm run dev
```

Ou use o Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

### 4. Deploy no Netlify

```bash
netlify deploy --prod
```

## 📁 Estrutura do Projeto

```
projeto/
├── index.html                    # Página principal com informações
├── pagamento.html               # Página de pagamento
├── confirmacao.html             # Página de confirmação
├── style.css                    # Estilos (responsivo)
├── script.js                    # Scripts da página principal
├── pagamento.js                 # Scripts da página de pagamento
├── confirmacao.js               # Scripts da página de confirmação
├── images/                      # Imagens dos 13 barcos
│   ├── angra_play.png
│   ├── caldeirao_boat.png
│   ├── barco_amigos.png
│   └── ... (10 mais)
├── netlify/
│   └── functions/
│       └── salvar_dados.js      # Função serverless para email
├── netlify.toml                 # Configuração do Netlify
├── package.json                 # Dependências Node.js
├── .gitignore                   # Arquivos a ignorar
└── GUIA_NETLIFY.md             # Guia de configuração
```

## 🎯 Funcionalidades

- ✅ Página inicial com informações sobre a procissão
- ✅ Galeria com 13 barcos participantes
- ✅ Formulário de pagamento com PIX e cartão de crédito
- ✅ Validação de dados em tempo real
- ✅ Envio automático de email de confirmação
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Sem dependências externas (exceto nodemailer)

## 💳 Métodos de Pagamento

### PIX
- Chave: `aobpmar@procissao.com.br`
- Valor: R$ 150,00
- Sem QR Code (apenas chave)

### Cartão de Crédito
- Suporta parcelamento (1x a 12x)
- Valor: R$ 150,00
- Validação de dados em tempo real

## 🔧 Configuração

### Variáveis de Ambiente

Configure no painel do Netlify:

```
EMAIL_DE_ENVIO=seu-email@gmail.com
SENHA_DO_EMAIL=sua-senha-de-app-16-digitos
EMAIL_DE_DESTINO=email-para-notificacoes@gmail.com
```

### Customizações

#### Alterar Preço do Ingresso

No arquivo `pagamento.js`, procure por:

```javascript
const valorTotal = 150; // Altere este valor
```

#### Alterar Chave PIX

No arquivo `pagamento.js`:

```javascript
dados.chave_pix = 'aobpmar@procissao.com.br'; // Altere para sua chave
```

#### Alterar Cores

No arquivo `style.css`:

```css
:root {
  --cor-primaria: #1e3a8a;      /* Azul */
  --cor-secundaria: #f97316;    /* Laranja */
  --cor-cinza: #6b7280;         /* Cinza */
}
```

#### Adicionar/Remover Barcos

1. Adicione a imagem em `images/`
2. Edite `index.html` e adicione a seção do barco
3. Edite `pagamento.js` e adicione ao mapeamento `barcos`

## 📧 Sistema de Email

O projeto usa **Nodemailer** com Gmail para enviar confirmações:

1. Usuário preenche o formulário
2. Dados são enviados para `/.netlify/functions/salvar_dados`
3. A função serverless envia um email via Gmail
4. Usuário é redirecionado para confirmação

### Configurar Gmail

1. Ative 2FA na sua conta Google
2. Gere uma "Senha de App" em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Configure a senha no Netlify

## 🔐 Segurança

⚠️ **IMPORTANTE**: Este projeto é para fins educacionais. Em produção:

- ❌ Nunca salve dados de cartão em texto plano
- ✅ Use um gateway de pagamento real (Stripe, PagSeguro, etc.)
- ✅ Implemente HTTPS (Netlify faz automaticamente)
- ✅ Use variáveis de ambiente para credenciais
- ✅ Valide dados no backend

## 📱 Responsividade

O site é totalmente responsivo:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🐛 Troubleshooting

### Email não é enviado
- Verifique as variáveis de ambiente no Netlify
- Confira se 2FA está ativado no Gmail
- Verifique os logs: **Deploys** → **Logs** → **Functions**

### Página não carrega
- Verifique se o build foi bem-sucedido
- Confira o diretório de publicação (deve ser `.`)
- Limpe o cache do navegador

### Erro ao enviar dados
- Verifique se a Netlify Function está rodando
- Confira a conexão com a internet
- Veja os logs do navegador (F12)

## 📚 Documentação

- [Guia Completo do Netlify](GUIA_NETLIFY.md)
- [Documentação do Netlify](https://docs.netlify.com)
- [Netlify Functions](https://docs.netlify.com/functions/overview)
- [Nodemailer](https://nodemailer.com)

## 📞 Suporte

Para problemas ou dúvidas:

1. Consulte o [GUIA_NETLIFY.md](GUIA_NETLIFY.md)
2. Verifique os logs no painel do Netlify
3. Consulte a documentação oficial

## 📄 Licença

MIT

## 👥 Autores

Desenvolvido para AOBPMAR - Procissão Marítima de Angra dos Reis

---

**Versão**: 1.0.0  
**Última atualização**: Outubro 2025  
**Plataforma**: Netlify + Netlify Functions

