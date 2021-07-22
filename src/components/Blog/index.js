// == Import
import React, { useState, useEffect } from 'react';
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

// bibliothèque pour faciliter les appels AJAX
import axios from 'axios';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';
import SinglePost from 'src/components/SinglePost';

// data, styles et utilitaires
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
Objectif : afficher le détail d'un article
x quand on clique sur l'article, l'URL de la barre d'adresse est modifiée =>
par exemple http://xxxxxx/post/slug-de-article
x prévoir un composant pour afficher le détail d'un article (pour l'instant on 
affiche juste un texte statique)
x récupérer le slug d'article qui est dans l'URL
- afficher le détail de l'article : fournir tous les articles à SinglePost, et que
SinglePost utilise find pour trouver l'article avec le slug indiqué
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

  // on stocke les catégories dans le state
  const [categories, setCategories] = useState([]);

  // indique si on est en cours de chargement des articles
  const [loadingPosts, setLoadingPosts] = useState(true);

  // indique si on est en cours de chargement des catégories
  const [loadingCategories, setLoadingCategories] = useState(true);

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
    // console.log('on va aller charger les articles');

    // envoyer une requête vers l'API
    axios.get('https://oclock-open-apis.vercel.app/api/blog/posts')
      .then((response) => {
        // exécuté quand la réponse arrive, si cette réponse est un succès
        // console.log('then', response);

        // console.log(response.data);

        // attendre la réponse puis la traiter => trouver les articles dans la réponse,
        // et appeler setPosts en fournissant les articles : normalement les articles
        // devraient s'afficher
        setPosts(response.data);
      })
      .catch((error) => {
        // exécuté quand la réponse arrive, si cette réponse est un échec
        // console.log('catch', error);

        // TODO afficher un message d'erreur qui explique à l'utilisateur que le site
        // a rencontré un problème
      })
      .finally(() => {
        // exécuté après le bloc then ou le bloc catch
        // console.log('finally');

        // on veut faire disparaître le Spinner
        // https://fr.reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
        // => c'est mieux de ne pas s'appuyer sur la valeur précédente du state, si on
        // a la possibilité
        setLoadingPosts(false);
      });

    // console.log('On vient d\'envoyer la requête, on attend la réponse');
  };

  // charger les catégories depuis l'API
  const loadCategories = () => {
    axios.get('https://oclock-open-apis.vercel.app/api/blog/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        // TODO il faudrait afficher un message d'erreur pour l'utilisateur
      })
      .finally(() => {
        // on n'est plus en cours de chargement des catégories
        setLoadingCategories(false);
      });
  };

  // https://fr.reactjs.org/docs/hooks-effect.html
  // useEffect : pour appliquer un "effet" à un moment précis de la vie du composant
  // équivalent à la fois de cDM, cDU, cWU
  // - premier paramètre : callback qui applique l'effet
  // - deuxième paramètre facultatif : paramétrage des moments => tableau de dépendances
  //     - si non indiqué : l'effet est exécuté après
  //      chaque nouveau rendu du composant (équivalent de cDM + cDU)
  //     - si [] : l'effet est exécuté seulement après le premier rendu du
  //      composant (équivalent de cDM)
  //     - si tableau non vide (variable du state, prop, etc) : l'effet est exécuté
  //      après le premier rendu, et ensuite pour les autres rendus l'effet sera
  //      appliqué seulement si l'une des dépendances a changé de valeur depuis le
  //      dernier rendu
  useEffect(() => {
    // console.log('voici l\'effet');
    loadPosts();
    loadCategories();
    // attention : pas de garantie de recevoir les réponses dans le même ordre
    // que l'ordre d'envoi des requêtes => on a donc mis en place dans le state un
    // statut loading pour les articles et un autre pour les catégories
  }, []);
  // risque de boucle infinie : si on ne met pas de deuxième argument pour useEffect
  // et que dans l'effet on a une modification du state

  /*
  (loadingPosts || loadingCategories) && JSX
  => on affiche le JSX si catégories pas encore chargées ou articles pas encore
  chargés
  */
  /*
  !loadingPosts && !loadingCategories && JSX => on affiche le JSX seulement si les
  deux statuts loading sont à false
  */
  return (
    <div className="blog">
      <Header categories={categories} isZenMode={zenMode} changeZenMode={setZenMode} />
      {(loadingPosts || loadingCategories) && <Spinner />}
      {!loadingPosts && !loadingCategories && (
        <Switch>
          <Redirect from="/jquery" to="/autre" />
          {categories.map((category) => (
            <Route path={category.route} exact key={category.label}>
              <Posts
                posts={getPostsByCategory(category.label)}
                isZenMode={zenMode}
                category={category.label}
              />
            </Route>
          ))}
          <Route path="/post/:slug">
            <SinglePost posts={posts} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
};

// == Export
export default Blog;
