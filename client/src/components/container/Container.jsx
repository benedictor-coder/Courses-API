import React from 'react';
import Pages from '../pages/Pages';
import './Container.css';
function Container () {
    return (
        <div className="chat-container">
            <div className="available-chat-container">
                <Pages />
            </div>
        </div>
    );
}

export default Container;