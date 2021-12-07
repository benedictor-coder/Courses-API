import React, { useState, useEffect,useCallback} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';

function Header(props) {
    const history = useHistory();
    const [logout, setLogOut] = useState(false);
    // handle logout
    const handleLogout = () => {
        setTimeout(() => {
            if (!logout) {
            history.push('/signin')
            return setLogOut(true)
        }
        }, 1000)
    }

    return (
        <header className="header">
            <section className="nav-section-left">
                <Link to="#link" className="nav-brand">Water Management System</Link>
            </section>
            <section className="nav-section-right">
                <nav className="nav-links">
                    <ul className="nav-links-list">
                        {/* <li><Link to="" className="btn btn-signup">Sign up</Link></li> */}
                        <li><Link to="" className="btn btn-logout" onClick={ handleLogout }>Logout</Link></li>
                    </ul>
                </nav>
            </section>
        </header>

        );
}

export default Header;