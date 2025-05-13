import React from 'react';
import styles from './TaskArea.module.css';
import TaskInput from '../TaskInput/TaskInput.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import CalendarView from '../CalendarView/CalendarView.jsx';
import { isSameDay } from 'date-fns';


{ /* Displays the main body (or middle part) of the page */ }
{ /* Aka displays: The List title, the add task field, and the different tasks in the list */ }
function TaskArea({ 
    lists, 
    selectedView, 
    onAddTask, 
    onToggleComplete, 
    onToggleImportant, 
    onOpenDetails }) {

    /* If we are in search mode, render search results*/
    if (selectedView.type === 'search') {
        const { results, term } = selectedView;

        return (
        <div className={styles.taskAreaContainer}>
            <h2 className={styles.listTitle}>
                Search results for "{term}"
            </h2>

            {results.length > 0 ? (
            <TaskList
                tasks={results}
                onToggleComplete={onToggleComplete}
                onToggleImportant={onToggleImportant}
                onOpenDetails={onOpenDetails}
            />
            ) : (
            <p className={styles.emptyState}>
                No tasks match "{term}".
            </p>
            )}
        </div>
        );
    }

    // Get the selected list (if any)
    const selectedList = 
        selectedView.type === "list" ? 
        lists.find(list => list.id === selectedView.id)
        : null;


    // Derive the tasks and title
    let tasks = [];
    let title = "";
    let today = new Date();
    const allTasks = lists.flatMap(list => list.tasks);
    if (selectedList) {
        // List view
        tasks = selectedList.tasks;
        title = `${selectedList.emoji} ${selectedList.name}`;
    } else {
        // Category view

        // Flatten the tasks array
        switch (selectedView.key) {
            case "all":
                tasks = allTasks;
                title = "🗂️ All Tasks";
                break;
            case "today":
                tasks = allTasks.filter(task => 
                    task.dueDate && isSameDay(task.dueDate, today));
                title = "💡 Today's Tasks";
                break;
            case "important":
                tasks = allTasks.filter(task => task.important);
                title = "❗️ Important Tasks";
                break;
            case "calendar":
                title = "📆 Calendar View";
                tasks = allTasks;
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
                <CalendarView
                    allTasks={allTasks}
                    onToggleComplete={onToggleComplete}
                    onToggleImportant={onToggleImportant}
                    onOpenDetails={onOpenDetails}
                />
            </div>
        );
    }
    
    
    return(
        <div className={styles.taskAreaContainer}>
            <h2 className={styles.listTitle}>
                {selectedList || 
                selectedView.type === "category" ? 
                title : "Select a list to view tasks"}
            </h2>
            {/* Only render the input field when viewing a list */}
            {selectedList && (
                <TaskInput
                    onAddTask={onAddTask}
                />
            )}

            <TaskList
                tasks={tasks}
                onToggleComplete={onToggleComplete}
                onToggleImportant={onToggleImportant}
                onOpenDetails={onOpenDetails}
            />
        </div>
    );
}


export default TaskArea;