import styles from './Body.module.css';

function TodoList() {
    
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
                    <button>+ Create new list</button><br/>
                    <button>📋Work</button><br/>
                    <button>🏠Home</button><br/>
                    <button>🎓School</button><br/>
                    <button>🛒Shopping</button>
                </div>
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
                        <button className={styles.editBtn}>📝</button>
                        <button className={styles.deleteBtn}>🗑️</button>
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