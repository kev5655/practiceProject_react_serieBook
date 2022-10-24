

INSERT INTO app_role(id, name) VALUES (1,'ROLE_ADMIN');
INSERT INTO app_role(id, name) VALUES (2,'ROLE_USER');

INSERT INTO app_user(id, email, password, username)
VALUES (3,'admin@admin.com',
        '$2a$10$fdz71Su6F8DNpNzf8Jjt5.HND.hR7FZA8EBzDChMEHjOM6ftw6v5C',
        'admin');

INSERT INTO app_user_roles(app_user_id, roles_id) VALUES (3,1);
INSERT INTO app_user_roles(app_user_id, roles_id) VALUES (3,2);

INSERT INTO hibernate_sequence(next_val) VALUES (6);