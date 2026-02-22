# EcoAction - Plateforme de Bénévolat Environnemental

## 1. Contexte du projet

**EcoAction** est une application mobile React Native (Expo) qui permet aux citoyens de découvrir, s'inscrire et gérer des missions de bénévolat locales. Les missions incluent le nettoyage de plages, la plantation d'arbres ou des ateliers zéro déchet. L'application offre une expérience fluide même avec un réseau instable grâce à la gestion intelligente du cache via **TanStack Query**.

---

## 2. Fonctionnalités (MVP)

1. **Authentification**  
   - Inscription et connexion d’un utilisateur (simulation).  
   - Gestion de l’état de l’utilisateur via un **AuthProvider** global.

2. **Exploration des missions**  
   - Liste des missions avec **filtres par catégorie** et recherche textuelle.  
   - Détails d’une mission avec description, date, lieu et places restantes.

3. **Gestion des participations**  
   - S’inscrire ou annuler sa participation à une mission.  
   - Vue “Mes Missions” pour consulter l’agenda personnel.

4. **Profil utilisateur**  
   - Affichage de statistiques simples (nombre de missions, actions réalisées).

---

## 3. Architecture du projet

- **Framework** : React Native + Expo  
- **Navigation** : Expo Router (Tabs + Stack)  
- **Gestion état & réseau** : TanStack Query (`useQuery` et `useMutation`)  
- **Context global** : `AuthProvider` pour gérer l’utilisateur connecté  
- **API** : JSON-Server (`db.json`) simulant backend REST  

**Structure principale :**


app/
├─ (tabs)/
│ ├─ index.tsx # Accueil
│ ├─ missions.tsx # Liste et filtre des missions
│ ├─ my-missions.tsx # Missions de l’utilisateur
│ ├─ profil.tsx # Profil utilisateur
│ └─ mission/[id].tsx # Détails d’une mission
├─ login.tsx
├─ register.tsx
└─ _layout.tsx # QueryClientProvider + AuthProvider
components/
├─ MissionCard.tsx
└─ StatCard.tsx
context/
└─ auth.tsx
services/
├─ api.ts
└─ missions.service.ts
types/
├─ mission.ts
└─ user.ts
db.json # Mock backend


---

## 4. Installation et lancement

```bash
# Cloner le dépôt
git clone <url_du_depot>
cd EcoAction

# Installer les dépendances
npm install

# Lancer le projet Expo
npx expo start