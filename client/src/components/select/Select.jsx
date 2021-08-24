import React from 'react';

function Select ({ className, value, id, name, onChange, ...props }) {
    return (
        <select
            className={ className }
            id={ id }
            name={ name }
            onChange={ onChange }
        >
            {/*<option defaultValue value="default">--select option--</option>*/}
            {props.children}
        </select>
    );
}

export default Select;