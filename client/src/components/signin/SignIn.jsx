import React, { useState } from 'react';
import './SignIn.css';

function SignIn () {
    const [ username, setUsername ] = useState(() => emptyString());
    const [ password, setPassword ] = useState(() => emptyString());

    let popup = document.querySelector('.popup');

    // login state
    const [ isLoggedIn, setIsLoggedIn ] = useState(() => {
        return false;
    });

    function emptyString () {
        return "";
    }

    function handleLogin (e) {
        e.preventDefault();

        if (!username || !password) {
            alert("Provide username and password");
            return isLoggedIn
        }

        if (username.length < 3 && !isLoggedIn) {
            alert("Username is too short");
            return isLoggedIn;
        }
        if (password.length < 6 && !isLoggedIn) {
            alert("Password is too short")
            return isLoggedIn;
        } 

        if (setIsLoggedIn) {
            return !isLoggedIn && setIsLoggedIn ? removePopupOnLoggin() : null;
        }
    }
    
    const removePopupOnLoggin = () => {
        popup.style.opacity = 0;
        popup.style.visibility = 'hidden';
        popup.remove();
    }

    return (
        <div className="join-container">
            <div className="join-chat-container">
                <h1 className="chat-heading">Sign In</h1>
                <form htmlFor="signup-form" action="" className="signup-form">
                    <div className="form--group">
                        <input type="text" onChange={ (event) => setUsername(event.target.value) } className="join-input" placeholder="Username" required />
                        <label htmlFor="name-input" className="form-label">Username </label>
                    </div>
                    <div className="form--group">
                        <input type="password" onChange={ (event) => setPassword(event.target.value) } className="join-input mt-20" placeholder="Password" required />
                        <label htmlFor="room-label" className="form-label"> Password </label>
                    </div>
                    <div className="form--group join__footer--btn">
                        <button type="submit" onClick={ e => handleLogin(e) } className="btn btn--signin mt-20"> Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default React.memo(SignIn);