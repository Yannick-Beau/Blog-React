// == Import
import React, { useState } from 'react';
// composant Route : permet de faire un affichage conditionnel en fonction de l'URL
// de la barre d'adresse
// comparaison "qui commence par" => si on a une Route avec path="/" en fait elle
// est toujours affichée. Solution : ajouter la prop "exact" sur la Route qui pose
// problème

// composant Switch : si on englobe des Routes dans un Switch, alors seule la
// première route qui correspond à l'URL est utilisée => permet d'avoir une Route
// par défaut (sans path) pour la page d'erreur 404

// composant Redirect : redirige une URL vers une autre URL (par exemple si une
// page a été déplacée)
import { Route, Switch, Redirect } from 'react-router-dom';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import './styles.scss';

// un composant peut être écrit sous forme de fonction sauf si on veut certaines
// fonctionnalités :
// - state
// - méthodes du cycle de vie (componentDidMount etc)
// ou si on utilise les hooks
// => en utilisant les hooks, on peut accéder au cycle de vie ou utiliser un state
// tout en laissant notre composant sous forme de fonction

// hooks : le nom commence par "use", par exemple useState

/*
Objectif : charger les articles depuis une API
x stocker les articles dans le state
x bouton pour déclencher le chargement
- challenge : faire une requête vers l'API pour récupérer les articles
- ajouter loading dans le state et en fonction de la valeur afficher le composant
Spinner
- bonus : récupérer aussi les catégories depuis l'API
*/

// == Composant
const Blog = () => {
  // useState : hook d'état, permet de créer une case dans le state

  // useState prend en argument la valeur initiale à placer dans la case du state
  // useState retourne un tableau avec deux informations :
  // - la valeur de la case du state
  // - une fonction qui permet de changer la valeur de la case

  // destructuring de tableau
  // on crée une variable zenMode qui contient le premier élément du tableau
  // (la valeur de la case du state)
  // on crée une variable setZenMode qui contient le deuxième élément du tableau
  // (une fonction qui permet de changer la valeur de la case)
  const [zenMode, setZenMode] = useState(false);

  // je crée une case dans le state pour stocker le tableau des articles
  // initialement tableau vide
  const [posts, setPosts] = useState([]);

  // obtenir les articles qui correspondent à une catégorie
  const getPostsByCategory = (category) => {
    let results;
    if (category === 'Accueil') {
      results = posts;
    }
    else {
      results = posts.filter((post) => post.category === category);
    }

    return results;
  };

  // charger les articles depuis l'API
  const loadPosts = () => {
    console.log('on va aller charger les articles');

    // envoyer une requête vers l'API

    // attendre la réponse puis la traiter => trouver les articles dans la réponse,
    // et appeler setPosts en fournissant les articles : normalement les articles
    // devraient s'afficher
  };

  return (
    <div className="blog">
      <Header categories={categoriesData} isZenMode={zenMode} changeZenMode={setZenMode} />
      <button
        type="button"
        onClick={() => {
          loadPosts();
        }}
      >
        Load posts
      </button>

      <Switch>
        <Redirect from="/jquery" to="/autre" />
        {categoriesData.map((category) => (
          <Route path={category.route} exact key={category.label}>
            <Posts posts={getPostsByCategory(category.label)} isZenMode={zenMode} />
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

// == Export
export default Blog;
