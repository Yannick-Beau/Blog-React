import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Post from 'src/components/Post';

import './styles.scss';

/*
  {...post}
  on déverse toutes les informations de post (un objet) dans les props du composant
  Post.
  c'est comme si on faisait :
  title={post.title} category={post.category} etc
*/

const Posts = ({ posts, isZenMode, category }) => {
  // on veut toujours la classe posts
  // on veut conditionnellement la classe posts--zen en fonction de isZenMode
  const cssClass = classNames('posts', {
    'posts--zen': isZenMode,
  });

  // avec [category] en deuxième argument : l'effet s'applique après le premier rendu,
  // et pour les rendus suivants il s'applique seulement si category a changé de valeur
  // depuis le rendu précédent
  useEffect(() => {
    console.log('on va changer le titre');
    document.title = `Dev of Thrones - ${category}`;
  }, [category]);

  return (
    <main className={cssClass}>
      <h1 className="posts-title">{category}</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <Post
            {...post}
            key={post.id}
          />
        ))}
      </div>
    </main>
  );
};

Posts.propTypes = {
  // tableau avec des objets => on utilise seulement l'id dans le composant Posts
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  isZenMode: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
};

export default Posts;
