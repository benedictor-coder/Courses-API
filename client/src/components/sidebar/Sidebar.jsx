import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { SidebarLinks } from '../../includes/SidebarLinks';

function Sidebar () {
    return (
        <section className="sidebar left__side--content">
            {/* <form htmlFor="search" className="search">
                <div className="form__group--search">
                    <input type="text"
                        className="form__input--search"
                        id="search_text"
                        name="search_text"
                        inputMode="search"
                        placeholder="Search..."
                        required />
                    <span className="search--bar"><button className="btn btn--search">search</button></span>
                </div>
            </form> */}
            <div className="sidebar--heading">
                <h2 className="heading-primary">
                    Navigation Menu
                </h2>
            </div>
            <div className="sidebar-top-content">
                <ul>
                    {
                        SidebarLinks.map((item, index) => {
                            return (
                                <li key={ index }>
                                    <Link to={ item.path } className="btn btn-signup">
                                        <span>{ item.title }</span>
                                    </Link>
                                </li>
                            );
                        })
                    }
                    
                </ul>
                
            </div>
        </section>
        );
}

export default Sidebar;