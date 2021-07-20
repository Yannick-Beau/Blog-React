import React from 'react';
import PropTypes from 'prop-types';

import './counter.scss';

const Counter = ({ nbTasks }) => (
  <div className="counter">
    {nbTasks} tâche(s) en cours
  </div>
);

Counter.propTypes = {
  nbTasks: PropTypes.number.isRequired,
};

export default Counter;
