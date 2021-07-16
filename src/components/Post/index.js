import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Post = ({
  id,
  category,
  title,
  excerpt,
}) => {
  const idPost = `post-${id}`;
  return (
    <article className="post" id={idPost}>
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p className="post-excerpt">{excerpt}</p>
    </article>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

export default Post;
