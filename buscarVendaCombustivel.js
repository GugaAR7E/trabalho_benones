async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/compraCarrinho');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);
    let html = '<table border="1"><tr><th>id</th><th>Roupa</th><th>Preço</th><th>Quantidade de Peças</th><th>Data da Compra</th></tr>';

    respostaObtida.forEach(compraCarrinho => {
        html += `<tr>
        <td>${compraCarrinho.id}</td>
        <td>${compraCarrinho.roupa}</td>
        <td>${compraCarrinho.preco}</td>
        <td>${compraCarrinho.quantidade}</td>
        <td>${compraCarrinho.data_compra}</td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
