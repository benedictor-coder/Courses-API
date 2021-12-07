import React, { useState, useCallback,useEffect } from 'react';
import {useHistory } from "react-router-dom";
import './SignIn.css';

function SignIn() {
    const history = useHistory()
    const [ username, setUsername ] = useState(() => emptyString());
    const [ password, setPassword ] = useState(() => emptyString());
    const [ role, setRole ] = useState(() => emptyString());

    const [disabled, setDisabled] = useState(false);
    // let popup = document.querySelector('.popup');

    // login state
    const [ isLoggedIn, setIsLoggedIn ] = useState(() => {
        return false;
    });

    function emptyString () {
        return "";
    }

    const handleLogin = useCallback( e => {
        e.preventDefault();

        if (!username || !password || !role) {
            alert("Provide username, password and your role.");
            return isLoggedIn
        }

        if (username.length < 3 && !isLoggedIn) {
            alert("Username is too short.");
            return isLoggedIn;
        }
        if (password.length < 6 && !isLoggedIn) {
            alert("Password is too short.")
            return isLoggedIn;
        }

        if (!role) {
            alert("Select your role.")
            return isLoggedIn;
        }
        // if(!isLoggedIn) {
        //   const redirect_to_home = () => {
        //     window.location.href="http://localhost:3000/home";
        //     setIsLoggedIn(true)
        //     return !isLoggedIn && setIsLoggedIn ? removePopupOnLoggin() : null;
        //   }
        //   redirect_to_home()
        // }
        //     const removePopupOnLoggin = () => {
        //     popup.style.opacity = 0;
        //     popup.style.visibility = 'hidden';
        //     popup.remove();
        //      }
        const userData = {
            "username": username,
            "password": password,
            "role": role
        };
        const userLogin = async () => {
            await fetch('/water-management-users/api/v1/login', {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
                } || new Headers()
            })
                .then((res) => {
                if(!isLoggedIn && res.ok) {
                    setTimeout(() => {
                        alert("Login successful.\nWelcome.")
                        setIsLoggedIn(true)
                        history.push('/home')
                    }, 500)
                } else if(!res.ok) {
                    setTimeout(() => {
                        alert("Invalid Login Details!!!\nCheck details and try again")
                        history.push('/signin')
                        setIsLoggedIn(false)
                    }, 1000)
                }
            })
                .catch(err => {
                    console.log("ERROR RETRIEVING DATA FROM THE SERVER.\n", err)
            })
        }

        if (!disabled) {
            userLogin();
            return setIsLoggedIn(true)
        } else {
            setDisabled(true)
        }

        return () => setIsLoggedIn(true)

    }, [username, password, role, disabled, history, isLoggedIn])

    return (
        <div className="join-container">
            <div className="join-chat-container">
                <h1 className="chat-heading">Sign In</h1>
                <form htmlFor="signup-form" method="POST" name="login_form" id="login_form" className="signup-form" onSubmit={e => { return handleLogin (e)}}>
                    <div className="form--group">
                        <input type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            id="username"
                            name="username"
                            className="join-input"
                            inputMode="text"
                            placeholder="Username"
                            required
                        />
                        <label htmlFor="name-input" className="form-label">Username </label>
                    </div>
                    <div className="form--group">
                        <input type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            id="password"
                            name="password"
                            className="join-input mt-20"
                            inputMode="none"
                            placeholder="Password"
                            required />
                        <label htmlFor="room-label" className="form-label"> Password </label>
                    </div>
                    <div className="form--group">
                        <select
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                            id="role"
                            name="role"
                            className="join-input mt-20"
                            inputMode="none"
                            required>
                            <option value="--select role--" defaultValue>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="other">Other</option>
                        </select>
                        <label htmlFor="role-label" className="form-label"> Role </label>
                    </div>
                    <div className="form--group join__footer--btn">
                        <button type="submit" className="btn btn--signin mt-20"> Sign in</button>
                    </div>
                    <div className="form--group">
                        <input type="checkbox" style={{marginRight:".5rem"}}/>
                        <label htmlFor="remember-me">Remember me.</label>
                    </div>
                </form>
                {/* <Link to="" className="sign-up heading-secondary">
                    Forgot Details?
                </Link> */}
            </div>
        </div>
    );
}

export default React.memo(SignIn);
