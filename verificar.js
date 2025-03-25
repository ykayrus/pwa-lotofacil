// Função para gerar os 25 números disponíveis para seleção
function gerarNumeros() {
    let numerosSelecao = document.getElementById("numeros-selecao");

    for (let i = 1; i <= 25; i++) {
        let numero = document.createElement("button");
        numero.classList.add("numero");
        numero.textContent = i;
        numero.onclick = () => selecionarNumero(numero);
        numerosSelecao.appendChild(numero);
    }
}

// Função para selecionar ou desmarcar números
function selecionarNumero(numeroButton) {
    if (numeroButton.classList.contains("numero-selecionado")) {
        numeroButton.classList.remove("numero-selecionado");
    } else {
        let selecionados = document.querySelectorAll(".numero-selecionado");
        if (selecionados.length < 15) {
            numeroButton.classList.add("numero-selecionado");
        } else {
            alert("Você já selecionou 15 números.");
        }
    }
}

// Função para verificar se a sequência foi sorteada
function verificarSequencia() {
    let numerosSelecionados = [];
    document.querySelectorAll(".numero-selecionado").forEach(el => {
        numerosSelecionados.push(parseInt(el.textContent));
    });

    if (numerosSelecionados.length !== 15) {
        alert("Por favor, selecione exatamente 15 números.");
        return;
    }

    // Ordena os números selecionados para garantir que a ordem não interfira
    numerosSelecionados.sort((a, b) => a - b);

    let encontrada = bd.some(item => {
        let numerosSorteados = item.numeros_sorteados.slice().sort((a, b) => a - b);
        return JSON.stringify(numerosSelecionados) === JSON.stringify(numerosSorteados);
    });

    let resultadoTexto = encontrada ? "Esta sequência já foi sorteada!" : "Esta sequência NUNCA foi sorteada!";
    document.getElementById("resultado-sequencia").textContent = resultadoTexto;
}

// Chama a função de gerar os números quando a página for carregada
window.onload = gerarNumeros;
