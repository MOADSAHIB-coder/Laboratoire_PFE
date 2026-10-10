# Dashboard Frontend - Labo Virtuel

Ce projet consiste en le développement d'un **Dashboard Frontend** moderne et dynamique utilisant **React.js**, connecté à un backend **Django REST Framework**. Conçu pour un environnement de **Laboratoire Virtuel** dans l’enseignement supérieur, il offre une interface adaptée à trois types d’utilisateurs : **Administrateur**, **Enseignant**, et **Étudiant**.

---

## 📌 Contexte & Parcours Académique

Ce projet marque une étape clé dans notre cursus :
- **Spécialité :** Dernière année d'études en **Gestion des Réseaux et Sécurité**.
- **Jalon :** **3ᵉ projet académique majeur** de notre parcours.
- **Première expérience :** Première immersion et prise en main des frameworks **React.js** (Frontend) et **Django** (Backend).

Ce projet a permis d'allier nos compétences en infrastructure/sécurité aux pratiques modernes de développement web full-stack, avec une forte attention portée à la sécurité des accès et à l'architecture applicative.

---

## 👥 Équipe de Projet & Encadrement

* **Membres de l'équipe :**
  - **SAHIB Moad**
  - **Loubna FARAH**
  - **MEME-LEKO juste glavany**

* **Sous l'encadrement de :**
  - **Prof. Nawal NASSIRI**

---

## ✨ Fonctionnalités Principales

- **Gestion multi-rôles :**
  - **Admin :** Gestion centralisée des utilisateurs et des configurations du système.
  - **Enseignant :** Supervision des travaux pratiques (TP), suivi des étudiants et gestion des laboratoires.
  - **Étudiant :** Accès aux cours, réalisation des TP virtuels et consultation des résultats.
- **Authentification & Sécurité :** Gestion des sessions et protection des routes selon les privilèges (RBAC - Role-Based Access Control).
- **Interface Réutilisable :** Conception de composants UI modulaires (Navbar, Sidebar, Cards, Formulaires).

---

## 📂 Architecture du Projet (Frontend)

```text
src/
├── api/          # Centralisation des appels HTTP (Axios/Fetch) vers l'API Django
├── auth/         # Modules d'authentification et gestion du login
├── components/   # Composants UI réutilisables (Navbar, Sidebar, Buttons, etc.)
├── context/      # Gestion de l'état global (Auth Context, User Data)
├── layouts/      # Structures de pages par rôle (AdminLayout, TeacherLayout, StudentLayout)
├── pages/        # Vues spécifiques (Dashboard, TP, Cours, Paramètres, etc.)
├── routes/       # Configuration du routage et contrôle d'accès sécurisé
├── App.jsx       # Composant racine et définition des routes principales
└── index.jsx     # Point d'entrée de l'application
```

---

## ⚙️ Fonctionnement Général

1. **Authentification :** L'utilisateur s'identifie via l'interface de connexion (`/auth`).
2. **Redirection dynamique :** En fonction du rôle récupéré du backend Django, l'utilisateur est redirigé vers son espace dédié (`Layout`).
3. **Navigation sécurisée :** Les composants communs (Navbar/Sidebar) s'adaptent selon le profil.
4. **Gestion des données :** Les échanges d'informations s'effectuent de manière asynchrone via l'API, et l'état global de l'application est maintenu par React Context.

---

## 🛠️ Bonnes Pratiques Adoptées

- **Modularité :** Réutilisation maximale des composants UI pour conserver un code propre et maintenable.
- **Sécurité :** Protection stricte des routes côté client en concordance avec l'API backend.
- **Centralisation API :** Isolation des requêtes réseau dans un dossier dédié pour faciliter la maintenance.
- **Organisation :** Séparation claire des espaces utilisateurs et des responsabilités dans le code.
