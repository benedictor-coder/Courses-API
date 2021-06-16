import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import SignIn from '../signin/SignIn';
import './Popup.css';

function Popup (props) {
    return ReactDOM.createPortal(
        <div className="popup" id="popup">
            <div className="popup__content">
                <div className="popup__body">
                    <div className="popup__header">
                        <BrowserRouter>
                            <Link to='' className="sign-up heading-secondary">
                                SignUp
                            </Link>
                        </BrowserRouter>
                        <button type="button" className="btn popup__close">&times;</button>
                    </div>
                    <SignIn />
                </div>
            </div>
        </div>,
        document.getElementById('popup-root')
    );
}


export default Popup;