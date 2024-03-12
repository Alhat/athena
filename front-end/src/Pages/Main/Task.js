import React, { useState } from "react";
import './Task.css';

const Task = ({ type, title, dueDate, status, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    // Assign class based on task type
    const taskClass = `task ${type} ${isExpanded ? 'expanded' : ''}`;

    return (
        <div className={taskClass} onClick={handleExpandClick}>
            <h3>{title}</h3>
            {isExpanded && (
                <div className="task-details">
                    {dueDate && <p>Due: {dueDate}</p>}
                    {status && <p>Status: {status}</p>}
                    {description && <p>{description}</p>}
                    {/* Render other task-specific UI elements based on the `type` prop */}
                </div>
            )}
            {/* Conditional rendering for buttons or icons based on the `type` */}
        </div>
    );
};

export default Task;
