CREATE TABLE listingImage (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_url INT, 
    listingID INT,
    FOREIGN KEY (listingID) REFERENCES listings(id)
    );