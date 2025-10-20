import React, { useEffect, useState } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = todo => {
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false, status: 'todo' }]);
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

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTodos(items);
    };

    const updateStatus = (id, status) => {
        setTodos(
            todos.map((t) => (t.id === id ? { ...t, status } : t))
        );
    };
    return (
        <div className="flex flex-col items-center from-indigo-50 to-blue-100 py-12 px-4">
            <div className="w-full max-w-md bg-violet-400 rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Get Things Done
                </h1>
                <TodoForm addTodo={addTodo} />

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="todos">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {todos.map((todo, index) => (
                                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {todo.isEditing ? (
                                                    <EditTodoForm editTodo={editTask} task={todo} />
                                                ) : (
                                                    <Todo
                                                        task={todo}
                                                        toggleComplete={toggleComplete}
                                                        deleteTodo={deleteTodo}
                                                        editTodo={editTodo}
                                                        updateStatus={updateStatus}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};