import React, { useState, useEffect, useCallback}  from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import SignIn from '../signin/SignIn'
import './Header.css';

function Header(props) {
    const history = useHistory();

    const [user, setUser] = useState({})
    const [logout, setLogOut] = useState(false);

    // handle logout
    const handleLogout = useCallback(() => {
        if (!logout) {
            localStorage.removeItem('token')
            // localStorage.clear()
            setLogOut(true)
            return <Redirect push to={SignIn}/>
        }
    }, [logout])

    useEffect(() => {
        if (!logout) {
            return handleLogout
        }
    }, [logout, handleLogout])

    return (
        <header className="header">
            <section className="nav-section-left">
                <Link to="#link" className="nav-brand">Water Data Collection</Link>
            </section>
            <section className="nav-section-right">
                <nav className="nav-links">
                    <ul className="nav-links-list">
                        {/* <li><Link to="" className="btn btn-signup">Sign up</Link></li>`  */}
                        <li><Link to="" className="btn btn-logout" onClick={ handleLogout }>Logout</Link></li>
                    </ul>
                </nav>
            </section>
        </header>

        );
}

export default Header;