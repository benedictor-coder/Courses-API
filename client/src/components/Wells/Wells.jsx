import React, { useState, useEffect } from 'react';
import Table from '../table/TableComponent';
import Modal from '../modal/Modal'
import PropTypes from 'prop-types';
// import './PostData.css';
// import Modal from '../modal/Modal';
import Select from '../select/Select';

function Wells () {
  //post data workings
  const [ waterSource, setWaterSource ] = useState('');
  const [region, setRegion] = useState('');
  const [cost, setCost] = useState('');
  const [approval, setApproval] = useState('');
  const [county, setCounty] = useState('');
  const [sub_county, setSubcounty] = useState('');
  const [date, setDate] = useState('');
  const [ward, setWard] = useState('');
  const [location, setLocation] = useState('');
  const propTypes = {
      waterSource: PropTypes.string,
      region: PropTypes.string,
      cost: PropTypes.number,
      approval: PropTypes.string,
      county: PropTypes.string,
      sub_county: PropTypes.string,
      ward: PropTypes.string,
      location: PropTypes.string,
  }
  const mountData = React.useRef(false);

  const onchangeCourse = (e) => {
      setWaterSource(e.target.value)
      console.log({ [ e.target.name ]: waterSource })
  }
  const onchangeDuration = (e) => {
      setRegion(e.target.value)
      console.log({ [ e.target.name ]: region })
  }

  const onchangeTuition = (e) => {
      setCost(e.target.value);
      console.log({ [e.target.name]: cost })
  }
  const onchangeApproval = (e) => {
      setApproval(e.target.value)
      console.log({ [e.target.name]: approval })
  }
  const onchangeSchool = (e) => {
      setCounty(e.target.value)
      console.log({ [e.target.name]: county })
  }
  const onchangeDepartment = (e) => {
      setSubcounty(e.target.value)
      console.log({ [e.target.name]: sub_county })
  }
  const onchangeDate = (e) => {
      e.target.toString()
      setDate(e.target.value)
      console.log({[e.target.name]: date})
  }
  const onchangeCampus = (e) => {
      setLocation(e.target.value);
      console.log({ [e.target.name]: location})
  }
  const onchangeIntake = (e) => {
      setWard(e.target.value);
      console.log({[e.target.name]: ward})
  }

  const clearInput = () => {
      if (!mountData.current) {
          setWaterSource("")
          setRegion("")
          setApproval("")
          setSubcounty("")
          setCounty("")
          setCost("")
          setDate("")
          setWard("")
          setLocation("")
      }
      return () => mountData.current = true;
  }

  const modalRef = React.useRef();

  function handleModal() {
      !mountData.current ?
      modalRef.current.openModal() :
      modalRef.current.closeModal()
  }

  function validateInput() {
      if (!waterSource || !region || !cost || !approval || !county || !sub_county || !date || !ward || !location) {
          alert("Fill in the required fields");
          return;
      }
      if (!Number(cost) && !Number.isInteger(cost) && !propTypes.cost) {
          //polyfill for pre-es6
          Number.isInteger = function (num) {
              return typeof num == 'number' && num === Number(cost).toFixed(2);
          }
          alert("Tuition must be a number!!");
          return;
      }
      if (Number(source) && !propTypes.source) {
          alert("Course name has to be string")
          return;
      }
      if (Number(region) && !propTypes.region) {
          alert("region name has to be string")
          return;
      }
      if (Number(county) && !propTypes.county) {
          alert("county se name has to be string")
          return;
      }
      if (Number(sub_county) && !propTypes.sub_county) {
          alert("sub_county name has to be string")
          return;
      }
      if (Number(ward) && !propTypes.ward) {
          alert("select ward for the source")
          return;
      }
      if (Number(location) && !propTypes.location) {
          alert("select location")
          return;
      }
      clearInput()
      modalRef.current.openModal()
  }

  let data = {
      "source": waterSource,
      "region": region,
      "cost": cost,
      "approval": approval,
      "county": county,
      "sub_county": sub_county,
      "date": date,
      "ward": ward,
      "location": location
  }

  let url = '/water-management/api/v1';

  let requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  }

  async function setUsers () {
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


  const submitHandler = (e) => {
          e.preventDefault();

          validateInput()
          setUsers();
          modalRef.current.closeModal()
          console.log(data)
  }
  const locationOptions = [
      'kitalale',
      'matisi',
      'tuwan',
      'milimani'
  ]
  //end post data modal workings

  //Water sources workings
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState({});
    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [query, setQuery] = useState("");
    const [searchColumns, setSearchColumns] = useState(["source", "county"]);

    // useEffect(() => {
    //     setPageLoading(true);

    //     async function fetchData () {
    //         await fetch('/water-management/api/v1', {
    //             method: 'GET', headers: new Headers()
    //         })
    //             .then(response => response.ok ? response.json() : null)
    //             .then(sources => {
    //                 setSources(sources);
    //                 console.log(sources)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 setErrorMsg(`Could not load data from the server...`)
    //             });

    //         return function cleanEffect () {
    //             setSources(sources =>  sources)
    //         };
    //     }

    //     fetchData();

    //     return () => setPageLoading(false)
    //         // return pageloading;

    // }, [setSources,pageloading]);

    // const mountData = React.useRef(false);
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
            <h1 className="heading-tertiary">Wells</h1>
            <div className='table-section'>
                <div className="add__data add_water_source">
                    <input type="button" className="btn btn__add" onClick={ handleModal } value="Add water well"/>
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
                                List of water bore holes
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
            <div className="posts-section">
                <Modal ref={modalRef}>
                    <fieldset>
                        <legend style={ { textAlign: "center"} }><h4 style={ { margin: "0 .5rem" } }>Register water source</h4></legend>
                    {/* <hr /> */}
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={(e) => submitHandler(e)}>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="source" name="source"
                                    inputMode="text"
                                    placeholder="Enter water source name..."
                                    value={waterSource}
                                    onChange={(e) => onchangeCourse(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="region"
                                    name="region"
                                    inputMode="text"
                                    placeholder="Region..."
                                    value={region}
                                    onChange={(e) => onchangeDuration(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="cost"
                                    name="cost"
                                    inputMode="numeric"
                                    placeholder="Cost of water..."
                                    value={cost}
                                    onChange={(e) => onchangeTuition(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="approval"
                                    name="approval"
                                    inputMode="text"
                                    placeholder="Approval( i.e by NEEMA )..."
                                    value={approval}
                                    onChange={(e) => onchangeApproval(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="county"
                                    name="county"
                                    inputMode="text"
                                    placeholder="County..."
                                    value={county}
                                    onChange={(e) => onchangeSchool(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="sub_county"
                                    name="sub_county"
                                    inputMode="text"
                                    placeholder="Sub-county..."
                                    value={sub_county}
                                    onChange={(e) => onchangeDepartment(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="datetime-local"
                                    className="form__control"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={(e) => onchangeDate(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="intakes"
                                    name="ward"
                                    inputMode="text"
                                    placeholder="--select ward--"
                                    value={ward}
                                    onChange={
                                        (e) => onchangeIntake(e)
                                    }
                                    />
                                <datalist id="intakes" >
                                    <option value="Kiminini"></option>
                                    <option value="Matisi"></option>
                                    <option value="Hospital"></option>
                                </datalist>
                            </div>
                            <div className="form__group" id="form_group">
                                <Select
                                    className='form__control'
                                    id="location"
                                    name="location"
                                    value={ location }
                                    onChange={ e => onchangeCampus(e) }
                                    >
                                    <option defaultValue value="default">--select location--</option>
                                    { locationOptions.map((campusName, index) => {
                                        return <option value={ campusName } key={ index + 1}> { campusName } </option>
                                        })
                                    }
                                </Select>
                                </div>
                                 <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="water_level"
                                    name="water_level"
                                    inputMode="text"
                                    placeholder="-- water level --"
                                    // value={ward}
                                    // onChange={
                                    //     (e) => onchangeIntake(e)
                                    // }
                                    />
                                <datalist id="water_level" >
                                    <option value="Above Normal"></option>
                                    <option value="Normal"></option>
                                    <option value="Below Normal"></option>
                                </datalist>
                                </div>
                                 <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="pH"
                                    name="pH"
                                    inputMode="text"
                                    placeholder="-- water purity & pH level --"
                                    // value={ward}
                                    // onChange={
                                    //     (e) => onchangeIntake(e)
                                    // }
                                    />
                                <datalist id="pH" >
                                    <option value="0 - 6.0 acidic pH"></option>
                                    <option value="7.0 neutral pH"></option>
                                    <option value="8.0 - 14.0 alkaline pH"></option>
                                </datalist>
                            </div>
                            <hr />
                            <div className="form__group" id="form_group--footer">
                                <input
                                    type="submit"
                                    className="btn btn__submit"
                                    value="Register"
                                />
                                <input
                                    type="button"
                                    className="btn btn__close"
                                    value="Close"
                                    onClick={() => modalRef.current.closeModal()}
                                />
                            </div>
                        </form>
                        </div>
                    </fieldset>
                </Modal>
                {/* <button type="button" className="btn btn__add" onClick={ handleModal }> Add Data </button> */}
            </div>
        </div>
    )
}

export default Wells;
