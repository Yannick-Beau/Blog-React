import React from 'react';
import PropTypes from 'prop-types';
// composant Link : permet de représenter un lien (balise a) vers une autre page,
// un clic sur ce lien changera le contenu de la barre d'adresse (contenu de la
// prop "to") mais sans recharger la page

// composant NavLink : version spéciale de Link qui permet d'avoir en plus la mise
// en valeur automatique (CSS) du lien qui correspond à l'URL de la barre d'adresse
// La comparaison qui est faite est "qui commence par" : si URL de la barre d'adresse
// est "/react" => est-ce que "/react" commence par "/" ? oui, donc le lien de
// "accueil" a la mise en forme spéciale
// Si on vaut une comparaison exacte : utilisation de la prop "exact"
import { NavLink } from 'react-router-dom';

import './styles.scss';

/*
key c'est une prop spéciale, qui sert pour la réconciliation entre DOM réel et DOM
virtuel => à utiliser notamment avec map
Pour en savoir plus :
https://reactjs.org/docs/lists-and-keys.html
https://reactjs.org/docs/reconciliation.html
*/

const Header = ({ categories, isZenMode, changeZenMode }) => (
  <header className="menu">
    <nav>
      {categories.map((category) => (
        <NavLink
          className="menu-link"
          to={category.route}
          key={category.label}
          activeClassName="menu-link--selected"
          exact
        >
          {category.label}
        </NavLink>
      ))}

      <button
        className="menu-btn"
        type="button"
        onClick={() => {
          changeZenMode(!isZenMode);
        }}
      >
        {isZenMode ? 'Désactiver' : 'Activer'} le mode zen
      </button>
    </nav>
  </header>
);

Header.propTypes = {
  // tableau qui contient des objets (propriétés route et label)
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  isZenMode: PropTypes.bool.isRequired,
  // paramètre : nouvelle valeur
  changeZenMode: PropTypes.func.isRequired,
};

export default Header;
