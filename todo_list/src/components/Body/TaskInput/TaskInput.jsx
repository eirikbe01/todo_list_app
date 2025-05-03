import React from 'react';
import { useState } from 'react';
import styles from './TaskInput.module.css';



{ /* ➕ button + new-task text field */ }

function TaskInput({ onAddTask }) {

    const [newTask, setNewTask] = useState("");

    // Trimmed version of the new task
    // This is used to check if the task is empty when the user presses enter
    const trimmed = newTask.trim();
    const submit = () => {
        onAddTask(trimmed);
        // Clear the input field after adding the task
        setNewTask("");
    };
    return (
        <div className={styles.inputContainer}>
            <input
                className={styles.inputField}
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && trimmed && submit()}
            />
            <button
                className={styles.addTaskBtn}
                onClick={submit}
                disabled={!trimmed}
            >
                ➕
            </button>
        </div>
    );
}


export default TaskInput;