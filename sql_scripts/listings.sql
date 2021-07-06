CREATE TABLE listings (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dog_name VARCHAR(32) NOT NULL,
    description TEXT,
    date_of_birth TIMESTAMP,
    adopted BOOL, 
    userID INT,
    FOREIGN KEY (userID) REFERENCES users(user_id)
    );
		
INSERT INTO Applications (business_name, description, address, date_founded)
VALUES ('DemoBusiness', 'Just a business', '2 Business Road', '2 May 1998');