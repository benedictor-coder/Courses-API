import React from 'react';
import './InfoSection.css';
import image1 from '../../images/lap.jpg';
import image2 from '../../images/html.jpg';
import image3 from '../../images/rainbow.jpg';

function InfoSection () {
    return (
        <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-tertiary">
                    Exciting tours for adventurous people
                </h2>
            </div>
            <div className="row">
                <div className="col-1-of-2 content-left">
                    <h3 className="heading-tertiary u-margin-bottom-small">
                        You are going to fall in love with nature
                </h3>
                    <p className="paragraph">
                        This is an amazing adventure and a chance to explore and experience the wonders of life and the things that comes
                        with it. Be ready to appreciate the way the universe is organized without the influence of mankind.
                        Welcome to the world!!
                </p>
                    <h3 className="heading-tertiary u-margin-bottom-small">
                        Enjoy Natures Beauty
                </h3>
                    <p className="paragraph">
                        This is an amazing adventure and a chance to explore and experience the wonders of life and the things that comes
                        with it. Be ready to appreciate the way the universe is organized without the influence of mankind.
                        Welcome to the world!!
                </p>

                    <a href="#link" className="col-1-of-2 btn-text">
                        Learn More &rarr;
                </a>
                </div>
                <div className="col-1-of-2 content-right">
                <div className="composition">
                    <img src={ image1 } alt="1" className="composition__photo composition__photo--1" />
                    <img src={ image2 } alt="2" className="composition__photo composition__photo--2" />
                    <img src={ image3 } alt="3" className="composition__photo composition__photo--3" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InfoSection;