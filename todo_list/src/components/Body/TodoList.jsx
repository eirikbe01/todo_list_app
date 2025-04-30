import styles from './Body.module.css';
import React from 'react';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

function TodoList() {

    {/* STATES */}
    // State to add new tasks
    const [newTask, setNewTask] = useState("");


    // State to hold the list of tasks
    const [tasks, setTasks] = useState([
        { id: 1, name: "Task 1", completed: false, important: false, dueDate: null}]);



    // States for creating new lists
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newListEmoji, setNewListEmoji] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [newListName, setNewListName] = useState("");
    // State for selecting lists to add tasks to
    const [selectedList, setSelectedList] = useState(null);


    // State for the categories in the left side-bar
    const [allTasks, setAllTasks] = useState([]);
    const [todayTasks, setTodayTasks] = useState([])
    const [importantTasks, setImportantTasks] = useState([]);
    const [calendarTasks, setCalendarTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    // State to hold the list of user-created lists
    const [myLists, setMyLists] = useState([]);


    {/* FUNCTIONS */}
    {/* Function to create new lists */}
    function handleCreateNewList() {
        setIsModalOpen(true);
        if (newListName) {
            setMyLists(prevList => [...prevList, 
                                    { name: newListName, 
                                    emoji: newListEmoji, 
                                    tasks: []}]);
            setNewListEmoji("");
            setNewListName("");
            setIsModalOpen(false);
        }
    }

    {/* Function to add new tasks to selected list */}
    function handleAddTask() {
        if (newTask.trim === "" || !selectedList) return;

        // Update the selected list with the new task
        const newTaskObj = {
            id: Date.now(),
            name: newTask,
            completed: false,
            important: false
        };  

        // Update the selected list with the new task
        const updatedList = {
            ...selectedList, tasks: [...selectedList.tasks, newTaskObj]
        }
        setSelectedList(updatedList);

        // Update My lists in the left side-bar
        setMyLists(prevLists => 
            prevLists.map(list =>
                list === selectedList ? updatedList : list
            )
        );

        // Clear the input field
        setNewTask("");
    }

    function handleDeleteTask(task) {
        return <></>
    }

    function handleEditTaks(task) {
        return <></>
    }

    {/* Function to toggle the completed state of a task */}
    function handleToggleCompleted(taskId) {
        // Create a new copy of the task from the selected list
        // change the "completed" property of the task to true

        const updatedTasks = selectedList.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        // and update the selected list
        const updatedList = { ...selectedList, tasks: updatedTasks };
        setSelectedList(updatedList);
        setMyLists(prevLists =>
            prevLists.map(list =>
                list === selectedList ? updatedList : list
            )
        );
        return <></>
    }
    
    {/* Function to toggle the important state of a task */}
    function handleToggleImportant(taskId) {
        // Create a new copy of the task from the selected list
        // change the "important" property of the task to true
        const updatedTasks = selectedList.tasks.map(task =>
            task.id === taskId ? {...task, important: !task.important } : task
        );

        // and update the selected list
        const updatedList = {...selectedList, tasks: updatedTasks };
        setSelectedList(updatedList);
        setMyLists(prevLists =>
            prevLists.map(list =>
                list === selectedList ? updatedList : list
            )
        );
    }

    function handleAddToCalendar(task) {
        return <></>
    }

    
    return(
        /* Main div holding the left side-bar, main body, and right side-bar */
        <div className={styles.container}>
            {/* Left side-bar */}
            <div className={styles.leftSidebar}>
                <input type="text" placeholder="Search for a task..." className={styles.searchBar}></input>
                <button className={styles.searchBtn}>🔍</button>

                {/*Category section in left side-bar*/}
                <div className={styles.categoryBtns}>
                    <button>🗂️All</button><br/>
                    <button>💡Today</button><br/>
                    <button>❗️Important</button><br/>
                    <button>📆Calendar</button>
                </div>

                {/* User-created list section in left side-bar */}
                <div className={styles.myListsBtns}>
                    <h5>---------------------------------------------</h5>
                    <h3>My Lists</h3>
                    <button onClick={handleCreateNewList}>+ Create new list</button><br/>
                    {myLists.map((list, index) => (
                        <button 
                            key={index}
                            className={styles.listBtn}
                            onClick={() => setSelectedList(list)}
                        >
                            {list.emoji} {list.name}
                        </button>
                        
                    ))}
                </div>


                {/* Modal for creating new lists */}
                {isModalOpen && (
                    <div className = {styles.modalOverlay}>
                        <div className = {styles.modalContent}>
                            <h2>Create a new list</h2>
                            <input 
                                type="text" 
                                placeholder="Add Emoji..." 
                                value={newListEmoji}
                                onFocus={() => setShowEmojiPicker(true)} 
                                onChange={(e) => setNewListEmoji(e.target.value)} 
                                className={styles.modalInput}/>
                                {showEmojiPicker && (
                                    <div className={styles.emojiPickerWrapper}>
                                        <EmojiPicker
                                            onEmojiClick={(emojiData) => {
                                                setNewListEmoji(emojiData.emoji);
                                                setShowEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                            <input 
                                type="text" 
                                placeholder="Name of list..." 
                                value={newListName} 
                                onChange={(e) => setNewListName(e.target.value)} 
                                className={styles.modalInput}/><br/>
                            
                            <div className={styles.modalBtns}>
                                <button onClick={handleCreateNewList}>Create</button>
                                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Main body */}
            <div className={styles.mainBody}>

                {/*Show the name of the selected list*/}
                {/* A ternary operator. If list is selected display the tasks. Else a prompt to select one.*/}
                {selectedList ? (
                    <>
                        <h2>{selectedList.emoji} {selectedList.name}</h2>

                        {/* Input for adding tasks */}
                        <div className={styles.inputWrapper}>
                            <button className={styles.addTaskBtn} onClick={handleAddTask}>➕</button>
                            <input
                                type="text"
                                placeholder="Add a new task..."
                                className={styles.addTask}
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </div>


                        {/* List of tasks */}
                        <div className={styles.taskList}>
                            {selectedList.tasks.map((task, index) => (
                                <div key={task.id} className={styles.taskItem}>
                                    {/* Checkbox for complete task */}
                                    <input 
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleCompleted(task.id)}
                                        className={styles.checkComplete}
                                    />

                                    {/* Task name */}
                                    <span className={`${styles.taskName} ${task.completed ? styles.completedTask : ""}`}>
                                        {task.name}
                                    </span>

                                    {/* Important Button */}
                                    <button
                                        className={`${styles.importantBtn} ${task.important ? styles.importantActive : ""}`}
                                        onClick={() => handleToggleImportant(task.id)}
                                        title="Mark as important"
                                    >
                                        ❗️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Please select a list to start adding tasks.</p>
                )}

            </div>
            
            {/* Right side-bar */}
            <div className={styles.rightSidebar}>
                <h3>Task Details</h3>
                <input type="radio"></input><br/>
                <button>🗑️Delete</button><br/>
                <button>📝Edit</button><br/>
                <button>📅Due Date</button><br/>
                <button>🔔Reminder</button><br/>
                <button>🔄Repeat</button>
            </div>
        </div>
    );
}

export default TodoList;