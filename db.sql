CREATE TABLE user
(
    email              CHAR(24),
    password           CHAR(8),
    age                CHAR(3),
    email_verification CHAR(60)
)

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
