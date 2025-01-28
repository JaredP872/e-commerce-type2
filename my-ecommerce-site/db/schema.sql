USE ecommerce;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT
);

INSERT INTO products (name, description, price, image_url)
VALUES
('iPhone 15', 'Latest Apple smartphone', 999.99, 'https://example.com/iphone15.jpg'),
('Samsung Galaxy S24', 'Newest Galaxy phone', 799.99, 'https://example.com/galaxys24.jpg'),
('Google Pixel 8', 'Flagship Google smartphone', 699.99, 'https://example.com/pixel8.jpg');

SELECT * FROM products;
