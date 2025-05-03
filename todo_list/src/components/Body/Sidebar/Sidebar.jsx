{ /* Search bar */ }

{ /*Categories (All / Today / Important / Calendar) */ }

{ /*“My Lists” section and “Create” button */ }

import React from 'react';
import styles from './Sidebar.module.css';


function Sidebar( { lists, onSelectList, onCreateList, selectedId}) {
    return (
        <div className={styles.leftSidebar}>
            <input
                type="text"
                placeholder="Search tasks..."
                className={styles.searchBar}
            />
    
            <div className={styles.categoryBtns}>
                <button className={styles.categoryBtn}>🗂️ All</button><br/>
                <button className={styles.categoryBtn}>💡 Today</button><br/>
                <button className={styles.categoryBtn}>❗️ Important</button><br/>
                <button className={styles.categoryBtn}>📆 Calendar</button>
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
                    onClick={() => onSelectList(list)}
                >
                    {list.emoji} {list.name}
                </button>
                ))}
            </div>
        </div>
    );
}



export default Sidebar;

