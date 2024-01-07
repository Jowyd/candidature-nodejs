## Epreuve recrutement Axopen NodeJS

Cette application est fonctionnelle, et ne demande qu'une base de donnée MariaDB afin de pouvoir être lancée.  
Vous pouvez, si vous le souhaitez, lancer l'application après avoir installé la BDD et créer les tables tels que définis dans `db.sql`.

## Interactions

Il s'agit d'une API REST, qui permet les interactions suivantes :
- Créer un utilisateur
- Se connecter grâce à un utilisateur existant, afin de récupérer un token
- Créer un `chantier` avec des informations aléatoires
- Modifier un chantier
- Récupérer un chantier
- Supprimer un chantier

Toutes les routes concernant les chantiers sont protégées, et demandes un token de type `Bearer` (obtenu grâce à la connexion).

### Aides

Afin de vous aider dans votre entreprise, vous trouverez ci-dessous un tableau avec les fichiers et le nombres de remarques que nous avons détérminés pour le barème.

N.B. cette liste est non exhaustive, n'hésitez donc pas faire du zèle !

| Fichier                | Nombre de remarques |
|------------------------|---------------------|
| database-connection.js | 3                   |
| helpers/chantier.js    | 8                   |
| routes/chantier.js     | 4                   |
| helpers/user/js        | 3                   |
| token-utils.js         | 3                   |
| random-utils.js        | 1                   |V
| index.js               | 5                   |
| db.sql                 | 5                   |V
| Générales              | 2                   |V
