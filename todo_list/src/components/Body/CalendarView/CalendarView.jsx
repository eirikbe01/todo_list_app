import { DayPicker } from 'react-day-picker';
import styles from './CalendarView.module.css';
import { useState } from 'react';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';


{ /* Displays the calendar view */ }
{ /* Allows the user to select a date */ }
{ /* The selected date is displayed in the footer */ }
{ /* The calendar is animated */ }
function CalendarView() {
    // State to hold the selected day
    const [selectedDay, setSelectedDay] = useState(null);

    return (
        <div className={styles.calendarContainer}>
            {/*<h2 className={styles.calendarTitle}>📅 Calendar</h2>*/}
            <DayPicker
                numberOfMonths={1}
                animate={true}
                mode="single"
                selected={selectedDay}
                onSelect={setSelectedDay}
                footer={selectedDay ? `Selected: ${format(selectedDay, 'PP')}` : "Pick a day" }
            />
        </div>
    );
}

export default CalendarView;