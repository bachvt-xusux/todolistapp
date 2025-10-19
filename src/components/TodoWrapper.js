import React, { useState } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
        console.log(todos);
    };

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {
                ...todo, completed: !todo.completed
            } : todo
        ));
    };

    const deleteTodo = id => {
        const isConfirmed = window.confirm('Bạn có muốn xóa không?');
        if (isConfirmed) {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {
                ...todo, isEditing: !todo.isEditing
            } : todo
        ));
    };

    const editTask = (task, id) => {
        if (!task) {
            alert('vui long nhap ten cong viec truoc khi doi!');
            return;
        }
        setTodos(todos.map(todo => todo.id === id ? {
                    ...todo, task, isEditing: !todo.isEditing
                }
                : todo
        ));
    };
    return (
        <div className="flex flex-col items-center
        from-indigo-50 to-blue-100 py-12 px-4">
            <div className="w-full max-w-md bg-violet-400 rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Get Things Done
                </h1>
                <TodoForm addTodo={addTodo} />
                {todos.map((todo, index) => (
                    todo.isEditing ? (
                        <EditTodoForm editTodo={editTask} task={todo} />
                    ) : (
                        <Todo task={todo} key={index}
                              toggleComplete={toggleComplete}
                              deleteTodo={deleteTodo}
                              editTodo={editTodo} />
                    )
                ))}
            </div>

        </div>
    )
        ;
};