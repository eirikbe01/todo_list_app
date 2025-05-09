import React, { useState } from 'react';
import styles from './TaskDetails.module.css';
import { DayPicker } from 'react-day-picker';


function TaskDetails( { task, onUpdate, onClose, onDelete }) {

    const [showCalendar, setShowCalendar] = useState(false);


    if(!task) return;

    return (
        <div className={styles.taskDetailsContainer}>
            <header className={styles.header}>
                <h2 className={styles.taskTitle}>{task.name}</h2>
                {/* Close details sidebar */}
                <button 
                    className={styles.closeModalBtn}
                    onClick={onClose}
                >
                    x
                </button>
            </header>


            {/* Due date display */}
            <div className={styles.dueDateContainer}>
                <h3>Due Date: {task.dueDate
                    ? task.dueDate.toLocaleDateString()
                    : "None set"}</h3>

                <button
                    className={styles.taskDetailsBtns}
                    onClick={() => setShowCalendar(true)}
                >
                {task.dueDate === null ? 
                "Set a due date" : "Change due date"}
                </button>
                <button
                    className={styles.taskDetailsBtns}
                    onClick={() => onUpdate({ ...task, dueDate: null})}
                >
                    Clear due date
                </button>
            </div>

            { /* Calendar for due dates*/ }
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


            {/* File attachment button */}
            <button
                className={styles.taskDetailsBtns}
            >
                Attach a file
            </button>

            <p
                className={styles.taskDescription}
            >
                Description
            </p>
            <textarea
                className={styles.descriptionField}
                type="text"
                placeholder="Describe the task..."
            />


            {/* Delete task */}
            <button
                className={styles.deleteTaskBtn}
                onClick={() => onDelete(task.id)}
            >
                Delete Task
            </button>


        </div>
        
    );
}

export default TaskDetails;