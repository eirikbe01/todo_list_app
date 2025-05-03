import React from 'react';
import styles from './TaskArea.module.css';
import TaskInput from '../TaskInput/TaskInput.jsx';
import TaskList from '../TaskList/TaskList.jsx';


{ /* Displays the main body (or middle part) of the page */ }
{ /* Aka displays: The List title, the add task field, and the different tasks in the list */ }
function TaskArea( { list, onAddTask, onToggleComplete, onToggleImportant } ) {

    {if (!list) return <div className={styles.emptyList}>Select a list to view tasks</div>}
    
    return(
        <div className={styles.taskAreaContainer}>
            <h2 className={styles.listTitle}>{list.emoji} {list.name}</h2>
            <TaskInput
                onAddTask={onAddTask}
            />
            <TaskList
                tasks={list.tasks}
                onToggleComplete={onToggleComplete}
                onToggleImportant={onToggleImportant}
            />
        </div>
    );
}


export default TaskArea;