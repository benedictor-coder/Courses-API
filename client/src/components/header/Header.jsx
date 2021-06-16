import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header (props) {
    return (
        <header className="header">
            <section className="nav-section-left">
                <Link to="#link" className="nav-brand">Mabs Logo</Link>
            </section>
            <section className="nav-section-right">
                <nav className="nav-links">
                    <ul className="nav-links-list">
                        <li><Link to="" className="btn btn-signup">Sign up</Link></li>
                        <li><Link to="" className="btn btn-logout">Logout</Link></li>
                    </ul>
                </nav>
            </section>
        </header>

        );
}

export default Header;