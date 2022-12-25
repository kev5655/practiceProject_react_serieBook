CREATE TABLE IF NOT EXISTS app_role
(
    id   BIGINT(20)   NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS app_user
(
    id       BIGINT(20)   NOT NULL AUTO_INCREMENT,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS app_user_roles
(
    app_user_id BIGINT(20) NOT NULL,
    roles_id    BIGINT(20) NOT NULL,
    FOREIGN KEY (app_user_id) REFERENCES app_user (id),
    FOREIGN KEY (roles_id) REFERENCES app_role (id)
);

CREATE TABLE hibernate_sequence
(
    next_val BIGINT(20)
);

CREATE TABLE IF NOT EXISTS serie
(
    id                 BIGINT(20) NOT NULL AUTO_INCREMENT,
    created_date       DATETIME   NOT NULL,
    end_date           DATE,
    episode            INT,
    last_modified_date DATETIME   NOT NULL,
    session            INT        NOT NULL,
    stars              INT,
    start_date         DATE,
    title              VARCHAR(255),
    app_user_id        BIGINT(20),
    PRIMARY KEY (id),
    FOREIGN KEY (app_user_id) REFERENCES app_user (id)

);


USE serie_book;


REPLACE INTO app_role(id, name)
VALUES (1, 'ROLE_ADMIN');
REPLACE INTO app_role(id, name)
VALUES (2, 'ROLE_USER');

REPLACE INTO app_user(id, email, password, username)
VALUES (3, 'admin@admin.com',
        '$2a$10$MaKNcRcjpQCvMCN7Jowns.pxHpo1dA3pJxVIGsizrlUfGC.LgRGne',
        'admin');


REPLACE INTO app_user(id, email, password, username)
    VALUE (4, 'test@test.com', '$2a$10$eEjwJG.LBfa/S1w0/SSLgOnZZZiRhR5C5tH81etJ5GpxaZaZx9Fxa', 'test');

REPLACE INTO app_user_roles(app_user_id, roles_id)
VALUES (3, 1);
REPLACE INTO app_user_roles(app_user_id, roles_id)
VALUES (3, 2);

REPLACE INTO serie(id, created_date, end_date, episode, last_modified_date, session, stars, start_date, title,
                   app_user_id)
    VALUE (1, '2022-10-29 20:04:24.466000', '2022-11-30', 8, '2022-10-29 20:04:24.466000', 11, 4, '2022-11-26',
           'The Walking Dead', 4),
    (2, '2022-10-29 20:04:26.942000', '2022-11-25', 6, '2022-10-29 20:04:26.942000', 8, 5, '2022-11-23',
     'Game of Thrones', 4),
    (3, '2022-10-29 20:04:35.647000', '2019-04-22', 8, '2022-10-29 20:04:35.647000', 1, 3, '2019-04-03', 'The Rain', 4),
    (4, '2022-10-29 20:04:51.416000', '2022-09-15', 6, '2022-10-29 20:04:51.416000', 6, 4, '2022-08-03',
     'Pick Blinders', 4);

INSERT INTO hibernate_sequence(next_val)
VALUES (10); # 7 entries were made in the database
