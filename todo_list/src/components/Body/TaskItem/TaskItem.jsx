import React from 'react';
import styles from './TaskItem.module.css';

function TaskItem ( { task, onToggleComplete, onToggleImportant, onOpenDetails } ) {
    return (
        <div className={styles.taskItemContainer}>
            <input
                type="checkbox"
                className={styles.completeTask}
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
            />
            <span className={`${task.completed ? styles.completed : ""}`}>
                {task.name}
            </span>

            <button
                onClick={() => onToggleImportant(task.id)}
                className={`${task.important ? styles.importantActive : ""}`}
                title="Mark as important"
            >
                ❗️
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails(task);
                }}
            >
                Details
            </button>


        </div>
    );
}

export default TaskItem;