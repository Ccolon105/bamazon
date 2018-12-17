DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL, 
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Watch", "Fashion", "350", "15"), 
("Jeans", "Fashion", "70", "5"), 
("Laptop", "Electronics", "1149", "4"), 
("iPhone", "Electronics", "995", "9"), 
("notebook", "office supplies", "1.25", "151"), 
("Pen", "office supplies", "1.75", "56"), 
("Scissors", "office supplies", "3.50", "14"), 
("Pillow", "Bedding", "49", "18"), 
("Comforter", "Bedding", "150", "8"), 
("Xbox", "Electronics", "400", "6");
