import React from 'react';

function Meetering(props) {
    return (
        <div className="main-page">
            <h1 className="heading-tertiary ">Meetering</h1>
            <div className='table-section'>
                <div className="add__data add_water_well">
                    <input type="button" className="btn btn__add" value="Add meter"/>
                </div>
            </div>
        </div>
    );
}

export default Meetering;