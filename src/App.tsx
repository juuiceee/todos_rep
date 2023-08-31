import './App.css';
import { TodoList } from './components/todo-list/TodoList';

const App = () => {
  return (
    <div className="App">
      <div className="centered">
        <TodoList />
      </div>
    </div>
  );
}

export default App;