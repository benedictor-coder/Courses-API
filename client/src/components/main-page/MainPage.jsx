import React, { useState, useEffect } from 'react';
import Table from '../table/TableComponent';
import './MainPage.css';
import Modal from '../modal/Modal'

function MainPage () {
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState({});
    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [query, setQuery] = useState("");
    const [searchColumns, setSearchColumns] = useState(["source", "county"]);   

    useEffect(() => {
        setPageLoading(true);

        async function fetchData () {
            await fetch('/water-management/api/v1', {
                method: 'GET', headers: new Headers()
            })
                .then(response => response.ok ? response.json() : null)
                .then(sources => {
                    setSources(sources);
                    console.log(sources)
                })
                .catch(err => {
                    console.log(err)
                    setErrorMsg(`Could not load data from the server...`)
                });

            return function cleanEffect () {
                setSources(sources =>  sources)
            };
        }

        fetchData();

        return () => setPageLoading(false)
            // return pageloading;
        
    }, [setSources,pageloading]);

    const mountData = React.useRef(false);
    const modalRefEdit = React.useRef();
    const modalRefView = React.useRef();

    function handleModalEdit () {
        !mountData.current ?
        modalRefEdit.current.openModal() :
        modalRefEdit.current.closeModal()
    }
   
    function handleEditSource(id) {
        const { _id } = sources[0];
        id = _id;
        // alert(`Source with id: ${id} will be edited`)
        if (id) {
            fetch(`/water-management/api/v1/${id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } || new Headers()
            })
        }
    }
    function handleModalView() {
        !mountData.current ?
        modalRefView.current.openModal() :
        modalRefView.current.closeModal();
    }

    async function handleViewDetails(id) {
        let { _id } = sources[0];
        id = _id;
        console.log(id)
        if (sources) {
            alert(id)
            await fetch(`/water-management/api/v1/${id}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } || new Headers()
            })
                .then(response => response.ok ? response.json() : null)
                .then(source => {
                    setSource(source);
                    console.log(source)
                })
                .catch(err => {
                    console.log('The source with the specified id does not exist')
                    console.log(err)
                })
        }

        handleModalView()
    }
    const getSource = 
                sources.length > 0
                    ? sources.map((source) => {
                        if (source) {
                            return <div key={source._id}>
                                <h5>{source.source}</h5>
                                <div>
                                    <ul key={source._id}>
                                        <li> ID: {source._id}</li>
                                        <li>Cost of water: {source.cost}</li>
                                        <li>Approved by:{source.approval}</li>
                                    </ul>
                                </div>
                            </div>
                        }
                        return { source: source }
                    })
                :
                null

    async function handleDelete(id) {
        const { _id } = sources[0];
        id = _id;
        if (id) {
            window.confirm(`WARNING!!\nItem with id: ${id}  will be deleted.`);
            await fetch(`/water-management/api/v1/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } || new Headers()
            }).then(res => {
                if (res) {
                    alert('Deleted successfully')
                }
            }).catch((err) => {
                alert(err.message)
            }) 
        }
    }

    const submitEditHandler = (e, id) => {
        e.preventDefault();
        handleEditSource(id);

        modalRefEdit.current.closeModal();
    }

    if (sources === []) {
        return <p className="heading-secondary">Loading list of water sources...</p>
    }

    function search(rows) {
        // const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter(row =>
            // row.source.toLowerCase().indexOf(query) > -1 ||
            // row.department.toLowerCase().indexOf(query) > -1
            searchColumns.some(column => row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
        )
    }

    const columns = sources[0] && Object.keys(sources[0]);

    return (
        <div className="main-page">
            <h1 className="heading-tertiary">Water Sources</h1>
            <div className='table-section'>
                <div className="add__data add_water_source">
                    <input type="button" className="btn btn__add" value="Add water source"/>
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
                            <input type="submit" onClick={ () => handleModalEdit() } className="btn btn-edit" value="Edit" />
                            {/* <input type="button" onClick={(id) => handleViewDetails(id)} className="btn btn-view" value="View"/> */}
                            <input type="button" className="btn btn-delete" onClick={(id) => handleDelete(id)} value="Delete"/>
                        </div>
                    }
                    page={<>Page 1</>}
                >
                    {
                        <>
                            <caption>
                                List of water sources
                            </caption>
                        </>
                    }
                    </Table>
            {
                errorMsg ? <div><h6 className="heading-primary">{ errorMsg }</h6></div> : null
            }
            </div>
            <Modal ref={modalRefEdit}>
                <fieldset>
                    <legend style={ { textAlign: "center" } }><h4 style={ { margin: "0 .5rem" } }>Edit water source</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={ (e, id) => submitEditHandler(e, id) }>
                            <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="source" name="source"
                                placeholder="Enter source name..."
                                
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="duration"
                                name="duration"
                                placeholder="Course duration..."
                                disabled
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="tuition"
                                name="tuition"
                                placeholder="Course tuition..."
                                disabled
                            />
                            </div>
                            <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="approval"
                                name="approval"
                                placeholder="Approval..."
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="school"
                                name="school"
                                placeholder="School for the source..."
                                
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="department"
                                name="department"
                                placeholder="Course department..."
                                
                            />
                        </div>
                            <hr />
                            <div className="form__group" id="form_group--footer">
                                <input type="submit" className="btn btn__submit" value="Submit" />
                                <input type="button" className="btn btn__close" value="Cancel" onClick={ () => modalRefEdit.current.closeModal() } />
                            </div>
                        </form>
                    </div>
                </fieldset>
            </Modal>
            <Modal ref={ modalRefView }>
                <fieldset>
                    <legend style={ { textAlign: "center" } }><h4 style={ { margin: "0 .5rem" } }>Water source details</h4></legend>
                    {/* <hr /> */}
                    <div className="registration__section" id="registration__section">
                        {getSource}
                        <hr />
                        <div className="form__group" id="form_group--footer">
                            {/* <input type="submit" className="btn btn__submit" value="Submit" /> */}
                            <input type="button" className="btn btn__close" value="Close" onClick={ () => modalRefView.current.closeModal() } />
                        </div>
                    </div>
                </fieldset>
            </Modal>
        </div>
    )
}

export default MainPage;