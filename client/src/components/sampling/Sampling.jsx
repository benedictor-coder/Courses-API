import React, { useState, useEffect } from 'react';
import Table from '../table/TableComponent';
import Modal from '../modal/Modal'
import PropTypes from 'prop-types';
// import Modal from '../modal/Modal';
import Select from '../select/Select';

function Sampling () {
    //Water sources workings
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState({});
    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [query, setQuery] = useState("");
    const [searchColumns, setSearchColumns] = useState(["facility"]);
  const mountData = React.useRef(false);

  const modalRef = React.useRef();

  function handleModal() {
      !mountData.current ?
      modalRef.current.openModal() :
      modalRef.current.closeModal()
  }

    useEffect(() => {
        setPageLoading(true);
    
        async function fetchData () {
            await fetch('/water-management-sampling/api/v1/sampling', {
                method: 'GET', headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } || new Headers()
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
    
    }, [setSources,pageloading]);

    const modalRefEdit = React.useRef();

    function handleModalEdit() {
        !mountData.current ?
            modalRefEdit.current.openModal() :
            modalRefEdit.current.closeModal()
    }
const handleEditSample = async (id) => {
        // const {_id} = users[0]
        // id  = _id
        const editOptions = {
            // "username": username,
            // "password": password
        }

        await fetch(`/water-management-users/api/v1/user/${id}`, {
            method: "PATCH",
            body: JSON.stringify(editOptions),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            } || new Headers()
        }).then((res) => res.ok && res.status === 200 ? res.json() : console.error(`Bad request: ${res.status}`))
        .catch(err => console.error("There was an error.\n", err))
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
            <h1 className="heading-tertiary">Water sampling</h1>
            <div className='table-section'>
                {/* <div className="add__data add_water_source">
                    <input type="button" className="btn btn__add" onClick={ handleModal } value="Add data."/>
                </div> */}
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
                    // actions={<th>Actions</th>}
                    // buttons={
                    //     <div style={ { width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" } }>
                    //         <input type="submit" className="btn btn-edit" onClick={() => handleModalEdit()} value="Edit" />
                    //         {/* <input type="button" className="btn btn-view" value="View"/> */}
                    //         {/* <input type="button" className="btn btn-delete" value="Delete"/> */}
                    //     </div>
                    // }
                    page={<>Page 1</>}
                >
                    {
                        <>
                            <caption>
                                Sampling data
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
                    <legend style={{ textAlign: "center" }}><h4 style={{ margin: "0 .5rem" }}>Edit Sample</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={(id) => handleEditSample(id)}>
                            <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="company" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Username:</label>
                                <input type="text"
                                    className="form__control"
                                    id="username"
                                    name="username"
                                        placeholder="Username..."
                                        // value={username}
                                        // onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="contractor" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Contractor:</label>
                                <input type="password"
                                    className="form__control"
                                    id="password"
                                    name="password"
                                        placeholder="Password..."
                                        // value={password}
                                        // onChange={e => setPassword(e.target.value)}
                                />
                                </div>
                                <div className="form__group" id="form_group--footer">
                                <input type="submit" className="btn btn__submit" value="Submit" />
                                <input type="button" className="btn btn__close" value="Cancel" onClick={() => { modalRefEdit.current.closeModal() }} />
                            </div>
                        </form>
                    </div>
                </fieldset>
            </Modal>
        </div>
    )
}

export default Sampling;
