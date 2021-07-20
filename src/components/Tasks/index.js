import React from 'react';
import PropTypes from 'prop-types';

import './tasks.scss';
import Task from './Task';

/*
Spread operator (...) :
on déverse chaque information de l'objet item en prop du composant Task
<Task
  {...item}
/>
c'est comme si on faisait
<Task
 id={item.id}
 label={item.label}
 done={item.done}
 etc
/>
(il faut forcément avoir des noms de props identiques aux noms des propriétés
de l'objet)
*/

const Tasks = ({ tasksList, updateTaskDone }) => (
  <ul className="tasks">
    {tasksList.map((item) => (
      <Task
        {...item}
        key={item.id}
        updateTaskDoneOnTask={updateTaskDone}
      />
    ))}
  </ul>
);

Tasks.propTypes = {
  tasksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      /* on valide seulement les informations réellement utilisées par Tasks */
    }).isRequired,
  ).isRequired,
  updateTaskDone: PropTypes.func.isRequired,
};

export default Tasks;
