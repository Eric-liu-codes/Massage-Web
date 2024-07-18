CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    date DATE,
    time VARCHAR(20),
    paying_with_cash BOOLEAN
);


CREATE TABLE sale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_text TEXT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL
);
