import React, { useState } from 'react';
import styles from './TaskDetails.module.css';
import { DayPicker } from 'react-day-picker';


function TaskDetails( { task, onUpdate, onClose, onDelete }) {

    const [showCalendar, setShowCalendar] = useState(false);


    if(!task) return;

    return (
        <div className={styles.taskDetailsContainer}>
            <h2 className={styles.taskTitle}>{task.name}</h2>
            <button className={styles.closeModalBtn}
                onClick={onClose}>x
            </button>


            {/* Due date display */}
            <div className={styles.dueDateContainer}>
                <h3>Due Date: {task.dueDate
                    ? task.dueDate.toLocaleDateString()
                    : "None set"}</h3>
            </div>

            <button
                onClick={() => setShowCalendar(true)}
            >
                {task.dueDate === null ? 
                "Set a due date" : "Change due date"}

            </button>
            <button
                onClick={() => onUpdate({ ...task, dueDate: null})}
            >
                Clear due date
            </button>

            { /* Calendar */ }
            {showCalendar && (
                <DayPicker
                    numberOfMonths={1}
                    animate={true}
                    mode="single"
                    selected={task.dueDate}
                    onSelect={newDate => {
                        onUpdate({ ...task, dueDate: newDate});
                        setShowCalendar(false);
                    }}
                />
            )}

            <button
                onClick={() => onDelete(task.id)}
            >
                Delete Task
            </button>
        </div>
        
    );
}

export default TaskDetails;