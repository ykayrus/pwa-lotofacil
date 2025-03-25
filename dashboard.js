function buscarResultados() {
    // Obtendo valores digitados pelo usuário
    let concursoInput = document.getElementById("concurso").value.trim();
    let diaInput = document.getElementById("dia").value.trim();
    let mesInput = document.getElementById("mes").value.trim();

    // Filtrando os concursos com base nos critérios preenchidos
    let concursosFiltrados = bd.filter(item =>
        (concursoInput === "" || item.concurso.toString().endsWith(concursoInput)) &&
        (diaInput === "" || item.dia === diaInput) &&
        (mesInput === "" || item.mes === mesInput)
    );

    // Criando um objeto para contar a frequência dos números sorteados
    let contagemNumeros = {};

    // Percorrer os concursos filtrados
    concursosFiltrados.forEach(item => {
        // Contabilizando os números sorteados de cada concurso individualmente
        item.numeros_sorteados.forEach(numero => {
            if (contagemNumeros[numero]) {
                contagemNumeros[numero] += 1;  // Soma 1 para cada ocorrência
            } else {
                contagemNumeros[numero] = 1;  // Se o número ainda não foi contado, inicia com 1
            }
        });
    });

    // Ordenar os números por frequência e pegar os 15 mais frequentes
    let numerosMaisFrequentes = Object.entries(contagemNumeros)
        .sort((a, b) => b[1] - a[1]) // Ordena do mais frequente para o menos frequente
        .slice(0, 15) // Pega apenas os 15 mais frequentes
        .map(item => Number(item[0])); // Converte para número

    // Exibir os resultados no HTML
    let listaResultados = document.getElementById("lista-resultados");
    listaResultados.innerHTML = ""; // Limpa os resultados anteriores

    if (numerosMaisFrequentes.length > 0) {
        numerosMaisFrequentes.sort((a, b) => a - b); // Ordena os números em ordem crescente
        numerosMaisFrequentes.forEach(numero => {
            let li = document.createElement("li");
            li.textContent = numero;
            listaResultados.appendChild(li);
        });
    } else {
        listaResultados.innerHTML = "<li>Nenhum resultado encontrado.</li>";
    }
}
