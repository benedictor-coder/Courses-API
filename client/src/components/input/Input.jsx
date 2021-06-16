import React from 'react';
import './Input.css';

function Input ({ message, setMessage, sendMessage }) {
    return (
        <form action="#" className="form-chat">
            <div className="form__group form__group--chat">
                <input
                    className="form__input--chat" id="chat__text" name="chat__text"
                    type="text"
                    placeholder="Type a message..."
                    value={ message }
                    onChange={ (event) => setMessage(event.target.value) }
                    onKeyPress={ event => event.key === "Enter" ? sendMessage(event) : null }
                    required
                />
            </div>
            <div className="form__group--btn">
                <button
                    type="submit"
                    className=" btn btn--send--chat"
                    onClick={ (event) => sendMessage(event) }
                >
                    Send
                </button>
            </div>
        </form>
    );
}

export default Input;