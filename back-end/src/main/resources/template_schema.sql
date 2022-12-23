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

/*CREATE TABLE hibernate_sequence (
    next_val BIGINT(20),
);*/

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
    FOREIGN KEY (app_user_id) REFERENCES app_user(id)

);