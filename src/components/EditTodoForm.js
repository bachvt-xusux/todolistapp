import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task }) => {
    const [value, setValue] = useState(task.task);
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!value) {
            setError('vui long nhap ten cong viec');
            return;
        }

        editTodo(value, task.id);

        setValue('');
        setError('');
    };
    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <div>
                <input type="text"
                       className={`border rounded-lg px-4 py-2 focus:outline-none ${
                           error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
                       }`}
                       value={value}
                       placeholder="Update task"
                       onChange={(e) => {
                           setValue(e.target.value);
                           if (error) setError('');
                       }}
                />
            < /div>
            {error && (
                <p className="text-sm text-red-600 text-center mt-1 rounded-lg">{error}</p>
            )}
            <button type="submit" className="bg-green-500 px-4 py-2 cursor-pointer rounded-lg">
                Update
            </button>
        </form>
    )
        ;
};