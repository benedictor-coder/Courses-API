import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDom from 'react-dom';
import './Modal.css';

function Modal(props, ref) {
    const [display, setDisplay] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            openModal: () => open(),
            closeModal: () => close()
        }
    })
    const open = () => {
        setDisplay(true)
    }

    const close = () => {
        setDisplay(false)
    }
    if (display) {
        return ReactDom.createPortal(
            <div className="modal__wrapper">
                <div className="modal__backdrop" />
                <div className="modal__box">
                    {props.children}
                </div>
            </div>,
            document.getElementById('modal-root')
    );
}
    return null
}

export default forwardRef(Modal);