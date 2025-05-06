import { DayPicker } from 'react-day-picker';
import styles from './CalendarView.module.css';
import { useState } from 'react';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import TaskList from '../TaskList/TaskList';
import { isSameDay } from 'date-fns';


{ /* Displays the calendar view */ }
{ /* Allows the user to select a date */ }
{ /* The selected date is displayed in the footer */ }
{ /* The calendar is animated */ }
function CalendarView( {allTasks, onToggleComplete, onToggleImportant, onOpenDetails} ) {
    // State to hold the selected day
    const [selectedDay, setSelectedDay] = useState(null);
    const tasksForSelectedDay = allTasks.filter(task =>
        task.dueDate && isSameDay(task.dueDate, selectedDay)
    );

    console.log("selected day", selectedDay, selectedDay instanceof Date);
    allTasks.forEach(task =>
        console.log("due date", task.dueDate, task.dueDate instanceof Date)
    );

    return (
        <div className={styles.calendarContainer}>
            {/*<h2 className={styles.calendarTitle}>📅 Calendar</h2>*/}
            <DayPicker
                numberOfMonths={1}
                animate={true}
                mode="single"
                selected={selectedDay}
                onSelect={date => setSelectedDay(date)}
                modifiers={{ hasTask: allTasks.map(task => task.dueDate) }}
                modifiersStyles={{ hasTask: { fontWeight: 'bold' } }}
            />
            
            {selectedDay && (
                <div>
                    Tasks due on {format(selectedDay, 'PPP')}
                </div>
            )}
            {selectedDay && (
                tasksForSelectedDay.length > 0 ? 
                    <TaskList
                        tasks={tasksForSelectedDay}
                        onToggleComplete={onToggleComplete}
                        onToggleImportant={onToggleImportant}
                        onOpenDetails={onOpenDetails}
                    />
                : <p>No tasks due on this date.</p>
            )}
        </div>
    );
}

export default CalendarView;