async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/vendaCombustivel');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);
    let html = '<table border="1"><tr><th>id</th><th>Roupa</th><th>Preço</th><th>Volume Abastecido</th><th>Data Abastecimento</th></tr>';

    respostaObtida.forEach(vendaCombustivel => {
        html += `<tr>
        <td>${vendaCombustivel.id}</td>
        <td>${vendaCombustivel.roupa}</td>
        <td>${vendaCombustivel.preco}</td>
        <td>${vendaCombustivel.volume_abastecido}</td>
        <td>${vendaCombustivel.data_abastecimento}</td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
