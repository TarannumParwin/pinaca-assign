
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Details() {
  const [todos, setTodos] = useState([]);
  

  function addTodo(title) {
    setTodos([...todos, { id: todos.length + 1, title, completed: false, publishedTime: new Date() }]);
  }

  function toggleCompleted(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function editTodo(id, newTitle) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        } else {
          return todo;
        }
      })
    );
  }

  function FormatTimeDiff(postPublishedTime) {
    if (!postPublishedTime instanceof Date || isNaN(postPublishedTime)) {
      return 'Invalid Date';
    }

    const currentTime = new Date(); // Get the current time
    const timeDiff = currentTime - postPublishedTime; // Calculate the time difference in milliseconds

    // Convert milliseconds to minutes, hours, and days
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minute(s) ago`;
    } else if (hours < 24) {
      return `${hours} hour(s) ago`;
    } else if (days < 7) {
      return `${days} day(s) ago`;
    } else {
      const year = postPublishedTime.getFullYear();
      const month = String(postPublishedTime.getMonth() + 1).padStart(2, '0');
      const date = String(postPublishedTime.getDate()).padStart(2, '0');
      const hours = String(postPublishedTime.getHours()).padStart(2, '0');
      const minutes = String(postPublishedTime.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${date} ${hours}:${minutes}`;
    }
  }

  const [logindata, setLoginData] = useState([]);

  const history = useNavigate();

  const userlogout = () => {
    localStorage.removeItem('user_login');
    history('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'black',
        fontFamily: 'Manrope',
      }}
    >
      <h1>Todo List</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.elements.title.value;
          addTodo(title);
          event.target.reset();
        }}
      >
        <input type="text" name="title" placeholder="Add a new todo" />
        <button style={{marginLeft:'5px',marginRight:"5px",background:'lightGreen',border:"none",borderRadius:'4px'}}type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button  style={{margin:'5px',borderRadius:'5px',background:'violet'}}onClick={() => removeTodo(todo.id)}>Remove</button>
            <button style={{margin:'5px',borderRadius:'5px',background:'Pink'}}
              onClick={() => {
                const newTitle = prompt('Enter new title:', todo.title);
                if (newTitle !== null) {
                  editTodo(todo.id, newTitle);
                }
              }}
            >
              Edit
            </button>
            <span>{FormatTimeDiff(todo.publishedTime)}</span>
          </li>
        ))}
      </ul>
      <Button onClick={userlogout}>LogOut</Button>
    </div>
  );
}

export default Details;



















