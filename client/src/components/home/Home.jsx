import React from 'react';
// import Table from '../table/TableComponent';
import './Home.css';
import image1 from '../../images/lap.jpg';
import image2 from '../../images/html.jpg';
import image3 from '../../images/rainbow.jpg';
function Home () {
    return (
        <div className="home">
            <section className="section-about">
                <div className="u-center-text u-margin-bottom-big">
                    <h2 className="heading-tertiary">
                        Water data collection and dessemination system
                    </h2>
                </div>
                    <>
                <div className="row information">
                        <div className="col-1-of-2 content-left">
                            <h3 className="heading-tertiary u-margin-bottom-small">
                                Every drop counts.
                        </h3>
                            <p className="paragraph">
                                Kenya with a current population of 46 million and a projected population of 100 million in the next 50 years, faces
                                enormous challenges in management of its limited water resources. The magnitude of the issues and
                                challenges and severity of the water crisis, that currently face Kenya cut across most sectors of the
                                economy making water resources management a high priority requiring urgent attention.
                            </p>
                            <h3 className="heading-tertiary u-margin-bottom-small">
                                Water Scarcity.
                            </h3>
                            <p className="paragraph">
                                Kenya is classified as a water-scarce country. The natural endowment of renewable freshwater is
                                currently about 21 BCM (billion cubic meters) or 650 m3 per capita per annum. A country is categorised
                                “water-scarce” if its renewable freshwater potential is less than 1,000 m3 per capita per annum. By
                                2025, Kenya is projected to have a renewable freshwater supply of only 235 m3 per capita per annum
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
                <div className="row information">
                        <div className="col-1-of-1 content-left">
                            <h3 className="heading-tertiary u-margin-bottom-small">
                                Water catchment areas of Kenya
                            </h3>
                            <div className="catchment-areas">
                                <div className="catchment_circle">
                                    <div className="catchment_texts">
                                            <h3>Lake Victoria Basin</h3><br />
                                            {/* <span>Rainfall</span> */}
                                    </div>
                                </div>
                                <div className="catchment_circle">
                                    <div className="catchment_texts">
                                        <h3>Arthi River Basin</h3>
                                    </div>
                                </div>
                                <div className="catchment_circle">
                                    <div className="catchment_texts">
                                        <h3>Ewaso Nyiro Basin</h3>
                                    </div>
                                </div>  
                                <div className="catchment_circle">
                                    <div className="catchment_texts">
                                        <h3>Tana River Basin</h3>
                                    </div>
                                </div>
                                <div className="catchment_circle">
                                    <div className="catchment_texts">
                                        <h3>Rift Valley Basin</h3>
                                    </div>
                                </div>
                            </div>
                            {/* <h3 className="heading-secondary u-margin-bottom-small">
                                Catchments Information
                            </h3>
                            <p className="paragraph">
                                Integrated catchment planning involves the assessment of land, people and water resources in an
                                interactive environment along natural river flow boundaries or catchments.
                                The new thrust in land/water use planning should be to use river catchments/basins as the planning
                                unit.
                            </p> */}

                            {/* <a href="#link" className="col-1-of-2 btn-text">
                                Learn More &rarr;
                            </a> */}
                        </div>
                        {/* <div className="col-1-of-2 content-right">
                            <div className="composition">
                                <img src={ image1 } alt="1" className="composition__photo composition__photo--1" />
                                <img src={ image2 } alt="2" className="composition__photo composition__photo--2" />
                                <img src={ image3 } alt="3" className="composition__photo composition__photo--3" />
                            </div>
                        </div> */}
                    </div>
                <div className="row information">
                        <div className="col-1-of-2 content-left">
                            <h3 className="heading-tertiary u-margin-bottom-small">
                                Water Pricing.
                        </h3>
                            <p className="paragraph">
                                The most important tool of the market-based strategies for water demand management is water pricing.
                                This is so because water consumption for all uses is somewhat sensitive to price. More efficient water
                                use in all sectors can therefore be promoted by adopting a water pricing policy that is based on the user
                                pays principle where the user pays the full economic cost of water.
                        </p>
                            <h3 className="heading-tertiary u-margin-bottom-small">
                                Public Awareness
                        </h3>
                            <p className="paragraph">
                                The success of a water demand management program will depend on user cooperation. The
                                stakeholders must understand the need for water demand management. Many urban consumers have
                                no knowledge of their water source, supply capacity or availability, and necessary treatment and
                                distribution costs.
                        </p>

                            {/* <a href="#link" className="col-1-of-2 btn-text">
                                Learn More &rarr;
                        </a> */}
                        </div>
                        <div className="col-1-of-2 content-right">
                            <div className="composition">
                                <img src={ image1 } alt="1" className="composition__photo composition__photo--1" />
                                <img src={ image2 } alt="2" className="composition__photo composition__photo--2" />
                                <img src={ image3 } alt="3" className="composition__photo composition__photo--3" />
                            </div>
                        </div>
                    </div>
                </>
            </section>
        </div>
    );
}

export default Home;
