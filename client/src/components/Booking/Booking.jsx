import React from 'react';
import './Booking.css';
function Booking () {
    return (
        <div className="section-booking">
            <div className="row booking__content">
                <div className="book">
                    <div className="book-right book__form">
                        <form action="#" className="form">
                            <div className="u-margin-bottom-medium">
                                <h2 className="heading-secondary">
                                    Book A Design
                                </h2>
                            </div>
                            <div className="form__group">
                                <input type="text" className="form__input" id="full__name" name="full_name" inputMode="text" placeholder="Full name" required />
                                <label htmlFor="full__name" className="form__label">Full Name</label>
                            </div>
                            <div className="form__group">
                                <input type="email" className="form__input" id="email__address" name="email__address" inputMode="email" placeholder="Email Address" required />
                                <label htmlFor="email__address" className="form__label">Email Address</label>
                            </div>
                            <div className="form__group">
                                <div className="form__radio--group">
                                    <input type="radio" className="form__radio--input" id="small" inputMode="text" name="radio" selected />
                                    <label htmlFor="small" className="form__radio--label">
                                        <span className="form__radio--button"></span>
                                        Small design
                                    </label>
                                </div>
                                <div className="form__radio--group">
                                    <input type="radio" className="form__radio--input" id="large" inputMode="text" name="radio" />
                                    <label htmlFor="large" className="form__radio--label">
                                        <span className="form__radio--button"></span>
                                        Large design
                                    </label>
                                </div>
                            </div>
                            <div className="form__group">
                                <button className="btn btn--book">Book Now &rarr;</button>
                            </div>
                        </form>
                    </div>
                    <div className="book-left">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Booking);