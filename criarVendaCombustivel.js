document.getElementById('formAdicioneCarrinho').addEventListener('submit', async function (e) {
    e.preventDefault();

    const roupa = document.getElementById('roupa').value;
    const preco = document.getElementById('preco').value;
    const quantidade = document.getElementById('quantidade').value;
    const data_compra = document.getElementById('data_compra').value;

    const response = await fetch('http://localhost:3000/compraCarrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roupa, preco, quantidade, data_compra })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = 'Adicionado ao carrinho!';
        document.getElementById('formAdicioneCarrinho').reset();
    } else {
        document.getElementById('message').textContent = 'Erro: ' + data.error;
    }
});


