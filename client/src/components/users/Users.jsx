import React, { useState, useEffect } from 'react';
import Table from '../table/TableComponent';
import './Users.css';

function Users() {
    // const [source, setSource] = useState('');
    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [searchColumns, setSearchColumns] = useState(["username", "role"]);   

    useEffect(() => {
        setPageLoading(true)
        async function getAllUsers() {
            await fetch('/water-management-users/api/v1/users', {
                method: "GET",
                headers: {
                    "Accept": "application/json", "Content-Type": "application/json"
                } || new Headers()
            })
            .then(res => res.ok ? res.json() : "Error from server")
            .then(users => {
            setUsers(users)
            console.log(users)
            })
            .catch(err => {
            console.error(err, "COULD NOT GET USERS FROM SERVER.")
            setErrorMsg(`Could not load data from the server...`)
            })
            return function cleanEffect () {
                setUsers(users =>  users)
            };
    }
        getAllUsers();

        return () => setPageLoading(false);
    }, [setUsers])

    const columns = users[0] && Object.keys(users[0]);
    
    if (users === []) {
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
            <h1 className="heading-tertiary">USERS</h1>
            {/* <button type="button" className="btn btn__add" onClick={handleModal}> Add Data </button> */}
            <div className='table-section'>
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
                <Table data={search(users)}
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
                        <caption>List of users</caption>
                        </>
                }
                </Table>
            {
                errorMsg ? <div><h6 className="heading-primary">{ errorMsg }</h6></div> : null
            }
            </div>
        </div>
    )
}

export default Users;