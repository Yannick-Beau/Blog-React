/* eslint-disable react/no-danger */
/* pas de souci avec dangerouslySetInnerHtml, on a utilisé DOMPurify */
import React from 'react';
import PropTypes from 'prop-types';
/*
bibliothèque pour nettoyer du code HTML (empêcher les attaques XSS, fermer les balises
pas fermées, etc)
https://www.npmjs.com/package/dompurify
*/
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

import './styles.scss';

// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
// c'est difficile à utiliser : il faut placer le contenu dans la propriété
// __html d'un objet => c'est pour éviter qu'on trouve la syntaxe par hasard
/*
Si on interprète du code HTML (en particulier s'il provient d'une saisie
utilisateur), risque d'attaque XSS = présence de code Javascript qui sera exécuté
quand le navigateur va afficher le code HTML : redirection vers un autre site,
vol de données...
Solution : nettoyer le code HTML (enlever les parties qui posent problème), pour
ensuite pouvoir interpréter le code HTML sans risque, par exemple avec DOMPurify
*/

// https://owasp.org/www-project-top-ten/

function createMarkup(htmlContent) {
  return {
    // ici on nettoie le code HTML avant de le fournir à React
    __html: DOMPurify.sanitize(htmlContent),
  };
}

// on veut une URL unique pour chaque article
// - ce qui est unique dans les infos d'un article : id et slug => ici on va
// préférer le slug, ça donne du sens à notre URL
// - problème : si on a un article dont le slug est "react", il ne faut pas que ça
// fasse de collision avec notre catégorie "react" => on ajoute "/post" avant le slug,
// exemple d'URL : /post/angular-une-vraie-fausse-bonne-idee

const Post = ({
  title,
  category,
  excerpt,
  slug,
}) => (
  <Link to={`/post/${slug}`} className="post">
    <article>
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p className="post-excerpt" dangerouslySetInnerHTML={createMarkup(excerpt)} />
    </article>
  </Link>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Post;
