-- Script de création des tables de la base de données.

DROP DATABASE IF EXISTS 456binaire;
CREATE DATABASE 456binaire;
USE 456binaire;

CREATE TABLE IF NOT EXISTS address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    province VARCHAR(50),
    city VARCHAR(50),
    postal_code VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    gender VARCHAR(10),
    date_of_birth DATE,
    address_id INT,
    is_trainer BOOLEAN,
    role VARCHAR(50),
    trainer_username VARCHAR(50),
    profile_picture VARCHAR(255),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE IF NOT EXISTS trainer (
    trainer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    status VARCHAR(30),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS client (
    user_id INT PRIMARY KEY,
    trainer_id INT,
    trainer_username VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (trainer_id) REFERENCES trainer(trainer_id)
);

CREATE TABLE IF NOT EXISTS activity (
    id_activity INT NOT NULL AUTO_INCREMENT,
    id_user INT,
    type_activity VARCHAR(25),
    description_activity VARCHAR(100),
    date DATE,
    duration_min DOUBLE,
    distance_km DOUBLE,
    heart_beat_min DOUBLE,
    temperature_c DOUBLE,
    gpx_file LONGTEXT,
    comment VARCHAR(500),
    FOREIGN KEY(id_user) REFERENCES user(user_id),
    PRIMARY KEY (id_activity)
);

CREATE TABLE IF NOT EXISTS administrateur (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    mot_de_passe INT
);

CREATE TABLE IF NOT EXISTS message(
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    sujet VARCHAR(100),
    contenu VARCHAR(10000),
    date DATE,
    heure TIME
);

CREATE TABLE IF NOT EXISTS security (
    user_id INT PRIMARY KEY, 
    reponse1 VARCHAR(50),
    reponse2 VARCHAR(50),
    reponse3 VARCHAR(50)
);

INSERT INTO address (address_id, province)
VALUES (1, "QC");

-- insertion d'utilisateurs

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(1, "Lindsay", "Aballo", "lindsay", "lindsay@gmail.com", "12345", '2000-01-01', 'USER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(2, "Dylane", "Deffo", "dylane", "dylane@gmail.com", "12345", '2000-01-01', 'USER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(3, "Kareen", "Gresseau", "kareen", "kareen@gmail.com", "12345", '2000-01-01', 'USER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(4, "Arnolly", "Muinza", "arnolly", "arnolly@gmail.com", "12345", '2000-01-01', 'USER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(5, "LutherKing", "Senat", "luther", "luther@gmail.com", "12345", '2000-01-01', 'USER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(6, "Jean", "Colin", "jean", "jean@gmail.com", "12345", '2000-01-01', 'USER');


-- insertion d'entraineurs 

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(7, "Henri", "Akaffou", "henri", "henri@gmail.com", "12345", '2000-01-01', 'TRAINER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(8, "Larbi", "Chaouch", "larbi", "larbi@gmail.com", "12345", '2000-01-01', 'TRAINER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(9, "Achref", "El Mabrouk", "achref", "achref@gmail.com", "12345", '2000-01-01', 'TRAINER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(10, "Mireille", "Paradis", "mireille", "mireille@gmail.com", "12345", '2000-01-01', 'TRAINER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(11, "Isabelle", "Tamas", "isabelle", "isabelle@gmail.com", "12345", '2000-01-01', 'TRAINER');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(12, "Amine", "Snoussi", "amine", "amine@gmail.com", "12345", '2000-01-01', 'TRAINER');

INSERT INTO trainer(trainer_id, user_id, status)
VALUES(1, 7, "CONFIRME");

INSERT INTO trainer(trainer_id, user_id, status)
VALUES(2, 8, "CONFIRME"); 

INSERT INTO trainer(trainer_id, user_id, status)
VALUES(3, 9, "CONFIRME"); 

INSERT INTO trainer(trainer_id, user_id, status)
VALUES(4, 10, "EN_DEMANDE"); 

INSERT INTO trainer(trainer_id, user_id, status)
VALUES(5, 11, "EN_DEMANDE"); 

INSERT INTO trainer(trainer_id, user_id, status)
VALUES(6, 12, "RETIRE");  


-- insertion de clients  

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(13, "Gloria", "Bationo", "gloria", "gloria@gmail.com", "12345", '2000-01-01', 'CLIENT');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(14, "Mehdi", "Chafi", "mehdi", "mehdi@gmail.com", "12345", '2000-01-01', 'CLIENT');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(15, "Ryddel", "Guervens", "ryddel", "ryddel@gmail.com", "12345", '2000-01-01', 'CLIENT');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(16, "Mohamed", "Lamine", "mohamed", "mohamed@gmail.com", "12345", '2000-01-01', 'CLIENT');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(17, "Gasner", "Mendes", "gasner", "gasner@gmail.com", "12345", '2000-01-01', 'CLIENT');

INSERT INTO user(user_id, first_name, last_name, username, email, password, date_of_birth, role)
VALUES(18, "Axel", "N'Guessan", "axel", "axel@gmail.com", "12345", '2000-01-01', 'CLIENT');

INSERT INTO client(user_id, trainer_id, trainer_username)
VALUES(13, 1, "henri");

INSERT INTO client(user_id, trainer_id, trainer_username)
VALUES(14, 1, "henri");

INSERT INTO client(user_id, trainer_id, trainer_username)
VALUES(15, 2, "larbi"); 

INSERT INTO client(user_id, trainer_id, trainer_username)
VALUES(16, 2, "larbi"); 

INSERT INTO client(user_id, trainer_id, trainer_username)
VALUES(17, 3, "achref"); 

INSERT INTO client(user_id, trainer_id, trainer_username)
VALUES(18, 3, "achref"); 
 

-- instances de security
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(1, "liz", "raymond", "riz"); 
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(2, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(3, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(4, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(5, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(6, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(7, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(8, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(9, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(10, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(11, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(12, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(13, "liz", "raymond", "riz"); 
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(14, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(15, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(16, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(17, "liz", "raymond", "riz");
INSERT INTO security(user_id, reponse1, reponse2, reponse3)
VALUES(18, "liz", "raymond", "riz");
 

-- instance de message 
INSERT INTO message(message_id, user_id, sujet, contenu, date, heure)
VALUES(1, 1, "trouver un entraineur", "bonjour, comment je peux trouver un entraineur ?", '2024-04-13', '14:30:00'); 

INSERT INTO message(message_id, user_id, sujet, contenu, date, heure)
VALUES(2, 2, "commentaire", "bonjour, ceci est la meilleure application sportive au monde !!!", '2024-04-13', '14:30:00'); 

INSERT INTO message(message_id, user_id, sujet, contenu, date, heure)
VALUES(3, 8, "plainte envers client", "bonjour, mon client est parresseux", '2024-04-13', '14:30:00');


-- instance d'administrateur

INSERT INTO administrateur ( admin_id,mot_de_passe)
VALUES (00001, 123456789);
