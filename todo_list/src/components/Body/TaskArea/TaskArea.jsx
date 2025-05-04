import React from 'react';
import styles from './TaskArea.module.css';
import TaskInput from '../TaskInput/TaskInput.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import CalendarView from '../CalendarView/CalendarView.jsx';


{ /* Displays the main body (or middle part) of the page */ }
{ /* Aka displays: The List title, the add task field, and the different tasks in the list */ }
function TaskArea( { lists, selectedView, onAddTask, onToggleComplete, onToggleImportant } ) {

    // Get the selected list (if any)
    const selectedList = 
        selectedView.type === "list" ? 
        lists.find(list => list.id === selectedView.listId)
        : null;


    // Derive the tasks and title
    let tasks = [];
    let title = "";
    if (selectedList) {
        // List view
        tasks = selectedList.tasks;
        title = `${selectedList.emoji} ${selectedList.name}`;
    } else {
        // Category view
        const allTasks = lists.flatMap(list => list.tasks);

        // Flatten the tasks array
        switch (selectedView.key) {
            case "all":
                tasks = allTasks;
                title = "🗂️ All Tasks";
                break;
            case "today":
                //tasks = allTasks.filter(task => task.dueDate === ?);
                title = "💡 Today's Tasks";
                break;
            case "important":
                tasks = allTasks.filter(task => task.important);
                title = "❗️ Important Tasks";
                break;
            case "calendar":
                title = "📆 Calendar View";
                break;
            case "completed":
                tasks = allTasks.filter(task => task.completed);
                title = "✅ Completed Tasks";
                break;
            default:
                tasks;
                title = "";
        }
    }


    // If the calendar view is selected, render it
    if (selectedView.type === "category" && selectedView.key === "calendar") {
        return (
            <div className={styles.taskAreaContainer}>
                <h2 className={styles.listTitle}>{title}</h2>
                <CalendarView lists={lists}/>
            </div>
        );
    }
    
    
    return(
        <div className={styles.taskAreaContainer}>
            <h2 className={styles.listTitle}>
                {selectedList || selectedView.type === "category" ? title : "Select a list to view tasks"}
            </h2>
            {/* Only allows adding when viewing a single list */}
            {selectedList && (
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