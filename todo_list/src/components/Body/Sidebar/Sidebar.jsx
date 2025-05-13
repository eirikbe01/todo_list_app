{ /* Search bar */ }

{ /*Categories (All / Today / Important / Calendar) */ }

{ /*“My Lists” section and “Create” button */ }

import React, { useState } from 'react';
import styles from './Sidebar.module.css';


function Sidebar( { lists, selectedView, onSelectList, onSelectCategory, onCreateList, onSearchTasks }) {



    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className={styles.leftSidebar}>
            <input
                className={styles.searchBar}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        onSearchTasks(searchTerm);
                    }
                }}
            />
            <button 
                className={styles.searchBtn} 
                onClick={() => {
                    onSearchTasks(searchTerm);
                }}
            >
                🔍
            </button>
    
            <div className={styles.categoryBtns}>
                <button 
                    className={styles.categoryBtn}
                    onClick={() => onSelectCategory('all')}
                >
                    🗂️ All
                </button><br/>


                <button 
                    className={styles.categoryBtn}
                    onClick={() => onSelectCategory('today')}
                >
                    💡 Today
                </button><br/>

                <button 
                    className={styles.categoryBtn}
                    onClick={() => onSelectCategory('important')}
                >
                    ❗️ Important
                </button><br/>

                <button 
                    className={styles.categoryBtn}
                    onClick={() => onSelectCategory('calendar')}
                >
                    📆 Calendar
                </button><br/>


                <button 
                    className={styles.categoryBtn}
                    onClick={() => onSelectCategory('completed')}
                >
                    ✅ Completed

                </button>

            </div>
    
            <div className={styles.myListsBtns}>
                <h3 className={styles.myListsTitle}>My Lists</h3>
                <button
                className={styles.createListBtn}
                onClick={onCreateList}
                >
                + Create new list
                </button>
                {lists.map(list => (
                <button
                    key={list.id}
                    className={styles.myListsBtns}
                    onClick={() => onSelectList(list.id)}
                >
                    {list.emoji} {list.name}
                </button>
                ))}
            </div>
        </div>
    );
}



export default Sidebar;
