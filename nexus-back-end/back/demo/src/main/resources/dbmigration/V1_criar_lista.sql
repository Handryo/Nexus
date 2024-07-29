CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    category ENUM('Indefinido', 'Médio', 'Importante') NOT NULL,
    date DATE NOT NULL,
    isCompleted BOOLEAN NOT NULL
);