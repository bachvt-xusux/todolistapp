import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!value) {
            setError('vui long nhap ten cong viec');
            return;
        }
        addTodo(value);

        setValue('');
        setError('');
    };
    return (
        <form className="flex justify-center items-center gap-3 my-5"
              onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    className={`border rounded-lg px-4 py-2 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={value}
                    placeholder="What is the task today?"
                    onChange={(e) => {
                        setValue(e.target.value);
                        if (error) setError('');
                    }}
                />
                <button type="submit"
                        className="bg-sky-500 hover:bg-sky-700 cursor-pointer"
                >Add Task
                </button>
                {error && (
                    <p className="text-sm text-red-600 text-center mt-1 rounded-lg">{error}</p>
                )}
            </div>
        </form>
    );
};