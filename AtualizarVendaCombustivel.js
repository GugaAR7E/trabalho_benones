let editandoId = null;

async function carregarCompras() {
    const response = await fetch('http://localhost:3000/compraCarrinho');
    const compra = await response.json();

    let html = '<table border="1"><tr><th>id</th><th>Roupa</th><th>Preço</th><th>Quantidade de Peças</th><th>Data da Compra</th></tr>';

    compra.forEach(compra => {
        const data = compra.data_compra.split('T')[0];
        html += `<tr id="venda-${compra.id}">
        <td>${compra.id}</td>
        <td id="c-${compra.id}-0">${compra.roupa}</td>
        <td id="c-${compra.id}-1">${compra.preco}</td>
        <td id="c-${compra.id}-2">${compra.quantidade}</td>
        <td id="c-${compra.id}-3" data-val="${data}">${data}</td>
        <td><button class="btn-editar" onclick="editarVenda(${compra.id})">✏️</button></td>
        </tr>`;
    });

    document.getElementById('tabelaVendas').innerHTML = html + '</table>';
}

function editarVenda(id) {
    if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

    editandoId = id;
    document.getElementById(`c-${id}-0`).innerHTML = `<input id="i-${id}-0" value="${document.getElementById(`c-${id}-0`).textContent}">`;
    document.getElementById(`c-${id}-1`).innerHTML = `<input type="number" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-2`).innerHTML = `<input type="number" id="i-${id}-2" value="${document.getElementById(`c-${id}-2`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-3`).innerHTML = `<input type="date" id="i-${id}-3" value="${document.getElementById(`c-${id}-3`).getAttribute('data-val')}">`;

    document.querySelector(`#venda-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarVenda(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>`;
}

async function salvarVenda(id) {
    const response = await fetch(`http://localhost:3000/compraCarrinho/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            roupa: document.getElementById(`i-${id}-0`).value,
            preco: document.getElementById(`i-${id}-1`).value,
            quantidade: document.getElementById(`i-${id}-2`).value,
            data_compra: document.getElementById(`i-${id}-3`).value
        })
    });

    if (response.ok) {
        editandoId = null;
        carregarCompras();
    } else {
        alert('Erro ao atualizar!');
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarCompras();
}

window.onload = carregarCompras;