import React, { useState, useEffect }from 'react';
import './Projects.css';
import image1 from '../../images/lap.jpg';
import Table from '../table/TableComponent';
import Modal from '../modal/Modal'
import PropTypes from 'prop-types';
// import Select from '../select/Select';

function Projects() {
  //UI DATA
  const [ projectName, setProjectName ] = useState('');
  const [ contractor, setContractor] = useState('');
  const [company, setCompany] = useState('');
  const [commencement, setCommencement] = useState('');
  const [completion, setCompletion] = useState('');
  const [approval, setApproval] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [projectNumber, setProjectNumber] = useState('');
  const propTypes = {
      projectName: PropTypes.string.isRequired,
      projectNumber: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      approval: PropTypes.string.isRequired,
      contractor: PropTypes.string.isRequired,
      completion: PropTypes.string.isRequired,
      commencement: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
  }
    const mountData = React.useRef(false);
    
 //Water project workings
    const [projects, setProjects] = useState([]);
    const [theProject, setTheProject] = useState({});
    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [query, setQuery] = useState("");
    const [searchColumns, setSearchColumns] = useState(["project_name", "location","name_of_contractor"]);

    const modalRefProject = React.useRef();

    function handleProjectCreating () {
        !mountData.current ?
        modalRefProject.current.openModal() :
        modalRefProject.current.closeModal()
    }
  const clearInput = () => {
      if (!mountData.current) {
          setProjectName("")
          setProjectNumber("")
          setApproval("")
          setCompany("")
          setCommencement("")
          setBudget("")
          setCommencement("")
          setCompletion("")
          setLocation("")
          setContractor("")
      }
      return () => mountData.current = true;
  }

  function validateInput() {
      if (!projectName || !projectNumber || !budget || !approval || !completion || !commencement || !contractor || !company || !location) {
          alert("Fill in the required fields");
          return;
      }
      if (!Number(budget) && !Number.isInteger(budget) && !propTypes.budget) {
          //polyfill for pre-es6
          Number.isInteger = function (num) {
              return typeof num == 'number' && num === Number(budget).toFixed(2);
          }
          alert("The budget must be a number!!");
          return;
      }
      if (Number(projectName) && !propTypes.projectName) {
          alert("Name of the project has to be string")
          return;
      }
      if (Number(approval) && !propTypes.approval) {
          alert("Approval has to be string")
          return;
      }
      if (Number(commencement) && !propTypes.commencement) {
          alert("Commence date is required")
          return;
      }
      if (Number(completion) && !propTypes.completion) {
          alert("Completion for the project is required")
          return;
      }
      if (Number(company) && !propTypes.company) {
          alert("Contracting company must be filled")
          return;
      }
      if (Number(location) && !propTypes.location) {
          alert("Enter location for the project")
          return;
      }
      if (Number(contractor) && !propTypes.contractor) {
          alert("Enter name of contractor for the project")
          return;
      }
      clearInput()
      modalRefProject.current.openModal()
  }

  let data = {
      "project_name": projectName,
      "project_number": projectNumber,
      "name_of_contractor": contractor,
      "approved_by": approval,
      "budget": budget,
      "completion_date": completion,
      "commence_date": commencement,
      "contracting_company": company,
      "location": location
  }

  let url = '/water-management-projects/api/v1/projects';

  let requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  }

  async function setProject () {
      await fetch(url, requestOptions, { withCredentials: true })
          .then((response) => {
              try {
                  response.json()
              } catch (error) {
                  console.log("Error occured while sending data!")
                  console.error(error)
              }
          })
          .catch(error => {
              console.log(error)
              throw new Error("An error has occurred", error)
          })
  }


  const submitProjectHandler = (e) => {
          e.preventDefault();

          validateInput()
          setProject();
          modalRefProject.current.closeModal()
          console.log(data)
  }
  //end post data modal workings

 // Fetch all water projects data from db
    useEffect(() => {
        setPageLoading(true);

        async function fetchData() {
            await fetch('/water-management-projects/api/v1/projects', {
                method: 'GET', headers: new Headers()
            })
                .then(response => response.ok && response.status === 200 ? response.json() : `Server error: ${response.status}`)
                .then(sources => {
                    setProjects(sources);
                    setErrorMsg(null)
                    console.log(sources)
                })
                .catch(err => {
                    setErrorMsg(`Could not load data from the server...`)
                    setProjects(null)
                    console.log(err.message)
                })
                .finally(() => {
                    setPageLoading(false)
                })

            return function cleanEffect() {
                setProjects(projects => projects)
            };
        }

        fetchData();

        return () => setPageLoading(false)

    }, [setProjects]);
    
    const modalRefEdit = React.useRef();

    function handleModalEdit() {
        !mountData.current ?
            modalRefEdit.current.openModal() :
            modalRefEdit.current.closeModal()
    }

    const editProject = async (id) => {
        const { _id } = projects[0];
        id = _id
        // alert(`Source with id: ${id} will be edited`)
        if (id) {
            fetch(`/water-management-projects/api/v1/projects/${id}`,  {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } || new Headers()
            })
                .then(res => res.ok ? res.json() : console.error(`Bad request: ${res.status}`))
                // .then(project => {
                //     setProjects(project)
                //     setErrorMsg(null)
                //     console.log(project)
                // })
                .catch(err => {
                    console.log('There was an error getting source\n', err.message)
                    setPageLoading(false)
                })
        }
    }

    const submitEditHandler = (e, id) => {
        e.preventDefault()

        editProject(id)
        modalRefEdit.current.closeModal();
    }

    if (projects === []) {
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

    const deleteProject = async(id) => {
        const {_id} = projects[0]
        id = _id;

        await fetch(`/water-management-projects/api/v1/projects/${id}`,
            {
            method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }
            }).then(res => res.ok && res.status === 200 ? res.json() : console.error(`Bad request: ${res.status}`))
        .catch(err => {
            console.error("There was an error\n.", err)
        })
    }
    const columns = projects[0] && Object.keys(projects[0]);
    return (
        <div className="main-page">
            <h1 className="heading-tertiary">Water Projects</h1>
            {/* <div className="projects-section"> */}
                <section className="section-cards cards-information">
                <h4 className="heading-tertiary" style={{ fontSize: "small", textAlign:"center"}}>Upcomng Projects</h4>
                <div className="row features-row">
                    <div className="col-1-of-4">
                        <div className="feature-box meetings_lists">
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__1" />
                            <h3 className="heading-tertiary project-heading">
                                Kimwarer Dam
                            </h3>
                            {/* <p className="feature-box__text"> */}
                                <ul className="feature-box__text">
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
                            <h3 className="heading-tertiary project-heading">
                                Project 2
                        </h3>
                            {/* <p className="feature-box__text"> */}
                                <ul className="feature-box__text">
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
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__3" />
                            <h3 className="heading-tertiary project-heading">
                                Project 3
                        </h3>
                            {/* <p className="feature-box__text"> */}
                                <ul className="feature-box__text">
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
                            <img src={ image1 } alt="img-1" className="feature-box__icon img__4" />
                            <h3 className="heading-tertiary project-heading">
                                Project 4
                            </h3>
                            {/* <p className="feature-box__text"> */}
                                <ul className="feature-box__text">
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
                </div>
                </section>
                <section className="projects_table">
                <div className='table-section'>
                    <div className="add__data add_water_source">
                        <input type="button" className="btn btn__add btn__water--project" onClick={ () => handleProjectCreating() } value="Add water project"/>
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
                    <Table data={search(projects)}
                        actions={<th>Actions</th>}
                        buttons={
                            <div style={ { width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" } }>
                                <input type="submit" className="btn btn-edit" onClick={() => handleModalEdit()} value="Edit" />
                                {/* <input type="button" className="btn btn-view" value="View"/> */}
                                <input type="button" className="btn btn-delete" value="Delete" onClick={ () => deleteProject()}/>
                            </div>
                        }
                        page={<>Page 1</>}
                    >
                        {
                            <>
                                <caption>
                                    Projects
                                </caption>
                            </>
                        }
                        </Table>
                </div>
                <Modal ref={modalRefProject}>
                    <fieldset>
                        <legend style={ { textAlign: "center" } }><h4 style={ { margin: "0 .5rem" } }>Create water project</h4></legend>
                        <hr />
                        <div className="registration__section" id="registration__section">
                            <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={ (e) => submitProjectHandler(e) }>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                    <label htmlFor="project_name" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Project name:</label>
                                <input type="text"
                                    className="form__control"
                                        id="project_name"
                                        name="project_name"
                                        placeholder="Proposed project name..."
                                        value={projectName}
                                        onChange={e => setProjectName(e.target.value)}
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                    <label htmlFor="project_number" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Project number:</label>
                                <input type="text"
                                    className="form__control"
                                        id="project_number"
                                        name="project_number"
                                        placeholder="Project number..."
                                        value={projectNumber}
                                        onChange={e => setProjectNumber(e.target.value)}
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="company" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Company:</label>
                                <input type="text"
                                    className="form__control"
                                    id="contracting_comppany"
                                    name="contracting_comppany"
                                        placeholder="Contracting company..."
                                        value={company}
                                        onChange={e => setCompany(e.target.value)}
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="contractor" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Contractor:</label>
                                <input type="text"
                                    className="form__control"
                                    id="name_of_contractor"
                                    name="name_of_contractor"
                                        placeholder="Name of contractor..."
                                        value={contractor}
                                        onChange={e => setContractor(e.target.value)}
                                />
                                </div>
                                <div className="form__group project_dates" id="form_group" style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="commence" style={{margin:"0 1.8rem 0 0", width: "8rem"}}>Commennce:</label>
                                    <input type="date"
                                    className="form__control"
                                    id="commence_date"
                                    name="commence_date"
                                        value={commencement}
                                        onChange={e => setCommencement(e.target.value)}
                                    />
                                    <label htmlFor="completion"style={{margin:"0 .5rem", width: "8rem"}}>Completion:</label>
                                <input type="date"
                                    className="form__control"
                                    id="completion_date"
                                        name="completion_date"
                                        value={completion}
                                        onChange={e => setCompletion(e.target.value)}
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="location" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Location:</label>
                                <input type="text"
                                    className="form__control"
                                    id="location"
                                    name="location"
                                        placeholder="Project location..."
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="budget" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Budget:</label>
                                <input type="text"
                                    className="form__control"
                                    id="budget"
                                    name="budget"
                                        placeholder="Project budget..."
                                        value={budget}
                                        onChange={e => setBudget(e.target.value)}
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="approved_by" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Approval:</label>
                                <input type="text"
                                    className="form__control"
                                    id="approved_by"
                                    name="approved_by"
                                        placeholder="Approved by..."
                                        value={approval}
                                        onChange= {e => setApproval(e.target.value)}
                                />
                            </div>
                                <hr />
                                <div className="form__group" id="form_group--footer">
                                    <input type="submit" className="btn btn__submit" value="Submit" />
                                    <input type="button" className="btn btn__close" value="Cancel" onClick={() => { clearInput(); modalRefProject.current.closeModal() }} />
                                </div>
                            </form>
                        </div>
                    </fieldset>
                </Modal>

                <Modal ref={modalRefEdit}>
                <fieldset>
                    <legend style={{ textAlign: "center" }}><h4 style={{ margin: "0 .5rem" }}>Edit project</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={(e, id) => submitEditHandler(e, id)}>
                             <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="company" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Company:</label>
                                <input type="text"
                                    className="form__control"
                                    id="contracting_comppany"
                                    name="contracting_comppany"
                                        placeholder="Edit Contracting company..."
                                        value={company}
                                        onChange={e => setCompany(e.target.value)}
                                />
                            </div>
                                <div className="form__group" id="form_group"style={{display:"flex", flexDirection: "row", justifyContent:"space-around"}}>
                                <label htmlFor="contractor" style={{margin:"0 .5rem 0 0", width: "8rem"}}>Contractor:</label>
                                <input type="text"
                                    className="form__control"
                                    id="name_of_contractor"
                                    name="name_of_contractor"
                                        placeholder="Edit Name of contractor..."
                                        value={contractor}
                                        onChange={e => setContractor(e.target.value)}
                                />
                                </div>
                                <div className="form__group" id="form_group--footer">
                                <input type="submit" className="btn btn__submit" value="Submit" />
                                <input type="button" className="btn btn__close" value="Cancel" onClick={() => { clearInput(); modalRefEdit.current.closeModal() }} />
                            </div>
                        </form>
                    </div>
                </fieldset>
            </Modal>
            </section>
            {/* </div> */}
        </div>
    );
}


export default Projects;
