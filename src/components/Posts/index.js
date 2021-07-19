import React from 'react';
import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import './styles.scss';

const Posts = ({ postsData, modeZen }) => (
  <main className="posts">
    <h1 className="posts-title">Dev Of Thrones</h1>
    <div className="posts-list">
      {postsData.map((item) => (
        <Post
          {...item}
          modeZen={modeZen}
          key={item.id}
        />
      ))}
    </div>
  </main>
);

Posts.propTypes = {
  postsData: PropTypes.arrayOf(
    // chaque élément est un objet avec une "forme" précise
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
    }).isRequired, // obligatoire que les éléments aient cette forme
  ).isRequired,
  modeZen: PropTypes.bool.isRequired,
};

export default Posts;
