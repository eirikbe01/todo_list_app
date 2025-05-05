import React from 'react';
import styles from './TaskList.module.css';
import TaskItem from '../TaskItem/TaskItem.jsx';





{ /* Displays the task objects in the selected list */ }
function TaskList( { tasks, onToggleComplete, onToggleImportant, onOpenDetails } ) {
    return (
        <div className={styles.taskListContainer}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onToggleImportant={onToggleImportant}
                    onOpenDetails={() => onOpenDetails(task)}
                />
            ))}
        </div>
    );
}


export default TaskList;