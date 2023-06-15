import React, { useState } from 'react';
import './TodoApp.css'

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newTodo = {
        task: inputValue,
        dueDate: dueDate,
        priority: priority,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setDueDate('');
      setPriority('');
    }
  };

  const handleTodoDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleTodoToggle = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Sorting function based on due date, priority, and completed status
  const sortTodos = (a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    } else if (!a.completed && b.completed) {
      return -1;
    } else {
      if (a.dueDate < b.dueDate) {
        return -1;
      } else if (a.dueDate > b.dueDate) {
        return 1;
      } else {
        if (a.priority === 'high') {
          return -1;
        } else if (a.priority === 'medium') {
          return a.priority === 'high' ? -1 : 1;
        } else if (a.priority === 'low') {
          return 1;
        }
        return 0;
      }
    }
  };

  // Sort the todos array before rendering
  const sortedTodos = todos.sort(sortTodos);

  return (
    <div className='todoapp'>
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={inputValue}
          onChange={handleInputChange}
        />
        <input
          type="date"
          placeholder="Due date"
          value={dueDate}
          onChange={handleDueDateChange}
        />
        <select value={priority} onChange={handlePriorityChange}>
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {sortedTodos.map((todo, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoToggle(index)}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.task}</span>
            </div>
            <div className="task-info">
              <span>Due: {todo.dueDate}</span>
              <span>Priority: {todo.priority}</span>
              <button onClick={() => handleTodoDelete(index)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;