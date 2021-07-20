// == Import : npm
import React from 'react';
import { render } from 'react-dom';
// react-router-dom : bibliothèque qui permet d'interagir avec la barre d'adresse
// du navigateur, mais sans recharger la page. Elle utilise l'API History du
// navigateur
// https://developer.mozilla.org/en-US/docs/Web/API/History_API
// https://reactrouter.com/web/guides/quick-start

// BrowserRouter doit englober toute notre application pour que react-router-dom
// puisse gérer l'affichage en fonction de l'URL
// on importe un composant qui s'appelle BrowserRouter, mais on lui donne un autre
// nom (Router)
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : local
// Composants
import Blog from 'src/components/Blog';

// == Render
// 1. Le composant racine (celui qui contient l'ensemble de l'app)
const rootComponent = (
  <Router>
    <Blog />
  </Router>
);

// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// Le rendu de React => DOM
render(rootComponent, target);
