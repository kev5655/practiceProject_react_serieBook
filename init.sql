
CREATE TABLE app_role (
                          id BIGINT(20) NOT NULL AUTO_INCREMENT,
                          name VARCHAR(255) NOT NULL,
                          PRIMARY KEY (id)
);

CREATE TABLE app_user (
                          id BIGINT(20) NOT NULL AUTO_INCREMENT,
                          email VARCHAR(255) NOT NULL,
                          password VARCHAR(255) NOT NULL,
                          username VARCHAR(255) NOT NULL,
                          PRIMARY KEY (id)
);

CREATE TABLE app_user_roles (
                                app_user_id BIGINT(20) NOT NULL,
                                roles_id BIGINT(20) NOT NULL,
                                FOREIGN KEY (app_user_id) REFERENCES app_user(id),
                                FOREIGN KEY (roles_id) REFERENCES app_role(id)
);

CREATE TABLE hibernate_sequence (
    next_val BIGINT(20)
);

CREATE TABLE serie (
                       id BIGINT(20) NOT NULL AUTO_INCREMENT,
                       created_date DATETIME NOT NULL,
                       end_date DATE,
                       episode INT,
                       last_modified_date DATETIME NOT NULL,
                       session INT NOT NULL,
                       stars INT,
                       start_date DATE,
                       title VARCHAR(255),
                       app_user_id BIGINT(20),
                       PRIMARY KEY (id),
                       FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);



INSERT INTO app_role(id, name) VALUES (1,'ROLE_ADMIN');
INSERT INTO app_role(id, name) VALUES (2,'ROLE_USER');

INSERT INTO app_user(id, email, password, username)
VALUES (3,'admin@admin.com',
        '$2a$10$fdz71Su6F8DNpNzf8Jjt5.HND.hR7FZA8EBzDChMEHjOM6ftw6v5C',
        'admin');

INSERT INTO app_user_roles(app_user_id, roles_id) VALUES (3,1);
INSERT INTO app_user_roles(app_user_id, roles_id) VALUES (3,2);

INSERT INTO hibernate_sequence(next_val) VALUES (6);