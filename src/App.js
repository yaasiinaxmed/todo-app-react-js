import React, { useState } from "react";
import "./style.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        {id: crypto.randomUUID(), title: newItem, completed: false},
      ]
    })

    setNewItem("");
   
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
       return currentTodos.map(todo => {
         if (todo.id === id) {
           todo.completed = completed;
           return {...todo, completed}
         }

         return todo;
       })
    })
  }

  function deleteItem(id) {
    const newArray = todos.filter(todo => todo.id !== id);
    setTodos(newArray);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className="btn">Add</button>
        <h1 className="header">Todo List</h1>
        <ul>
          {todos.map(todo => {
            return (
              <li key={todo.id}>
                <label>
                  <input type="checkbox" checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                   {todo.title}
                </label>
                <button className="btn-danger" onClick={() => deleteItem(todo.id)}>Delete</button>
              </li>
            )
          })}
        </ul>
      </form>
    </>
  );
}

export default App;
