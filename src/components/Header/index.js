import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Header = ({ categoriesData }) => (
  <header className="menu">
    <nav>
      {categoriesData.map((item) => (
        <a className="menu-link menu-link--selected" href={item.route}>{item.label}</a>
      ))}
      <button className="menu-btn" type="button">Activer le mode zen</button>
    </nav>
  </header>
);

Header.propTypes = {
  categoriesData: PropTypes.arrayOf(
    // chaque élément est un objet avec une "forme" précise
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Header;
