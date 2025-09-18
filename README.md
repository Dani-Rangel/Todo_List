# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 📝 TAREAS - Lista de Tareas con Login

Aplicación web para gestionar tareas personales, desarrollada con **React + Vite** y organizada siguiendo la metodología **Git Flow**. Cuenta con autenticación de usuario y persistencia de datos simulada con `json-server`.

---

## 🚀 Tecnologías utilizadas

- ⚛️ React (con Vite)
- 🧠 React Hooks
- 🧩 Componentes modulares
- 💅 CSS
- 🎯 ESLint + Prettier
- 🍞 react-toastify
- 🎮 framer-motion
- 🔧 json-server (API falsa para testing)
- ✅ Git Flow

---

## 📁 Estructura del proyecto

Todo_List/
│
├── public/
├── src/
│ ├── assets/ # Recursos como imágenes o íconos
│ ├── components/ # Componentes reutilizables de UI
│ │ ├── FilterBar.jsx
│ │ ├── Login.jsx
│ │ ├── TaskForm.jsx
│ │ ├── TaskItem.jsx
│ │ └── TaskList.jsx
│ ├── hooks/ # Custom hooks (si aplica)
│ ├── pages/ # Páginas completas
│ │ ├── LoginPage.jsx
│ │ └── TasksPage.jsx
│ ├── App.jsx
│ ├── App.css
│ ├── main.jsx
│ └── index.css
│
├── db.json # Base de datos falsa para json-server
├── .eslintrc.json # Configuración de ESLint
├── .prettierrc # Configuración de Prettier
├── eslint.config.js
├── postcss.config.js
├── vite.config.js
├── index.html
├── package.json
└── README.md 

## Git Flow (metodología de ramas)

## Ejemplo de flujo:

# Nueva funcionalidad
git checkout develop
git pull origin develop
git checkout -b feature/NuevaFeature

# Al terminar:
git checkout develop
git merge feature/NuevaFeature
git push origin develop

# Preparar release:
git checkout -b release/1.0.0
git push origin release/1.0.0

# En producción:
git checkout main
git merge release/1.0.0
git push origin main

git checkout develop
git merge release/1.0.0
git push origin develop

git branch -d release/1.0.0
git push origin --delete release/1.0.0

## Autores 
-cesar jimenez
-Daniel Rangel
