import React, {useEffect} from 'react';
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

// Само приложение 

// const AddTodo = React.lazy(() => import('./Todo/AddTodo')) // Ввожу переменную вместо подгрузки функции, снизу то же
                                                               // самое, только с задержкой

const AddTodo = React.lazy(() => new Promise (resolve => {   // Создание искусственной задержки, на практике не рекомендуется
  setTimeout(() => {
    resolve(import('./Todo/AddTodo'))
  }, 1500)
}))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect( () => {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])
  
  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.complited = !todo.complited
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      complited: false
    }]))
  }

  return (
    <Context.Provider value={{ removeTodo }}> 
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />

        <React.Suspense fallback={<p>Loading...</p>}>  {/* Для ленивой загрузки*/}
          <AddTodo onCreate={addTodo}/>
        </React.Suspense>

        {loading && <Loader />}  
        {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo}></TodoList>) : (loading ? null : <p>No todos.</p>)}

        
      </div>
    </Context.Provider>
  )
}

export default App;
