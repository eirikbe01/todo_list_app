import React from 'react';
import { useState } from 'react';
import styles from './TaskInput.module.css';



{ /* ➕ button + new-task text field */ }

function TaskInput({ onAddTask }) {

    const [newTask, setNewTask] = useState("");
    const submit = () => {
        onAddTask(newTask);
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
                onKeyDown={e => e.key === 'Enter' && submit()}
            />
            <button
                className={styles.addTaskBtn}
                onClick={submit}
            >
                ➕
            </button>
        </div>
    );
}


export default TaskInput;