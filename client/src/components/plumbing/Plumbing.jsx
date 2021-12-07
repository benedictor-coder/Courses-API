import React from 'react';

function Plumbing(props) {
    return (
        <div className="main-page">
            <h1 className="heading-tertiary ">Plumbing</h1>
            <div className='table-section'>
                <div className="add__data add_water_well">
                    <input type="button" className="btn btn__add" value="Add plumber"/>
                </div>
            </div>
        </div>
    );
}

export default Plumbing;