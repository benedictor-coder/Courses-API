import React from 'react';
import Container from '../container/Container';
import './Body.css';

function Body () {
    return (
        <section className="body-content right__side--content">
            <div className="body-content-middle body__content--features">
                <Container />
            </div>
            <div className="body-content-bottom body__content--footer">

            </div>
        </section>
    );
}

export default Body;