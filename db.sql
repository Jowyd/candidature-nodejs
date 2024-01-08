DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS chantier;

CREATE TABLE user
(
    id                INT NOT NULL AUTO_INCREMENT,
    email              CHAR(24),
    password           TEXT,
    age                INT,
    email_verification CHAR(60),
    PRIMARY KEY (id),
    UNIQUE (email)    
);

CREATE TABLE chantier
(
    numero      INT NOT NULL AUTO_INCREMENT,
    description CHAR(255),
    city        CHAR(80),
    city_cp     INT,
    date_debut  DATE,
    date_fin    DATE,
    PRIMARY KEY (numero)
);
