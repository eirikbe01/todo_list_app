import React from 'react';
import styles from './TaskArea.module.css';
import TaskInput from '../TaskInput/TaskInput.jsx';
import TaskList from '../TaskList/TaskList.jsx';


{ /* Displays the main body (or middle part) of the page */ }
{ /* Aka displays: The List title, the add task field, and the different tasks in the list */ }
function TaskArea( { lists, selectedView, onAddTask, onToggleComplete, onToggleImportant } ) {


    // Derive the tasks and title from the list selected by selectedView
    let tasks = [];
    let title = ""; 

    if (selectedView.type === "list") {
        const list = lists.find(list => list.id === selectedView.listId);
        tasks = list ? list.tasks : [];
        title = list ? `${list.emoji} ${list.name}` : "Select a list to view tasks";
    } else {
        // Flatten the tasks array
        const allTasks = lists.flatMap(list => list.tasks);
        switch (selectedView.key) {
            case "all":
                tasks = allTasks;
                title = "🗂️ All Tasks";
                break;
            case "today":
                //tasks = allTasks.filter(task => task.dueDate === ?);
                title = "💡 Today's Tasks";
            case "important":
                tasks = allTasks.filter(task => task.important);
                title = "❗️ Important Tasks";
                break;
            case "completed":
                tasks = allTasks.filter(task => task.completed);
                title = "✅ Completed Tasks";
                break;
            default:
                tasks = [];
                title = "";
        }
    }
    
    
    return(
        <div className={styles.taskAreaContainer}>
            <h2 className={styles.listTitle}>{title}</h2>
            {/* Only allows adding when viewing a single list */}
            {selectedView.type === "list" && (
                <TaskInput
                    onAddTask={onAddTask}
                />
            )}

            <TaskList
                tasks={tasks}
                onToggleComplete={onToggleComplete}
                onToggleImportant={onToggleImportant}
            />
        </div>
    );
}


export default TaskArea;