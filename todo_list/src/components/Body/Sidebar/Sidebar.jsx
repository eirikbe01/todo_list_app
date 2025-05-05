{ /* Search bar */ }

{ /*Categories (All / Today / Important / Calendar) */ }

{ /*“My Lists” section and “Create” button */ }

import React from 'react';
import styles from './Sidebar.module.css';


function Sidebar( { lists, selectedView, onSelectList, onSelectCategory, onCreateList }) {

    // used to highlight the selected list / category
    const isListSelected = id => {
        selectedView.type === 'list' && selectedView.id === id;
    }
    const isCategorySelected = key => {
        selectedView.type === 'category' && selectedView.key === key;
    }

    return (
        <div className={styles.leftSidebar}>
            <input
                type="text"
                placeholder="Search tasks..."
                className={styles.searchBar}
            />
            {/*<button className={styles.searchBtn} onClick={() => searchTasks()}>🔍</button>*/}
    
            <div className={styles.categoryBtns}>
                <button 
                    className={styles.categoryBtn}
                    onClick={() => onSelectCategory('all')}
                >
                    🗂️ All
                </button><br/>


                <button className={styles.categoryBtn}>💡 Today</button><br/>

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
