import React, { useState } from 'react';
import styles from './CreateListModal.module.css';
import EmojiPicker from 'emoji-picker-react';


function CreateListModal({ onCreate, onCancel }) {
    const [name, setName] = useState("");
    const [emoji, setEmoji] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
                    className={styles.modalInput}/><br/>
                
                <div className={styles.modalBtns}>
                    <button onClick={() => onCreate({ name, emoji})}>Create</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}


export default CreateListModal;