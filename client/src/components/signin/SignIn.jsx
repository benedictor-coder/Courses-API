import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, Redirect} from "react-router-dom";
import './SignIn.css';
import Signin from '../signin/SignIn'

function SignIn() {
    const history = useHistory()
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ role, setRole ] = useState("");

    const [user, setUser] = useState({})
    const [disabled, setDisabled] = useState(false);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const [checked, setChecked] = useState("")
    const [rememberPassword, setRememeberPassword] = useState(false)


    const handleLogin = useCallback( (e) => {
        e.preventDefault();
        let loginErrors = document.querySelector('.login-error');
        
        if (!username || !password || !role) {
            // alert("Login failure")
            loginErrors.innerHTML= `<h6>Login Failure! &rarr; Provide <u>Username</u>, <u>Password</u> & <u>Role</u>.</h6>`;
            loginErrors.style.display = "block";
            return isLoggedIn
        }

        if (username.length < 3 && !isLoggedIn) {
        //     alert("Username is too short.");
            loginErrors.innerHTML = `<h6> Username is too short</h6>`;
            loginErrors.style.display = "block";
            return isLoggedIn;
        }

        if (password.length < 6 && !isLoggedIn) {
            // alert("Password is too short.")
            loginErrors.innerHTML = `<h6> Password is too short</h6>`;
            loginErrors.style.display = "block";
            return isLoggedIn;
        }

        if (!role) {
            alert("Select your role.")
            loginErrors.innerHTML = `<h6> Please select your role.</h6>`
            loginErrors.display = "block"
            return isLoggedIn;
        }

        
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
                        if (localStorage.getItem('token')) {
                            alert("Login successful.\n\nWelcome.")
                            setIsLoggedIn(true)
                            setDisabled(false)
                            history.push('/home')
                        }
                        else {
                            alert("No token found for this login.")
                            setIsLoggedIn(false)
                            setDisabled(true)
                            localStorage.clear()
                            history.push('/signin')
                            window.location.reload()
                        }
                    }, 500)
                } else if(!res.ok) {
                    setTimeout(() => {
                        loginErrors.innerHTML = "<h6>Invalid Login Details ! <br/> Check details and try again</h6>";
                        loginErrors.style.display = "block";

                        console.error(`Bad login request: ${res.status}`);
                        setUsername("");
                        setPassword("");
                        setRole("");
                        setIsLoggedIn(false);
                        setDisabled(true);
                        
                        localStorage.clear();
                        // history.push('/signin');
                        <Redirect push to={Signin}/>
                        window.location.reload()
                    }, 1000)
                }
                }).then(res => {
                    setUser(res)
                    const generateId = () => Math.random().toString(36).substr(2, 36)
                    return localStorage.setItem("token", generateId())
                })
                .catch(err => {
                    console.log("ERROR ON LOGIN.\n", err.message)
                    setIsLoggedIn(false)
                    setDisabled(true)
                    return localStorage.clear();
                })
        }
        // if (user) {
        //     return <div>{user.firstname} is logged in.</div>
        // }
        if (!disabled) {
            userLogin();
            return setIsLoggedIn(true)
        } else {
            setDisabled(true)
            setIsLoggedIn(false)
        }

        return () => setIsLoggedIn(true)

    }, [username, password, role, disabled, history, isLoggedIn,])
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("token")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, [])

    const handleRememberme = useCallback((e) => {
        const userData = {
            "username": setUsername(e.target.value),
            "password": setPassword(e.target.value),
            "role": setRole(e.target.value)
        };

        if (e.target.checked === checked) {
            return rememberPassword
        }
        if (username && password && role) {
            setUsername(userData.username)
            setPassword(userData.password)
            setRole(userData.role)
        }
        setChecked(e.target.checked)
        setRememeberPassword(true)
        return;
    },[checked,rememberPassword, username, password, role])

      // cancel user login
    function cancelLogin() {
        let loginErrors = document.querySelector('.login-error');
            const resetInput = () => {
                setUsername("");
                setRole("");
                setPassword("");
                loginErrors.style.display = "none";
        }

        return resetInput()
    }
    return (
        <div className="login-container">
            <div className="join-chat-container">
                <div className="login-form-section">
                    <h1 className="chat-heading"><strong>Sign In</strong></h1>
                <form htmlFor="signup-form"
                    method="POST" name="login_form"
                    id="login_form"
                    className="signup-form"
                        onSubmit={e => { return handleLogin(e) }}
                    >
                    <hr style={{ marginBottom: ".5rem" }} />
                    <div className="col-1-of-1 login-error"
                            id="login-error"
                        >
                            {/* login error section */}
                    </div>
                    <div className="form--group">
                        <input type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            id="username"
                            name="username"
                            className="join-input"
                            inputMode="text"
                            placeholder="Username"
                            // required
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
                                // required
                            />
                        <label htmlFor="room-label" className="form-label"> Password </label>
                    </div>
                    <div className="form--group">
                        <input
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                            id="role"
                            name="role"
                            list="roles"
                            className="join-input mt-20"
                            inputMode="none"
                            placeholder="Role"
                                // required
                            />
                            <label htmlFor="role-label" className="form-label"> Role </label>
                            <datalist id="roles">
                                <option value="admin"></option>
                                <option value="user"></option>
                                <option value="other"></option>
                            </datalist>
                    </div>
                    {/* <div className="form--group mt-20">
                        <input type="checkbox"
                            name="remember"
                            id="remember"
                                className="remember_me_checkbox"
                                checked={checked}
                            onChange={ (e) => handleRememberme(e)}
                        />
                        <label htmlFor="remember-me">Remember me.</label>
                    </div> */}
                        <hr style={{marginBottom:"1rem"}}/>
                    <div className="form--group join__footer--btn">
                            <button type="submit" className="btn btn--signin"> Sign in</button>
                            <input type="reset" className="btn btn__close btn__cancel--login" value="Cancel"
                            onClick={() => cancelLogin() }
                            />
                    </div>
                    {/* <a href="#" className="forgotten_auth">Forgot username & password?</a> */}
                </form>
                
                </div>
                
            </div>
        </div>
    );
}

export default React.memo(SignIn);
