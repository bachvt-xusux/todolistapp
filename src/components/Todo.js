import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo, updateStatus }) => {
    const statuses = [
        { key: 'todo', label: 'To Do' },
        { key: 'doing', label: 'Doing' },
        { key: 'qa', label: 'Ready to QA' },
        { key: 'done', label: 'Done' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'doing':
                return;
            case 'qa':
                return;
            case 'done':
                return;
            default:
                return;
        }
    };

    return (
        <div
            className={`flex items-center  ${getStatusColor(
                task.status)}`}
        >
            <p
                onClick={() => toggleComplete(task.id)}
                className={`flex-1 cursor-pointer ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
            >
                {task.task}
            </p>

            <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
                className="border rounded-md text-sm px-2 py-1 cursor-pointer mr-3"
            >
                {statuses.map((s) => (
                    <option key={s.key} value={s.key}>
                        {s.label}
                    </option>
                ))}
            </select>

            <div className="flex gap-3 text-gray-600">
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer"
                    onClick={() => editTodo(task.id)}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className="cursor-pointer"
                    onClick={() => deleteTodo(task.id)}
                />
            </div>
        </div>
    );
};
