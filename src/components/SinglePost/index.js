import React from 'react';
import PropTypes from 'prop-types';
// useParams : hook de la bibliothèque react-router-dom qui permet d'accéder
// aux paramètres d'URL
// c'est une fonction qu'on appelle sans fournir d'arguments, qui retourne tous
// les paramètres sous forme d'objet (en utilisant les noms qu'on a fournis au
// niveau de la Route avec ":")
import { useParams } from 'react-router-dom';

import './singlePost.scss';

const SinglePost = ({ posts }) => {
  // console.log(useParams());
  const { slug } = useParams();

  // on récupère l'article qui a le slug indiqué
  const result = posts.find((item) => item.slug === slug);

  return (
    <article className="single-post">
      <h2 className="post-title">{result.title}</h2>
      <div className="post-category">{result.category}</div>
      <p className="post-excerpt">{result.content}</p>
    </article>
  );
};

SinglePost.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default SinglePost;
