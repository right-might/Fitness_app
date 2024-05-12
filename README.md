# PROJET PILOTE du groupe 456 en binaire

## Backend

### Lancer le serveur

Faire la commande `./mvnw clean spring-boot:run` (ou `./mvnw clean spring-boot:run` ou `mvnw clean spring-boot:run`sur Windows) à partir du répertoire _backend_.  
Cette commande devrait compiler le code du serveur et le démarrer localement en utilisant le port 8080.

### Lancer les tests

Faire la commande `./mvnw clean verify` (ou `./mvnw clean verify` ou `mvnw clean verify`sur Windows) à partir du répertoire _backend_.

## Frontend

### Installation

Installer node.js v18 minimum (voir https://nodejs.org/).  
Mettre à jour npm `npm install -g npm@10.4.0`.  
Installer l’outil de ligne de commande d’Angular `npm install -g @angular/cli`.  
Installer les dépendances du projet `npm install`.

### Lancer l’application

Faire la commande `ng serve`.  
Vous devriez pouvoir vous connecter à http://localhost:4200/ pour voir l’application.

### Compiler l’application

Faire la commande `ng build`. Cela créera les fichiers devant être déployés dans le dossier 'dist'.

### Lancer les tests

Faire la commande `ng test`.

## Base de données locale MySQL

Installer MySQL sur votre ordinateur (https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/).  
**Important!** Conserver le mot de passe par défaut de `root` qui est aussi `root`.

Ouvrir un terminal de commande et aller dans le répertoire d'installation de MySQL soit, par défaut :  
 sur Windows `\Program Files\MySQL\MySQL Server 8.0\bin`  
 sur Mac `/usr/local/mysql/bin/mysql`

Ouvrir MySQL avec la commande `mysql -u root -p`, puis entrer le mot de passe de _root_ qui doit être `root`.  
Si votre mot de passe n'est pas `root`, il suffit de créer une variable d'environnement appelée `BD_PASSWORD` contenant votre mot de passe.

Faire rouler le script de création de la base de données `creationBD.sql` (456-en-binaire\scripts\creationBD.sql).  
**Important!** S'il y a des modifications nécessaires dans la base de données, **il faut tenir à jour ce script**.

---

Ce document sert a officialiser les langues d'usage, fournir le commandes pour installer l'environnement sngular et pouvoir code en SCSS.

##Langue d'usage

L'anlgais doit être utilisé pour les attributs suivants :

-   Le nom des variables
-   Le nom des constantes
-   Le nom des fonctions

Le français doit être utilisé pour les attributs suivants :

-   Les messages pour les commit
-   Les noms des fonctionalites

-   \*\*IMPORTANT: Pour resoudre le probleme de mysql concernant le "lower_case_table_names", vous pouvez suivre les indications du present lien.
    La proposition de Florin Tintea est la mieux indiquee. Je vous suggere de sauter l'etape du "mysql_secure_installation".
    Cela devrait corriger beaucoup de bugs dans le mysql.  
     (https://stackoverflow.com/questions/53103588/lower-case-table-names-1-on-ubuntu-18-04-doesnt-let-mysql-to-start)

## Les commandes Gitlab

-   **ATTENTION: ON NE FAIT PAS DE MODIFICATIONS (LE CODE), NI DE MERGE REQUEST SUR LA BRANCHE MAIN**. Il y a la branche Dev dans lequel on fera tous les git push suivant les modifications. Il ne faut pas que la branche main plante
-   Les branches main et Dev seront partagées entre les 3 équipes.
-   Chaque fonctionalité doit avoir sa branche. Faire tous les push sur cette branche pour les modifications. Quand les modifications, faire un merge request **vers la branche Dev**.
-   Pour la commande git commit, il faut absolument ajouter un message. Exemple : git commit -m "Écrire mon message concernant le git commit".

##Syntaxe du code
Pour s'assurer d'avoir une syntaxe uniforme, il faut faire les choses suivantes

-   Pour Javascript et HTML, installer l'extension ESLint
    -   Pour HTML, il faut ecrire les commandes suivantes pour des plugins :
        -   npm install eslint-plugin-html
        -   nom install eslint-plugin-vue
-   Pour Java, installer l'extension Checkstyle
-   pour SCSS, installer l'extension stylelint

Ces extensions sont disponibles sur VSCode. Ces extensions vont donner des messages d'erreur quand la syntaxe n'est pas respectée. Si ces erreurs ne sont pas corrigées, le git push ne fonctionnera pas.
