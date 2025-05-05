import React from 'react';
import styles from './TaskDetails.module.css';
import { DayPicker } from 'react-day-picker';


function TaskDetails( { task, onUpdate, onClose, onDelete }) {

    if(!task) return;

    return (
        <div className={styles.taskDetailsContainer}>

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