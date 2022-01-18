import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { SidebarLinks } from '../../includes/SidebarLinks';

function Sidebar () {
    return (
        <section className="sidebar left__side--content">
            <div className="sidebar--heading">
                <h2 className="heading-primary">
                    Menu
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