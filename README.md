

Ce projet consiste en la création d'une application Todo List en utilisant React pour le frontend et NestJS pour le backend, avec une base de données MySQL pour stocker les tâches.

Déscription des choix techniques, les décisions prises, ainsi que les problèmes rencontrés pendant le développement.

## Structure du Projet 

Le backend est développé en NestJS et utilise une base de données MySQL pour stocker les tâches. La communication entre le frontend et le backend se fait via une API REST.

## Fonctionnalités principales :
- GET /tasks : Récupérer toutes les tâches
- POST /tasks : Créer une nouvelle tâche
- PATCH /tasks/:id : Mettre à jour une tâche existante
- DELETE /tasks/:id : Supprimer une tâche

## Prérequis
- Node.js plateforme d’exécution JavaScript côté serveur. .
- MySQL : SGBDR qui est un logiciel qui  permet de stocker, organiser, et gérer des données dans des tables.
- yarn qui est un gestionnaire de paquets JavaScript, comme npm, qui permet d’installer, mettre à jour, et gérer les dépendances (libs et frameworks) d’un projet Node.js.



## Architecture du Code

L'architecture de l'API suit les principes Domain-Driven Design (DDD) avec une séparation des préoccupations claire. Le code est divisé en plusieurs composants clés :

1. Controllers
Les contrôleurs sont responsables de la gestion des requêtes HTTP. Dans ce projet, le TaskController contient les routes principales pour manipuler les tâches.

2. Use Cases
Les cas d'utilisation représentent la logique métier et sont appelés à partir du contrôleur. Les Use Cases sont chargés de :
- Récupérer toutes les tâches
- Créer, mettre à jour ou supprimer une tâche
Ils sont encapsulés dans des classes comme : SaveTaskUseCase, GetAllTasksUseCase et DeleteTask.

3. DTOs (Data Transfer Objects)
Les DTOs sont utilisés pour structurer les données envoyées entre le client et le serveur. Le SaveTaskDto contient les informations nécessaires pour créer ou mettre à jour une tâche.

4. Exception Handling
Des exceptions personnalisées sont lancées dans le cas où une erreur se produit, notamment les exceptions BadRequestException et NotFoundException.

## Difficultes rencontrees

J'ai eu des erreurs lors de la validation des données envoyées (ex : nom de la tâche). 

J'ai eu des problemes lors de la connexion à la base de données, plutot dans la configuration de la base de données MySQL.



