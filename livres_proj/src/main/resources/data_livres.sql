-- Script d'insertion de données réelles pour Livre et Ecrivain
-- Base de données : livres_DB

USE livres_DB;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE livre;
TRUNCATE TABLE ecrivain;
SET FOREIGN_KEY_CHECKS = 1;

-- Insertion des écrivains réels
INSERT INTO ecrivain (id_ecrivain, nom_ecrivain, prenom_ecrivain) VALUES
(1, 'Hugo', 'Victor'),
(2, 'de Saint-Exupéry', 'Antoine'),
(3, 'Camus', 'Albert'),
(4, 'Flaubert', 'Gustave'),
(5, 'Dumas', 'Alexandre'),
(6, 'Zola', 'Émile'),
(7, 'Orwell', 'George');

-- Insertion des livres réels associés
INSERT INTO livre (id_livre, titre_livre, nombre_pages, prix, date_publication, ecrivain_id_ecrivain) VALUES
(1, 'Les Misérables', 1488, 29.50, '1862-04-01', 1),
(2, 'Notre-Dame de Paris', 940, 21.00, '1831-03-16', 1),
(3, 'Le Petit Prince', 96, 12.50, '1943-04-06', 2),
(4, 'Vol de nuit', 180, 14.00, '1931-12-01', 2),
(5, 'L\'Étranger', 184, 15.00, '1942-05-19', 3),
(6, 'La Peste', 336, 18.50, '1947-06-10', 3),
(7, 'Madame Bovary', 464, 16.90, '1857-04-12', 4),
(8, 'Le Comte de Monte-Cristo', 1276, 32.00, '1844-08-28', 5),
(9, 'Germinal', 592, 17.50, '1885-03-01', 6),
(10, '1984', 376, 19.90, '1949-06-08', 7);

