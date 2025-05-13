import React, { useState, useEffect } from 'react';
import styles from './TaskDetails.module.css';
import { DayPicker } from 'react-day-picker';


function TaskDetails( { task, onUpdate, onClose, onDelete, isOpen }) {

    const [showCalendar, setShowCalendar] = useState(false);
    const [description, setDescription] = useState(task.description || "");


    useEffect(() => {
        setDescription(task.description || "");
    }, [task.description]);


    if(!task) return;

    return (

        <div className={`${styles.taskDetailsContainer} ${isOpen ? styles.open : ""}`}>
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

            <p
                className={styles.taskDescription}
            >
                Description
            </p>
            <textarea
                className={styles.descriptionField}
                type="text"
                value={description}
                placeholder="Describe the task..."
                onChange={(e) => setDescription(e.target.value)}
            />

            <div
                className={styles.editTaskBtnsContainer}
            >

                <button
                    className={styles.saveDescBtn}
                    onClick={() => {
                            onUpdate({ ...task, description: description.trim() });
                            onClose();
                        }}
                >
                    Save Description
                </button>

                {/* File attachment button */}
                <button
                    className={styles.attachFileBtn}
                >
                    Attach a file
                </button>



                {/* Delete task */}
                <button
                    className={styles.deleteTaskBtn}
                    onClick={() => onDelete(task.id)}
                >
                    Delete Task
                </button>

            </div>


        </div>
        
    );
}

export default TaskDetails;