import React from 'react';
import './Cards.css';
import image1 from '../../images/lap.jpg';

function Cards () {
    return (
        <>
            <section className="section-features">
                <div className="row features-row">
                    <div className="col-1-of-4">
                        <div className="feature-box">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__1" />
                            <h3 className="heading-tertiary">
                                Explore cool designs
                            </h3>
                            <p className="feature-box__text">
                                The most amazing designs come from creativity in the mind.
                                Good designs with ease.
                        </p>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="feature-box">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__2" />
                            <h3 className="heading-tertiary">
                                Explore cool designs
                        </h3>
                            <p className="feature-box__text">
                                The most amazing designs come from creativity in the mind.
                                Good designs with ease.
                        </p>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="feature-box">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__3" />
                            <h3 className="heading-tertiary">
                                Explore cool designs
                        </h3>
                            <p className="feature-box__text">
                                The most amazing designs come from creativity in the mind.
                                Good designs with ease.
                        </p>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="feature-box">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__4" />
                            <h3 className="heading-tertiary">
                                Explore cool designs
                            </h3>
                            <p className="feature-box__text">
                                The most amazing designs come from creativity in the mind.
                                Good designs with ease.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cards;