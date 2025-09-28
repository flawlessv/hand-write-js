/**
 * 简单的 React Todo List
 * 
 * 功能：
 * - 添加待办事项
 * - 标记完成/未完成
 * - 删除待办事项
 */

import React, { useState } from 'react';

// 待办事项类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const SimpleTodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // 添加新待办事项
  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // 切换完成状态
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 删除待办事项
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 处理回车键
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div>
      <h1>待办事项</h1>
      
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入待办事项..."
        />
        <button onClick={addTodo}>添加</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div>
          总共 {todos.length} 项，已完成 {todos.filter(t => t.completed).length} 项
        </div>
      )}
    </div>
  );
};

export default SimpleTodoList;
