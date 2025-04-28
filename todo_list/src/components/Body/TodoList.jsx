import styles from './Body.module.css';
import React from 'react';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

function TodoList() {

    // State to hold the list of tasks
    const [tasks, setTasks] = useState([
        { name: "Task 1", completed: false }]);

    // State to hold the list of user-created lists
    const [myLists, setMyLists] = useState([]);

    // States for creating new lists
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newListEmoji, setNewListEmoji] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [newListName, setNewListName] = useState("");


    function handleCreateNewList() {
        setIsModalOpen(true);
        if (newListName) {
            setMyLists(prevList => [...prevList, { name: newListName, emoji: newListEmoji }]);
            setNewListEmoji("");
            setNewListName("");
            setIsModalOpen(false);
        }
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
                    <h3>My Lists</h3>
                    <button onClick={handleCreateNewList}>+ Create new list</button><br/>
                    {myLists.map((list, index) => (
                        <button key={index}>
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

                <div className={styles.inputWrapper}>
                    <button className={styles.addTaskBtn}>➕</button>
                    <input type="text" placeholder="Add a new task..." className={styles.addTask}></input>
                    
                </div>
                <div className={styles.taskList}>
                    <div className={styles.taskItem}>
                        <input type="checkbox"></input>
                        <span>Task 1</span>
                        <button className={styles.editBtn}>📝 Edit</button>
                        <button className={styles.deleteBtn}>🗑️ Delete</button>
                    </div>
                    <div className={styles.taskItem}>
                        <input type="checkbox"></input>
                        <span>Task 2</span>
                        <button className={styles.editBtn}>📝</button>
                        <button className={styles.deleteBtn}>🗑️</button>
                        <button className={styles.importantBtn}>❗️</button>
                    </div>
                </div>
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