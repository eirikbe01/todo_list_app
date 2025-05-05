import styles from './TodoList.module.css';
import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar.jsx';
import CreateListModal from './CreateListModal/CreateListModal.jsx';
import TaskArea from './TaskArea/TaskArea.jsx';
import TaskDetails from './TaskDetails/TaskDetails.jsx';
import { v4 as uuidv4 } from 'uuid';


function NewTodoList() {

    {/* STATES */}
    // State to hold the list of tasks
    const [tasks, setTasks] = useState([
        { id: 1, 
        name: "Task 1", 
        completed: false, 
        important: false, 
        dueDate: null}]
    );

        
    // State to hold the list of user-created lists
    const [myLists, setMyLists] = useState([]);

    // State for selecting lists to add tasks to
    //const [selectedList, setSelectedList] = useState(null);

    // State for modal to create new lists
    const [isModalOpen, setIsModalOpen] = useState(false);


    // State for selecting view (list or category)
    const [selectedView, setSelectedView] = useState({
        type: "list",
        id: null
    });

    // State for task details
    const [selectedTask, setSelectedTask] = useState(null);

    // State for task details modal
    const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);



    {/* FUNCTIONS */}
    {/* Function to create new lists */}
    function handleCreateNewList( { name, emoji }) {
        // Create a new list object
        const newList = {
            id: uuidv4(),
            name: name,
            emoji: emoji,
            tasks: []
        };
        // Add the new list to the array of user-created lists
        setMyLists(prev => [...prev, newList]);

        // Set the selected view to the new list
        setSelectedView({type: "list", listId: newList.id});

        // Close the modal
        setIsModalOpen(false);
    }

    {/* Function to add new tasks to selected list */}
    function handleAddTask(taskName) {
        if (taskName.trim === "" || selectedView.type !== "list") return;

        // Create a new task object
        const newTaskObj = {
            id: uuidv4(),
            name: taskName,
            completed: false,
            important: false
        };  

        // Find the selected list
        const selectedList = myLists.find(list => list.id === selectedView.listId);
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
    }


    {/* Function to toggle flags (important, completed) */}
    function toggleTask(taskId, field) {
        // If the selected view is not a list, return nothing
        if (selectedView.type !== "list") return;

        // Get the selected list
        const selectedList = myLists.find(list => list.id === selectedView.listId);

        // Update the task objects and the selected list in view
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
    }

    {/* Function to update tasks*/}
    function handleUpdateTask(updatedTask) {
        if (!selectedTask) return;
        // Get the selected list
        const selectedList = myLists.find(list => list.id === selectedView.listId);
        // Update the task objects and the selected list in view
        const updatedTasks = selectedList.tasks.map(task =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        );
        const updatedList = { ...selectedList, tasks: updatedTasks };
        // Update the user-created lists field
        setMyLists(prevLists =>
            prevLists.map(list =>
                list.id === updatedList.id ? updatedList : list
            )
        );
    }

    {/* Function to delete tasks */}
    function handleDeleteTask(taskId) {
        return;
    }

    return(
        /* Main div holding the left side-bar, main body, and right side-bar */
        <div className={styles.container}>
            {/* Left side-bar */}
            <Sidebar
                lists={myLists}
                selectedView={selectedView}
                onSelectList={listId => 
                    setSelectedView({ type: "list", listId })
                }
                onSelectCategory={key =>
                    setSelectedView({ type: "category", key })
                }
                onCreateList={() => setIsModalOpen(true)}
            />

            {/* Main body */}
            <TaskArea
                lists={myLists}
                selectedView={selectedView}
                onAddTask={handleAddTask}
                onToggleComplete={id => toggleTask(id, "completed")}
                onToggleImportant={id => toggleTask(id, "important")}
                onOpenDetails={task => {
                    setSelectedTask(task);
                    setIsTaskDetailsOpen(true);
                }}

            />
            {isModalOpen && (
                <CreateListModal
                    onCreate={handleCreateNewList}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}

            {/* Right sidebar */}
            {/* This is where the task details will be shown if it is open */}
            {isTaskDetailsOpen && (
                <TaskDetails
                    task={selectedTask}
                    onUpdate={handleUpdateTask}
                    onClose={() => setIsTaskDetailsOpen(false)}
                    onDelete={handleDeleteTask}
                />
            )}

            


        </div>
    );
}

export default NewTodoList;