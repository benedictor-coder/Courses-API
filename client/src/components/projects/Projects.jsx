import React, { useState }from 'react';
import './Projects.css';
import image1 from '../../images/lap.jpg';
import Table from '../table/TableComponent';

function Projects() {

        // const [source, setSource] = useState('');
        const [errorMsg, setErrorMsg] = useState('');
        const [sources, setSources] = useState([]);
        const [query, setQuery] = useState("");
        const [searchColumns, setSearchColumns] = useState(["source", "county"]);


        const columns = sources[0] && Object.keys(sources[0]);
    
        if (sources === []) {
            return <p className="heading-secondary">Loading list of users...</p>
        }

    function search(rows) {
        // const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter(row =>
            // row.source.toLowerCase().indexOf(query) > -1 ||
            // row.department.toLowerCase().indexOf(query) > -1
            searchColumns.some(column => row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
        )
    }

    return (
        <div className="main-page">
            <h1 className="heading-tertiary">Water Projects</h1>
            <h4 className="heading-tertiary" style={{ fontSize: "small", textAlign:"center"}}>Upcomng Projects</h4>
            <section className="section-cards">
                <div className="row features-row">
                    <div className="col-1-of-4">
                        <div className="feature-box meetings_lists">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__1" />
                            <h3 className="heading-tertiary">
                                Kimwarer Dam
                            </h3>
                            {/* <p className="feature-box__text"> */}
                                <ul>
                                    <li>Contractor: Benedictor Milimu</li>
                                    <li>Company: Love Mercy Ltd.</li>
                                    <li>Commence: 20th Jan, 2022 </li>
                                    <li>Completion: 25th November, 2025</li>
                                    <li>Location: Marakwet</li>
                                    <li>Budget: 40 Billion</li>
                                </ul>
                        {/* </p> */}
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="feature-box meetings_lists">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__2" />
                            <h3 className="heading-tertiary">
                                Project 2
                        </h3>
                            <p className="feature-box__text">
                                The most amazing designs come from creativity in the mind.
                                Good designs with ease.
                        </p>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="feature-box meetings_lists">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__3" />
                            <h3 className="heading-tertiary">
                                Project 3
                        </h3>
                            <p className="feature-box__text">
                                The most amazing designs come from creativity in the mind.
                                Good designs with ease.
                        </p>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="feature-box meetings_lists">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__4" />
                            <h3 className="heading-tertiary">
                                Project 4
                            </h3>
                            <p className="feature-box__text">
                                The most amazing designs come from creativity in the mind.
                                Good designs with ease.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="projects_table">
                <div className="add__data add_water_source">
                    <input type="button" className="btn btn__add" value="Add Project"/>
                </div>
                <form htmlFor="search-table" className="search__table">
                    <div className="form__group--search">
                        <>
                            <input type="text"
                                id="search_table"
                                className="form__input--search-table"
                                name="search_table"
                                placeholder="search table..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                            />
                            <span><small style={{ color: "#777" }}>by</small></span>
                        </>
                        {
                            columns && columns.map((column, index) =>
                                <label key={index}>
                                    <input type="checkbox"
                                        checked={searchColumns.includes(column)}
                                        onChange={(e) => {
                                            const checked = searchColumns.includes(column)
                                            setSearchColumns(prev => checked ? prev.filter(sc => sc !== column ) : [...prev, column])
                                        }}
                                    />
                                    {column}
                                </label>
                            )
                        }
                    </div>
                </form>
                <Table data={search(sources)}
                    actions={<th>Actions</th>}
                    buttons={
                        <div style={ { width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" } }>
                            {/* <input type="submit" onClick={ () => handleModalEdit() } className="btn btn-edit" value="Edit" /> */}
                            {/* <input type="button" onClick={() => handleViewDetails()} className="btn btn-view" value="View"/> */}
                            <input type="button" className="btn btn-delete" value="Delete"/>
                        </div>
                    }
                    page={<>Page 1</>}
                >
                    {
                        <>
                        <caption className="caption_headers" style={{disp:"flex", flexDirection:"row", justifyContent:"space-between"}}>List of projects</caption>
                        </>
                }
                </Table>
            {
                errorMsg ? <div><h6 className="heading-primary">{ errorMsg }</h6></div> : null
            }
            </section>
        </div>
    );
}


export default Projects;