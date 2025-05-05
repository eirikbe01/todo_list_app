import React from 'react';
import styles from './TaskDetails.module.css';
import { DayPicker } from 'react-day-picker';


function TaskDetails( { task, onUpdate, onClose, onDelete }) {

    if(!task) return;

    return (
        <div className={styles.taskDetailsContainer}>
            <h2 className={styles.taskTitle}>{task.name}</h2>
            <button className={styles.closeModalBtn}
                onClick={onClose}>x
            </button>


            {/* Due date display */}
            <p className={styles.dueDateContainer}>
                <h3>Due Date:</h3>
                {task.dueDate
                    ? task.dueDate.toLocaleDateString()
                    : "None set"}
            </p>
            <button
                onClick={() => onUpdate({ ...task, dueDate: null})}
            >
                Clear Due Date
            </button>
            

            { /* Calendar */ }
            <DayPicker
                numberOfMonths={1}
                animate={true}
                mode="single"
                selected={task.dueDate}
                onSelect={newDate => onUpdate({ ...task, dueDate: newDate })}
            />
            <button
                onClick={onClose}
            >
                Close
            </button>
            <button
                onClick={() => onDelete(task.id)}
            >
                Delete
            </button>
        </div>
        
    );
}

export default TaskDetails;