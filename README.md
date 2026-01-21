# Dashboard Frontend - Labo Virtuel

Ce projet est un **dashboard frontend** développé avec **React.js** pour un laboratoire virtuel destiné à l’enseignement supérieur. Il prend en charge trois types d’utilisateurs : **Admin**, **Enseignant** et **Étudiant**.

---

## Fonctionnalités principales

- Gestion des utilisateurs (Admin)
- Supervision des laboratoires et étudiants (Enseignant)
- Accès aux cours et résultats (Étudiant)
- Authentification et routes sécurisées selon le rôle
- Interface moderne avec composants réutilisables (Navbar, Sidebar, Cards...)

---

## Architecture globale

- **Layouts** : structure globale de chaque type d’utilisateur (Admin, Enseignant, Étudiant)
- **Pages** : contenu spécifique pour chaque rôle (Dashboard, tp, cours, parametres...)
- **Components** : éléments réutilisables dans toute l’application
- **API** : appels vers le backend pour récupérer ou modifier les données
- **Context** : état global de l’application (authentification, profil utilisateur)
- **Routes** : gestion des routes et protection selon le rôle
-**auth** : la partie de login de l'utilisateur
- **App.jsx & index.jsx** : point d’entrée et routage principal de l’application

---

## Fonctionnement

1. L’utilisateur se connecte via la page de login.
2. Selon son rôle, il est redirigé vers le layout correspondant.
3. Les pages sont affichées dans ce layout, avec Navbar et Sidebar communes.
4. Toutes les données viennent de l’API, et l’état global est géré via Context.

---

## Bonnes pratiques

- Réutiliser les composants communs pour garder le code propre.
- Sécuriser les routes avec le rôle utilisateur.
- Centraliser les appels backend dans le dossier API.
- Séparer clairement les pages par rôle pour plus de clarté.

---

