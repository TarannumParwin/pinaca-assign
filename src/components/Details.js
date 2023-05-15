

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';


function Details() {
  const [todos, setTodos] = useState([]);

  function addTodo(title) {
    setTodos([...todos, { id: todos.length + 1, title, completed: false }]);
  }

  function toggleCompleted(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    }));
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function editTodo(id, newTitle) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      } else {
        return todo;
      }
    }));
  }
  const [logindata, setLoginData] = useState([]);


  const history = useNavigate();
  const userlogout = ()=>{
            localStorage.removeItem("user_login")
            history("/");
        }
    

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh',color:'blue',fontFamily:'Manrope' }}>
      <h1>Todo List</h1>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        addTodo(title);
        event.target.reset();
      }}>
        <input type="text" name="title" placeholder="Add a new todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
            <button onClick={() => {
              const newTitle = prompt('Enter new title:', todo.title);
              if (newTitle !== null) {
                editTodo(todo.id, newTitle);
              }
            }}>Edit</button>
          </li>
        ))}
      </ul>
      <Button onClick={userlogout}>LogOut</Button>
    </div>
  );
}

export default Details;





















