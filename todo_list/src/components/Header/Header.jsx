import styles from './Header.module.css';
import profileIcon from '../../assets/profile_icon.jpg';
import sunIcon from '../../assets/sun_icon.jpg';
import moonIcon from '../../assets/moon_icon.png';
import bellIcon from '../../assets/bell_icon.png';
import checkIcon from '../../assets/check_icon.avif';

// The header of the todo list application
function Header() {


    return(
    <>
        {/* Header component */}
        <header className={styles.header}>
            {/* Left side of the header */}
            {/* Contains profile icon and notifications */}
            <div className={styles.header__left}>
                <div className={styles.header__item}>
                    <img className={styles.header__icon} src={profileIcon} alt="Profile icon" />
                    
                    <span className={styles.header__label}>Username</span>
                </div>
                <div className={styles.header__item}>
                    <img className={styles.header__icon} src={bellIcon} alt="Bell icon" />
                    <span className={styles.header__label}>Notifications</span>
                </div>
            </div>
            
            {/* Center of the header */}
            {/* Contains the main logo and title */}
            <div className={styles.header__center}>
                <img className={styles.header__main__logo} src={checkIcon} alt="Checkmark icon" />
                <h1>To-do list</h1>
            </div>

            {/* Right side of the header */}
            {/* Contains the theme toggle icons */}
            <div className={styles.header__right}>
                <div className={styles.header__label}>
                    <img className={styles.header__icon} src={sunIcon} alt="Sun icon" />
                    <span></span>
                    <img className={styles.header__icon} src={moonIcon} alt="Moon icon" />
                </div>
            </div>
        </header>
    </>
    );
}

export default Header;
