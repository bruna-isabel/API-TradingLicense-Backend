CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(32) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES userRoles(id)
    );