import styles from './TodoList.module.css';
import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar.jsx';
import CreateListModal from './CreateListModal/CreateListModal.jsx';
import TaskArea from './TaskArea/TaskArea.jsx';
import { v4 as uuidv4 } from 'uuid';

function NewTodoList() {

    {/* STATES */}
    // State to hold the list of tasks
    const [tasks, setTasks] = useState([
        { id: 1, name: "Task 1", completed: false, important: false, dueDate: null}]);




    // State to hold the list of user-created lists
    const [myLists, setMyLists] = useState([]);
    // State for selecting lists to add tasks to
    const [selectedList, setSelectedList] = useState(null);
    // State for modal to create new lists
    const [isModalOpen, setIsModalOpen] = useState(false);


    {/* FUNCTIONS */}
    {/* Function to create new lists */}
    function handleCreateNewList( { name, emoji }) {
        // Create a new list object
        const newList = {
            id: Date.now(),
            name: name,
            emoji: emoji,
            tasks: []
        };
        setMyLists(prev => [...prev, newList]);
        setSelectedList(newList);
        setIsModalOpen(false);
    }

    {/* Function to add new tasks to selected list */}
    function handleAddTask(taskName) {
        if (taskName.trim === "" || !selectedList) return;

        // Create a new task object
        const newTaskObj = {
            id: uuidv4(),
            name: taskName,
            completed: false,
            important: false
        };  

        // Create an updated list with the new task
        const updatedList = {
            ...selectedList, tasks: [...selectedList.tasks, newTaskObj]
        }
        
        // Update the array of lists by id
        setMyLists(prevLists => 
            prevLists.map(list =>
                list.id === selectedList.id ? updatedList : list
            )
        );
        // Update the selected list
        setSelectedList(updatedList);

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

    {/* Function to toggle flags (important, completed) */}
    function toggleTask(taskId, field) {
        if (!selectedList) return;
        const updatedTasks = selectedList.tasks.map(task => 
            task.id === taskId ? { ...task, [field]: !task[field] } : task
        );
        const updatedList = { ...selectedList, tasks: updatedTasks };

        // Update the user-created lists field
        setMyLists(prevLists =>
            prevLists.map(list =>
                list.id === updatedList.id ? updatedList : list
            )
        );
        // Update the selected list
        setSelectedList(updatedList);
    }

    return(
        /* Main div holding the left side-bar, main body, and right side-bar */
        <div className={styles.container}>
            {/* Left side-bar */}
            <Sidebar
                lists={myLists}
                onSelectList={setSelectedList}
                onCreateList={() => setIsModalOpen(true)}
                selectedId={selectedList ? selectedList.id : null}
            />

            {/* Main body */}
            <TaskArea
                list={selectedList}
                onAddTask={handleAddTask}
                onToggleComplete={id => toggleTask(id, "completed")}
                onToggleImportant={id => toggleTask(id, "important")}

            />
            {isModalOpen && (
                <CreateListModal
                    onCreate={handleCreateNewList}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default NewTodoList;