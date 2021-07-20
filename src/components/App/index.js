// == Import npm
import React from 'react';

// == Import
import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import Tasks from 'src/components/Tasks';

// import du fichier de données
import initialTasks from 'src/data/tasks';

import './styles.scss';

// == Composant
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: initialTasks,
      // contenu de l'input pour ajouter une tâche
      inputTaskLabel: '',
    };

    this.addTask = this.addTask.bind(this);
    this.updateTaskLabel = this.updateTaskLabel.bind(this);
    this.updateTaskStatus = this.updateTaskStatus.bind(this);
  }

  // ajoute une tâche
  // eslint-disable-next-line class-methods-use-this
  addTask() {
    const { inputTaskLabel, tasks } = this.state;
    // console.log(`on va ajouter une tâche : ${inputTaskLabel}`);

    // on calcule le prochain id : récupération de l'id max actuel et +1
    // on récupère tous les id dans un tableau
    const idTab = tasks.map((item) => item.id);
    // idTab vaut [1, 13, 4, 8]

    // on applique Math.max sur le tableau pour connaître l'id le plus grand
    const idMax = Math.max(...idTab);
    // on déverse dans les arguments de Math.max tous les éléments du tableau
    // Math.max(idTab[0], idTab[1], etc)

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max

    // créer un objet tâche
    const newTask = {
      id: idMax + 1,
      label: inputTaskLabel,
      done: false,
    };

    // ajouter cette tâche dans this.state.tasks
    // INTERDIT de modifier directement ce qui est dans le state => il faut passer
    // par setState
    // this.state.tasks.push(newTask);

    // immutabilité : on considère que ce qui est stocké dans le state ne doit jamais
    // être modifié => pour modifier, il faut remplacer

    // on va donc faire une copie du tableau, et modifier cette copie, puis
    // remplacer le tableau dans le state par la copie modifiée

    // en Javascript, les types primitifs (string, number, boolean) sont stockés
    // par valeur, alors que les tableaux et objets sont stockés par référence
    // => la ligne suivante ne crée pas une copie du tableau, elle crée un alias
    // vers le tableau existant
    // const newArray = tasks;

    // --- on fait une copie du tableau
    // spread operator : on crée un nouveau tableau, et on déverse dedans les éléments
    // du premier tableau
    const newArrayTasks = [...tasks];
    // c'est équivalent à const newArrayTasks = [tasks[0], tasks[1], etc];

    // --- on ajoute la tâche dans le nouveau tableau
    newArrayTasks.push(newTask);

    // --- on appelle setState avec le nouveau tableau modifié
    this.setState({
      tasks: newArrayTasks,
      // on en profite pour vider l'input
      inputTaskLabel: '',
    });

    // on peut faire sans variable intermédiaire pour le tableau copié
    // this.setState({
    //   tasks: [...tasks, newTask],
    //   // on en profite pour vider l'input
    //   inputTaskLabel: '',
    // });
  }

  updateTaskLabel(newValue) {
    this.setState({
      inputTaskLabel: newValue,
    });
  }

  // modifier le statut done d'une tâche
  // eslint-disable-next-line class-methods-use-this
  updateTaskStatus(newValue, idTask) {
    console.log(`on va mettre à jour la tâche qui a l'id ${idTask}, avec comme nouvelle valeur ${newValue}`);

    // TODO faire appel à setState, en faisant attention à l'immutabilité
    // => ne pas modifier directement l'objet
  }

  render() {
    // const { tasks } = this.state;
    // c'est équivalent à :
    // const tasks = this.state.tasks;

    const { tasks, inputTaskLabel } = this.state;

    // filtrer les tâches non terminées (stockées dans un nouveau tableau)
    const tasksNotDone = tasks.filter((element) => element.done === false);

    // récupérer la longueur du tableau
    const nbTasksNotDone = tasksNotDone.length;

    return (
      <div className="app">
        <Form
          manageSubmit={this.addTask}
          value={inputTaskLabel}
          setValue={this.updateTaskLabel}
        />
        <Counter nbTasks={nbTasksNotDone} />
        <Tasks tasksList={tasks} updateTaskDone={this.updateTaskStatus} />
      </div>
    );
  }
}

// == Export
export default App;
