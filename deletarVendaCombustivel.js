async function carregarCompras() {
    const response = await fetch('http://localhost:3000/compraCarrinho');
    const compra = await response.json();

    let html = '<table border="1"><tr><th>id</th><th>Roupa</th><th>Preço</th><th>Quantidade de Peças</th><th>Data da Compra</th></tr>';

    compra.forEach(compra => {
        html += `<tr id="venda-${compra.id}">
        <td>${compra.id}</td>
        <td>${compra.roupa}</td>
        <td>${compra.preco}</td>
        <td>${compra.quantidade}</td>
        <td>${compra.data_compra}</td>
        <td><button class="btn-deletar" onclick="deletarVenda(${compra.id})">🗑️</button></td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('tabelaVendas').innerHTML = html;
}

async function deletarVenda(id) {
    if (!confirm(`Excluir compra ID ${id}?`)) return;

    await fetch(`http://localhost:3000/compraCarrinho/${id}`, { method: 'DELETE' });
    document.getElementById(`venda-${id}`).remove();
}

window.onload = carregarCompras;
