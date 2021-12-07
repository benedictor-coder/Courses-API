import React from 'react';

function Select ({ className, value, id, name, onChange, ...props }) {
    return (
        <select
            className={ className }
            id={ id }
            name={ name }
            onChange={ onChange }
        >
            {props.children}
        </select>
    );
}

export default Select;