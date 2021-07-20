import React from 'react';
import PropTypes from 'prop-types';
// https://www.npmjs.com/package/classnames
// utilisation d'une bibliothèque pour gérer la concaténation de classes CSS
// conditionnelles
import classNames from 'classnames';

/* Objectif : gérer le clic sur une tâche (chaque checkbox doit être un champ
  contrôlé, ici en fait il ne reste que le contrôle en écriture à faire)
- méthode dans App qui fait appel à setState
- cette méthode est fournie au composant qui contient l'input en prop
- le composant appelle cette prop avec un événement change
*/

// pour ne pas répéter du code, on isole le li dans un nouveau composant Task.
// Ce nouveau composant n'aurait pas d'intérêt en-dehors de Tasks => on le place
// directement dans le dossier, NomDuComposant.js

// le css pour ce sous-composant est dans le fichier css du composant parent (ici
// tasks.scss) => pas besoin d'importer le fichier ici, il suffit qu'il soit importé
// au moins une fois pour que Webpack le prenne en compte

const Task = ({ id, done, label, updateTaskDoneOnTask }) => {
  const idTask = `checkbox-${id}`;

  /* let cssClass = 'task-container';
  if (done) {
    cssClass += ' task-container--done';
  } */

  // on a utilisé une bibliothèque pour simplifier l'écriture de code
  const cssClass = classNames(
    // d'abord la classe qui est systématiquement présente
    'task-container',
    // ensuite un objet pour chaque classe conditionnelle :
    // { nomClasse : condition/variable }
    { 'task-container--done': done },
  );
  // => construction automatique de la chaîne de caractères avec les classes CSS

  return (
    <li className={cssClass}>
      <label className="label" htmlFor={idTask}>
        <input
          type="checkbox"
          className="checkbox"
          id={idTask}
          checked={done}
          onChange={(event) => {
            // console.log(`changement, nouvelle valeur : ${event.currentTarget.checked}`);
            updateTaskDoneOnTask(event.currentTarget.checked, id);
          }}
        />
        {label}
      </label>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  updateTaskDoneOnTask: PropTypes.func.isRequired,
};

export default Task;
