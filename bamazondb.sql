DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

-- this table will contain the store inventory --
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_id VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	product_sales DECIMAL(10,2),
	PRIMARY KEY (item_id)
);

-- building inventory
INSERT INTO products (product_name, department_id, price, stock_quantity,product_sales)
VALUES	("Mens Dress Pants", 10000,69.99, 11,0.00),
	("Mens Dress Shirts", 10000,49.99, 13,0.00),
	("Mens Dress Shoes", 10000,89.99, 8,0.00),
	("Mens Dress Coats", 10000,129.99, 14,0.00),
 	("Ladies Dress Pants", 20000,69.99, 11,0.00),
	("Ladies Dress Shirts", 20000,49.99, 13,0.00),
	("Ladies Dress Shoes", 20000,89.99, 8,0.00),
	("Ladies Dress Coats", 20000,129.99, 14,0.00),
 	("Kids's Dress Pants", 30000,69.99, 11,0.00),
	("Kids Dress Shirts", 30000,49.99, 13,0.00),
 	("Kids Dress Shoes", 30000,89.99, 8,0.00),
 	("Kids Dress Coats", 30000,129.99, 14,0.00);



CREATE TABLE departments (
 	dept_id INT(5) NOT NULL,
 	dept_name VARCHAR(25) NULL,
 	ohc DECIMAL(3,2) NULL,
 	PRIMARY KEY (dept_id)
);

INSERT INTO departments (dept_id, dept_name, ohc)
VALUES(10000,"Mens",0.10),
(20000,"Ladies",0.08),
(30000,"Kids",0.12);


