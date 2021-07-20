import React from 'react';
import PropTypes from 'prop-types';

import './form.scss';

const Form = ({ manageSubmit, value, setValue }) => (
  <form
    className="form-addTask"
    onSubmit={(event) => {
      event.preventDefault();

      // si on voulait récupérer la valeur de l'input au moment de la soumission
      // du formulaire :
      // event.currentTarget.childNodes[0].value;
      // event.currentTarget.querySelector('.input-addTask').value;

      // mais c'est fragile : cassé si on ajoute une div autour de l'input / si
      // on change la classe CSS de l'input

      // on utilise un champ contrôlé pour l'input : App connaît à tout moment la
      // valeur de l'input => pas besoin de transmettre la valeur de l'input au
      // moment du submit
      manageSubmit();
    }}
  >
    <input
      className="input-addTask"
      placeholder="Ajouter une tâche"
      type="text"
      value={value}
      onChange={(event) => {
        // console.log(`nouvelle valeur : ${event.currentTarget.value}`);

        setValue(event.currentTarget.value);
      }}
    />
  </form>
);

Form.propTypes = {
  manageSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  // paramètre : nouvelle valeur
  setValue: PropTypes.func.isRequired,
};

export default Form;
