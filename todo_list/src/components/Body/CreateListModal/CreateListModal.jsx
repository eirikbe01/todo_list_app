import React, { useState, useCallback } from 'react';
import styles from './CreateListModal.module.css';
import EmojiPicker from 'emoji-picker-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';


function CreateListModal({ onCreate, onCancel }) {
    const [name, setName] = useState("");
    const [emoji, setEmoji] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);


    // This is used to handle if the name is empty when the user presses enter
    const handleCreateList = useCallback(() => {
        const trimmed = name.trim();
        if(!trimmed) return;
        onCreate({ name: trimmed, emoji, date: selectedDay });
    }, [name, emoji, selectedDay, onCreate]);
    const canCreateList = Boolean(name.trim());

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Create a new list</h2>
                <input 
                    type="text" 
                    placeholder="Add Emoji..." 
                    value={emoji}
                    onFocus={() => setShowEmojiPicker(true)} 
                    onChange={(e) => setEmoji(e.target.value)} 
                    className={styles.modalInput}/>
                    {showEmojiPicker && (
                        <div className={styles.emojiPickerWrapper}>
                            <EmojiPicker
                                onEmojiClick={(emojiData) => {
                                    setEmoji(emojiData.emoji);
                                    setShowEmojiPicker(false);
                                }}
                            />
                        </div>
                    )}
                <input 
                    type="text" 
                    placeholder="Name of list..." 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className={styles.modalInput}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && canCreateList) {
                            handleCreateList();
                        }
                    }}
                /><br/>                
                
                <div className={styles.modalBtns}>
                    <button 
                        onClick={handleCreateList}
                        disabled={!canCreateList}
                    >
                        Create
                    </button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}


export default CreateListModal;