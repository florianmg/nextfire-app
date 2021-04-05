# Cours associé au projet

## NextJs installation

- ```npx create-next-app nextfire-app ```

## Typescript installation
- Créer un fichier 'tsconfig.json' a la racine du projet et le laisser vide.
- ```yarn add --dev typescript @types/react ```
- ```npm run dev```
- Plus d'informations : [Documentation NextJs Typescript](https://nextjs.org/docs/basic-features/typescript) 

## Firebase installation
- ```npm install firebase react-firebase-hooks```
- Se rendre sur [Firebase](https://firebase.google.com/).
- Créer un nouveau projet.
- Activer l'authentication (Google, Facebook, Email etc...) dans Créer > Authentication.
- Activer Firestore (Database NoSql) dans Créer > Firestore.
- Ajouter une application web depuis la 'Vue d'ensemble du projet'. (Un projet peut avoir plusieurs applications)
- Ajouter le SDK Firebase a l'application dans /lib/firebase.ts
- Plus d'informations [Firebase JS](https://firebase.google.com/docs/web/setup) - [Reacts Firebase Hooks](https://www.npmjs.com/package/react-firebase-hooks)

## Firebase Google auth 
- Initialisation du provider Google ```export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();```
- Import du provider et du module auth dans le component ```import { auth, googleAuthProvider } from '../lib/firebase'```
- Connexion: ```await auth.signInWithPopup(googleAuthProvider)```
- Déconnexion: ```auth.signOut()```