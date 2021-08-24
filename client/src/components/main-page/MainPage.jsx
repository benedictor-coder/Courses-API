import React, { useState, useEffect } from 'react';
import Table from '../table/TableComponent';
import './MainPage.css';
import Modal from '../modal/Modal'

function MainPage () {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');
    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [query, setQuery] = useState("");
    const [searchColumns, setSearchColumns] = useState(["course", "department"]);   

    useEffect(() => {
        setPageLoading(true);

        async function fetchData () {
            await fetch('/posts', { method: 'GET', headers: new Headers() })
                .then(response => response.ok ? response.json() : null)
                .then(courses => {
                    setCourses(courses);
                    console.log(courses)
                })
                .catch(err => {
                    console.log(err)
                    setErrorMsg(`Could not load data from the server...`)
                });

            return function cleanEffect () {
                setCourses(courses =>  courses)
            };
        }
        fetchData();
        setPageLoading(false)
    }, [setCourses]);

    const mountData = React.useRef(false);
    const modalRefEdit = React.useRef();
    const modalRefView = React.useRef();

    function handleModalEdit () {
        !mountData.current ?
            modalRefEdit.current.openModal() :
            modalRefEdit.current.closeModal()
    }
   
    function handleCourseEditing(id) {
        const { _id } = courses[0];
        id = _id;
        if (id) {
            fetch(`/posts/${id}`, {
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
        const { _id } = courses[0];
        id = _id;
            if (courses) {
                // alert(id)
                await fetch(`/posts/${id}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    } || new Headers()
                })
                    .then(response => response.ok ? response.json() : null)
                    .then(course => {
                        setCourse(course);
                        console.log(course)
                    })
                    .catch(err => {
                        console.log('The course with the specified id does not exist')
                        console.log(err)
                    })
            }
            handleModalView()
    }
    const getCourse = courses.length > 0
        ? courses.map(course => {
            return <div key={course._id}>
                <h5>{course.course}</h5>
                <div>
                    <ul key={course._id}>
                        <li> ID: {course._id}</li>
                        <li>Tuition: {course.tuition}</li>
                        <li>Approved by:{course.approval}</li>
                    </ul>
                </div>
            </div>
            })
        : null
    function handleDelete(id) {
        const { _id } = courses[0];
        id = _id;
        if (id) {
            // alert(id);
            window.confirm(`WARNING!! \n      Item with id: ${id}  will be deleted.`);
            fetch(`/posts/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                alert('Deleted successfully')
            })
        }
    }

    const submitEditHandler = (e, id) => {
        e.preventDefault();

        handleCourseEditing(id);

        modalRefEdit.current.closeModal();
    }

    if (courses === []) {
        return <p className="heading-secondary">Loading list of departments...</p>
    }

    function search(rows) {
        // const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter(row =>
            // row.course.toLowerCase().indexOf(query) > -1 ||
            // row.department.toLowerCase().indexOf(query) > -1
            searchColumns.some(column => row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
        )
    }

    const columns = courses[0] && Object.keys(courses[0]);

    return (
        <div className="main-page">
            <h1 className="heading-tertiary chat-heading">Content Section</h1>
                What is Lorem Ipsum ?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book.It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.

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
                <Table data={search(courses)}
                    actions={<th>Actions</th>}
                    buttons={
                        <div style={ { width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" } }>
                            <input type="submit" onClick={ () => handleModalEdit() } className="btn btn-edit" value="Edit" />
                            <input type="button" onClick={() => handleViewDetails()} className="btn btn-view" value="View"/>
                            <input type="button" className="btn btn-delete" onClick={(id) => handleDelete(id)} value="Delete"/>
                        </div>
                    }
                />
            {
                errorMsg ? <div><h6 className="heading-primary">{ errorMsg }</h6></div> : null
            }
            </div>
            <Modal ref={ modalRefEdit }>
                <fieldset>
                    <legend style={ { textAlign: "center" } }><h4 style={ { margin: "0 .5rem" } }>Edit course</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={ (e, id) => submitEditHandler(e, id) }>
                            <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="course" name="course"
                                placeholder="Enter course name..."
                                
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
                                placeholder="School for the course..."
                                
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
                    <legend style={ { textAlign: "center" } }><h4 style={ { margin: "0 .5rem" } }>Course details</h4></legend>
                    {/* <hr /> */}
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form">
                                {getCourse}
                            <hr />
                            <div className="form__group" id="form_group--footer">
                                {/* <input type="submit" className="btn btn__submit" value="Submit" /> */}
                                <input type="button" className="btn btn__close" value="Close" onClick={ () => modalRefView.current.closeModal() } />
                            </div>
                        </form>
                    </div>
                </fieldset>
            </Modal>
        </div>
    )
}

export default MainPage;