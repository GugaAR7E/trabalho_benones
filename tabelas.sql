USE alunos_21c_2026;

CREATE TABLE postos_de_gasolina (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_combustivel VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    volume_abastecido DECIMAL(10, 2) NOT NULL,
    data_abastecimento DATE
);

USE api_crud;
SELECT * FROM postos_de_gasolina;