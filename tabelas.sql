USE alunos_gustavopereira;


CREATE TABLE adicione_ao_carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roupa VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade DECIMAL(10, 2) NOT NULL,
    data_compra DATE
);


SELECT * FROM adicione_ao_carrinho;

