import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Header = ({ categoriesData, changeTheme, modeZen }) => {
  const ButtonName = classNames(
    // d'abord la classe qui est systématiquement présente
    { 'Activer le mode zen': !modeZen },
    // ensuite un objet pour chaque classe conditionnelle :
    // { nomClasse : condition/variable }
    { 'Désactiver le mode zen': modeZen },
  );
  return (
    <header className="menu">
      <nav>
        {categoriesData.map((item) => (
          <a key={item.label} className="menu-link menu-link--selected" href={item.route}>{item.label}</a>
        ))}
        <button className="menu-btn" type="button" onClick={changeTheme}>{ButtonName}</button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  categoriesData: PropTypes.arrayOf(
    // chaque élément est un objet avec une "forme" précise
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  changeTheme: PropTypes.func.isRequired,
  modeZen: PropTypes.bool.isRequired,
};

export default Header;
