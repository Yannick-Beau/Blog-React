import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Post = ({
  id,
  category,
  title,
  excerpt,
  modeZen,
}) => {
  const idPost = `post-${id}`;
  const cssClass = classNames(
    'post',
    { 'post-zen': modeZen },
  );
  return (
    <article className={cssClass} id={idPost}>
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
  modeZen: PropTypes.bool.isRequired,
};

export default Post;
