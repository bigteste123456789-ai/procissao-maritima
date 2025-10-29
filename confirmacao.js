// Função auxiliar para buscar parâmetros da URL
function obterParametroURL(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Executa quando o conteúdo da página é carregado
window.addEventListener('DOMContentLoaded', function () {
    // Pega os dados da URL
    const nome = obterParametroURL('nome') || 'Cliente';
    const barco = obterParametroURL('barco') || 'Não identificado';
    const email = obterParametroURL('email') || 'N/A';
    const pedido = obterParametroURL('pedido') || 'N/A';

    // Preenche os campos na página
    document.getElementById('confNome').textContent = nome;
    document.getElementById('confBarco').textContent = barco;
    document.getElementById('confEmail').textContent = email;
    document.getElementById('confEmail2').textContent = email;
    document.getElementById('confPedido').textContent = pedido;

    // --- GERAÇÃO DO QR CODE ---
    // Cria os dados que o QR Code vai conter
    const qrData = `Pedido: ${pedido}\nNome: ${nome}\nBarco: ${barco}\nEmail: ${email}`;
    const qrImg = document.getElementById('qrCodeImage');

    // Usa uma API gratuita para gerar o QR Code
    // (Para um projeto real, o ideal seria gerar isso no backend)
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;
    qrImg.alt = `QR Code para o pedido ${pedido}`;


    // --- CONFIGURAÇÃO DO BOTÃO WHATSAPP ---
    // (Usei o número 5521997308156 com base no (21) 99730-8156 do seu index.html)
    const numeroWhatsapp = '5521997308156';
    const textoWhatsapp = `Olá, AOBPMAR! Tenho uma dúvida sobre meu ingresso para o barco ${barco} (Pedido: ${pedido}).`;

    const btnWhatsapp = document.getElementById('btnWhatsapp');
    btnWhatsapp.href = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(textoWhatsapp)}`;

});
