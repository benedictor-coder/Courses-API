import React from 'react';
import ReactDOM from 'react-dom';
import './Popup.css';

function Popup (props) {
    return ReactDOM.createPortal(
        <div className="popup" id="popup">
            <div className="popup__content">
                <div className="popup__body">
                    <div className="popup__header">
                        {props.title}
                        <button type="button" className="btn popup__close">&times;</button>
                    </div>
                    {props.content}
                </div>
            </div>
        </div>,
        document.getElementById('popup-root')
    );
}


export default Popup;