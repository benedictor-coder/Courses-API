import React, { useState, useEffect, useCallback } from 'react';
import Table from '../table/TableComponent';
import './Users.css';
import Modal from '../modal/Modal'

function Users() {
    // const [source, setSource] = useState('');
    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [users, setUsers] = useState([]);
    const [locked, setLocked] = useState(false);
    const [user, setUser] = useState({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [query, setQuery] = useState("");
    const [searchColumns, setSearchColumns] = useState(["firstname", "lastname"]);
    
    const mountData = React.useRef(false);

    useEffect(() => {
        setPageLoading(true)
        async function getAllUsers() {
            await fetch('/water-management-users/api/v1/users', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } || new Headers()
            })
            .then(res => res.ok && res.status === 200? res.json() : `Bad request\n: ${res.status}`)
            .then(users => {
                setUsers(users)
                setErrorMsg(null)
                console.log(users)
            })
            .catch(err => {
                console.error("Request not successful.", err.message)
                setUsers(null)
                setErrorMsg(`Could not load data from the server...`)
            })
            .finally(() => {
                setPageLoading(false)
            })
            
            return function cleanEffect() {
                setUsers(users =>  users)
            };
    }
        getAllUsers();

        return () => setPageLoading(false);

    }, [setUsers])

    const lockUnlockUser =  useCallback( async () => {
        await fetch("/water-management-users/api/v1/user/status/:id", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            } || new Headers()
        })
            .then(res => res.ok && res.status === 200 ? alert("USER will be LOCKED from accessing the system") : `Could not get users\n: ${res.status}`)
            .then(user => {
                setUser(user)
                setLocked(true)
                setErrorMsg(null)
            console.log(`User Locked.`)
            })
            .catch(error => {
                console.log("User not found\n", error.message)
                setUser(user)
            })
            .finally(() => {
            return locked
        })
    }, [user, locked])

    const modalRefEdit = React.useRef();

    function handleModalEdit() {
        !mountData.current ?
            modalRefEdit.current.openModal() :
            modalRefEdit.current.closeModal()
    }
    const editUser = async (id) => {
        const {_id} = users[0]
        id = _id
        // if(id) window.alert("Do you want to edit theis user?")
        const editOptions = {
            "username": username,
            "password": password
        }

        await fetch(`/water-management-users/api/v1/users/${id}`, {
            method: "PATCH",
            body: JSON.stringify(editOptions),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            } || new Headers()
        }).then((res) => res.ok && res.status === 200 ? res.json() : console.error(`Bad request: ${res.status}`))
            .catch(err => {
                console.error("There was an error.\n", err)
                setPageLoading(false)
            })
    }

    const handleEditUser = (e, id) => {
        e.preventDefault()

        editUser(id)
        setUsername("")
        setPassword("")
        modalRefEdit.current.closeModal()
    }

    const handleDeleteUser = async () => {
        await fetch(`/water-management-users/api/v1/users/user/:id`, {
            method:"DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            } || new Headers()
            
        })
            .then(res => res.ok ? res.json() : console.error(`Bad request: ${res.status}`))
            // .then(res => {
            //     if (res && user.role === "admin") {
            //         users.splice(users._id)
            // }
            // })
            .catch(err => {
            console.error("An error occurred\n.", err)
        })
    }
    const columns = users[0] && Object.keys(users[0]);
    
    if (users === []) {
        return <p className="heading-secondary">Loading list of users...</p>
    } else {
        
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
            {pageloading && <div> Loading users....</div>}
            {errorMsg && (<div>{ `There is a problem fetching users ${errorMsg}`}</div>)}
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
                        <div className="actions_btns">
                            {/* <input type="button" onClick={() => lockUnlockUser()} className="btn btn-view btn__lock--user" value="Lock User"/> */}
                            {/* <input type="submit"  className="btn btn-edit btn__unlock--user" value="Unlock User" /> */}
                            <input type="button" className="btn btn-edit" onClick={() => handleModalEdit()} value="Edit"/>
                            {/* <input type="button" className="btn btn-delete" value="Delete"/> */}
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
            <Modal ref={modalRefEdit}>
                <fieldset>
                    <legend style={{ textAlign: "center" }}><h4 style={{ margin: "0 .5rem" }}>Edit User</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={(e, id) => handleEditUser(e, id)}>
                            <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="company" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Username:</label>
                                <input type="text"
                                    className="form__control"
                                    id="username"
                                    name="username"
                                        placeholder="Username..."
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="contractor" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Password:</label>
                                <input type="password"
                                    className="form__control"
                                    id="password"
                                    name="password"
                                        placeholder="Password..."
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
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

export default Users;