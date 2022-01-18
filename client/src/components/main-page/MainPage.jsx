import React, { useState, useEffect, useCallback } from 'react';
import Table from '../table/TableComponent';
import './MainPage.css';
import Modal from '../modal/Modal'
import PropTypes from 'prop-types';
import Select from '../select/Select';
function MainPage() {
    //post data workings
    const [waterSource, setWaterSource] = useState('');
    const [source_type, setSourceType] = useState('');
    const [ph, setpH] = useState('');
    const [water_level, setWaterLevel] = useState('');
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
        source_type: PropTypes.string,
        region: PropTypes.string,
        cost: PropTypes.number,
        approval: PropTypes.string,
        county: PropTypes.string,
        sub_county: PropTypes.string,
        ward: PropTypes.string,
        location: PropTypes.string,
        ph: PropTypes.string,
        water_level: PropTypes.string
    }
    //Water sources table information
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState({});
    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [query, setQuery] = useState("");
    const [rows, setRows] = useState([])
    const [searchColumns, setSearchColumns] = useState(["source", "county"]);


    

    const onchangeSourse = (e) => {
        setWaterSource(e.target.value)
        console.log({ [e.target.name]: waterSource })
    }
    const waterSourceType = (e) => {
        setSourceType(e.target.value)
        console.log({ [e.target.name]: source_type })
    }

    const onchangepH = (e) => {
        setpH(e.target.value)
        console.log({ [e.target.name]: ph })
    }

    const onchangeWaterLevel = (e) => {
        setWaterLevel(e.target.value)
        console.log({ [e.target.name]: water_level })
    }

    const onchangeRegion = (e) => {
        setRegion(e.target.value)
        console.log({ [e.target.name]: region })
    }

    const onchangeCost = (e) => {
        setCost(e.target.value);
        console.log({ [e.target.name]: cost })
    }
    const onchangeApproval = (e) => {
        setApproval(e.target.value)
        console.log({ [e.target.name]: approval })
    }
    const onchangeCounty = (e) => {
        setCounty(e.target.value)
        console.log({ [e.target.name]: county })
    }
    const onchangeSubcounty = (e) => {
        setSubcounty(e.target.value)
        console.log({ [e.target.name]: sub_county })
    }
    const onchangeDate = (e) => {
        e.target.toString()
        setDate(e.target.value)
        console.log({ [e.target.name]: date })
    }
    const onchangeLocation = (e) => {
        setLocation(e.target.value);
        console.log({ [e.target.name]: location })
    }
    const onchangeWard = (e) => {
        setWard(e.target.value);
        console.log({ [e.target.name]: ward })
    }

    const clearInput = () => {
        if (!mountData.current) {
            setWaterSource("")
            setSourceType("")
            setRegion("")
            setApproval("")
            setSubcounty("")
            setCounty("")
            setCost("")
            setDate("")
            setWard("")
            setLocation("")
            setWaterLevel("")
            setpH("")
        }
        return () => mountData.current = true;
    }

    const mountData = React.useRef(false);
    const modalRef = React.useRef();

    function handleModal() {
        !mountData.current ?
            modalRef.current.openModal() :
            modalRef.current.closeModal()
    }

    function validateInput() {
        if (!waterSource || !source_type || !region || !cost || !approval || !county || !sub_county || !date || !ward || !location || water_level || !ph) {
            alert("Fill in the required fields");
            return;
        }
        if (!Number(cost) && !Number.isInteger(cost) && !propTypes.cost) {
            //polyfill for pre-es6
            Number.isInteger = function (num) {
                return typeof num == 'number' && num === Number(cost).toFixed(2);
            }
            alert("Water cost must be a number!!");
            return;
        }
        if (Number(source) && !propTypes.source) {
            alert("Water source name has to be string")
            return;
        }
        if (Number(source_type) && !propTypes.source_type) {
            alert("Source type has to be string")
            return;
        }
        if (Number(region) && !propTypes.region) {
            alert("Region name has to be string")
            return;
        }
        if (Number(county) && !propTypes.county) {
            alert("County se name has to be string")
            return;
        }
        if (Number(sub_county) && !propTypes.sub_county) {
            alert("Sub_county name has to be string")
            return;
        }
        if (Number(ward) && !propTypes.ward) {
            alert("Select ward for the source")
            return;
        }
        if (Number(location) && !propTypes.location) {
            alert("Select location")
            return;
        }
        if (Number(water_level) && !propTypes.water_level) {
            alert("Select water level")
            return;
        }
        if (Number(ph) && !propTypes.ph) {
            alert("Select pH for the source")
            return;
        }
        // clearInput()
        modalRef.current.openModal()
    }

    let data = {
        "source": waterSource,
        "source_type": source_type,
        "region": region,
        "cost": cost,
        "approval": approval,
        "county": county,
        "sub_county": sub_county,
        "date": date,
        "ward": ward,
        "location": location,
        "water_level": water_level,
        "ph": ph
    }

    let url = "/water-management-sources/api/v1";

    let requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    async function createWaterSource() {
        await fetch(url, requestOptions, { withCredentials: true })
            .then((res) =>res.ok && res.status === 200 ? res.json() : console.log('Bad request. Check your data.', res.status))
            // .then((res) => {
            //     setSources(sources)
            // })
            .catch(error => {
                console.log(error)
                throw new Error("An error has occurred", error)
            })
    }

    const submitHandler = (e) => {
        e.preventDefault();
            createWaterSource();
            clearInput()
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

    // Fetch all water source data from db
    async function fetchData() {
            await fetch('/water-management-sources/api/v1', {
                method: 'GET', headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }||new Headers()
            })
                .then(response => response.ok && response.status === 200 ? response.json() : `Server error: ${response.status}`)
                .then((data) => {
                    setSources(data);
                    setErrorMsg(null)
                    console.log(data)
                })
                .catch(err => {
                    setErrorMsg(`Could not load data from the server...`)
                    setSources(null)
                    console.log(err.message)
                })
                .finally(() => {
                    setPageLoading(true)
                })

            return function cleanEffect() {
                setSources(sources => sources)
            };
        }
    useEffect(() => {
        setPageLoading(true);
        
        fetchData();

        return () => setPageLoading(false)

    }, []);

    const modalRefEdit = React.useRef();
    const modalRefSampling = React.useRef();
    const modalRefAnalysis = React.useRef()

    function handleModalEdit() {
        !mountData.current ?
            modalRefEdit.current.openModal() :
            modalRefEdit.current.closeModal()
    }

    function handleEditSource(id) {
        
        const { _id } = sources[0];
        id = _id
        // const list = sources.map((source, index) => {
        //     return source
        // })
        
        // const index = list.indexOf()
        
        // list.splice(index, 1)
        // for (let i = 0; i < list.length; i++) {
        //     if(list) {
        //         list.splice(i, 1)
        //     }
        // }
        // const list = [...rows]
        // list.splice(id, 1)
        // setRows(list)
        // console.log(list)
        

        if (id) {
            alert(`Source with id: ${id} will be edited`)
            fetch(`/water-management-sources/api/v1/source/${id}`,  {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } || new Headers()
            })
                .then(res => res.ok ? res.json() : console.error(`Bad request: ${res.status}`))
                .then(source => {
                    // setSource(source)
                    // setErrorMsg(null)
                    console.log(source)
                })
                .catch(err => {
                    console.log('There was an error getting source\n', err.message)
                    setPageLoading(false)
                })
        }
    }

    
    const submitEditHandler = (e, id) => {
        e.preventDefault();
        handleEditSource(id);

        modalRefEdit.current.closeModal();
    }
    function handleModalView() {
        !mountData.current ?
            modalRefSampling.current.openModal() :
            modalRefSampling.current.closeModal();
    }

    async function handleViewDetails() {
        // let {_id } = sources[0];
        // let id = _id;
        let id = sources.map((source) =>{ return source._id} )
        // console.log(id)
        if (sources.length > 1) {
            alert(id)
            await fetch(`/water-management-sources/api/v1`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } || new Headers()
            })
                .then(response => response.ok ? response.json({}) : `Bad request: ${response.status}`)
                .then(sources => {
                    setSource(sources[0]);
                    setErrorMsg(null)
                    console.log(sources)
                })
                .catch(err => {
                    console.log('The source with the specified id does not exist')
                    console.log(err)
                })
        }

        handleModalView()
    }
    const handleDelete = useCallback(async (id) => {
        const { _id } = sources[0]
        console.log(_id)
        id = _id;

        if (id) {
            window.confirm(`WARNING!!\n\nItem will be deleted.`);
            await fetch(`/water-management-sources/api/v1/source/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } || new Headers()
            })
                .then(res => res.ok ? res.json(): console.error(`Not found: ${res.status}`))
                .then(data => {
                    setSources(data)
                })
                .catch((err) => {
                    console.log("Error on deletion.")
                    console.error(err.message)
            })
        }

        fetchData()
        // return window.location.reload()
    }, [sources])

    function handleModalSampling() {
        !mountData.current ?
            modalRefSampling.current.openModal() :
            modalRefSampling.current.closeModal();
    }
    const [siteCode, setSiteCode] = useState('')
    const [typeOfSource, setTypeOfSource] = useState('')
    const [sampleDate, setSampleDate] = useState('')
    const [waterClarity, setWaterClarity] = useState('')
    const [facility, setFacility] = useState('')
    const [senderNo, setSenderNo] = useState('')
    const [temperature, setTemperature] = useState('')
    const [thePh, setThePh] = useState('')
    const [sampleNo, setSampleNo] = useState('')

    const handleSampling = async (e) => {
        e.preventDefault()
        const sampleData = {
            "site_code": siteCode,
            "type_source": typeOfSource,
            "sample_date": sampleDate,
            "water_clarity": waterClarity,
            "facility": facility,
            "sender_no": senderNo,
            "water_temperature": temperature,
            "the_ph": thePh,
            "sample_no": sampleNo
        }
        await fetch(`/water-management-sampling/api/v1/sampling`, {
            method:"POSt",
            body: JSON.stringify(sampleData),
            headers: {
                "Accept": "applicationi/json",
                "Content-Type": "application/json"
            } || new Headers()
        }).then(res => res.ok && res.status === 200? res.json() : console.error(`Bad request: ${res.status}`))
            .catch(err => {
            console.log("There was an error sending data \n",err )
        })
    }

    function handleModalAnalysis() {
        !mountData.current ?
            modalRefAnalysis.current.openModal() :
            modalRefAnalysis.current.closeModal()
    }
    const [hardness, setHardness] = useState('')
    const [submittedBy, setSubmittedBy] = useState('')
    const [dateReceived, setDateReceived] = useState('')
    const [chloride, setChloride] = useState('')
    const [turbidity, setTurbidity] = useState('')
    const [fluoride, setFluoride] = useState('')
    const [iron, setIron] = useState('')

    const handleAnalysis = async (e) => {
        e.preventDefault()
        const analysisData = {
            "hardness": hardness,
            "submitted_by":submittedBy,
            "date_received": dateReceived,
            "chloride": chloride,
            "turbidity":turbidity,
            "fluoride": fluoride,
            "iron": iron
        }

        await fetch(`/water-management-analysis/api/v1/analysis`, {
            method: "POST",
            body: JSON.stringify(analysisData),
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            } || new Headers()
        })
        .then(res => res.ok? res.json() : console.log(`Bad request: ${res.status}`))
        .catch(err => {
            console.error("Could not create Analysis data\n", err)
        })
    }
    const getSource = sources.length > 0 ?
        sources && sources.map((source, index) => {
            return <div className="col-1-of-4" key={index + 1}>
                {sources.length }
                <div className="feature-box meetings_lists">
                    <div key={source._id}>
                        <h3 className="meeting-title">{source.source}</h3>
                        <div className="meeting_essentials">
                            <ul key={source._id}>
                                <li> ID: {source._id}</li>
                                <li>Cost of water: {source.cost}</li>
                                <li>Approved by:{source.approval}</li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
        }) : <div className="feature-box"><h4 style={{ color: "white" }}>No water sources available.</h4></div>

    // if (sources === []) {
    //     return <p className="heading-secondary">Loading list of water sources...</p>
    // }

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
                    <input type="button" className="btn btn__add" onClick={handleModal} value="Add water source" />
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
                                            setSearchColumns(prev => checked ? prev.filter(sc => sc !== column) : [...prev, column])
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
                        <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                            <input type="button" onClick={() => handleModalSampling()} className="btn btn-view btn__unlock--user" value="Sampling" />
                            <input type="button" onClick={() => handleModalAnalysis()} className="btn btn-view btn__lock--user" value="Analysis" />
                            <input type="submit" onClick={() => handleModalEdit()} className="btn btn-edit" value="Edit" />
                            {/* <input type="button" onClick={() => handleViewDetails()} className="btn btn-view" value="View" /> */}
                            <input type="button" className="btn btn-delete" onClick={(e, id) => handleDelete(id)} value="Delete" />
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
                    errorMsg ? <div><h6 className="heading-primary">{errorMsg}</h6></div> : null
                }
            </div>
            {/* Edit water sources details */}
            <Modal ref={modalRefEdit}>
                <fieldset>
                    <legend style={{ textAlign: "center" }}><h4 style={{ margin: "0 .5rem" }}>Edit water source</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={(e, id) => submitEditHandler(e, id)}>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="source" name="source"
                                    inputMode="text"
                                    placeholder="Edit source name..."
                                    value={waterSource}
                                    onChange={(e) => onchangeSourse(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="cost"
                                    name="cost"
                                    inputMode="numeric"
                                    placeholder="Edit cost of water..."
                                    value={cost}
                                    onChange={(e) => onchangeCost(e)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="water_level"
                                    name="water_level"
                                    inputMode="text"
                                    placeholder=" Edit water level "
                                    value={water_level}
                                    onChange={
                                        (e) => onchangeWaterLevel(e)
                                    }
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
                                    list="ph"
                                    name="ph"
                                    inputMode="text"
                                    placeholder="Edit water purity & pH level "
                                    value={ph}
                                    onChange={
                                        (e) => onchangepH(e)
                                    }
                                />
                                <datalist id="ph" >
                                    <option value="0 - 6.0 acidic pH"></option>
                                    <option value="7.0 neutral pH"></option>
                                    <option value="8.0 - 14.0 alkaline pH"></option>
                                </datalist>
                            </div>
                            <hr />
                            <div className="form__group" id="form_group--footer">
                                <input type="submit" className="btn btn__submit" value="Submit" />
                                <input type="button" className="btn btn__close" value="Cancel" onClick={() => { clearInput(); modalRefEdit.current.closeModal() }} />
                            </div>
                        </form>
                    </div>
                </fieldset>
            </Modal>
            {/* End of editing water sources  */}

            {/* Creating Sampling data for water source */}
            <Modal ref={modalRefSampling}>
                 <fieldset>
                    <legend style={{ textAlign: "center" }}><h4 style={{ margin: "0 .5rem" }}>Sampling data for source</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={e => handleSampling(e)}>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="type_source" name="type_source"
                                    inputMode="text"
                                    placeholder="Select water source type..."
                                    value={typeOfSource}
                                    onChange={(e) => setTypeOfSource(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="site_code"
                                    name="site_code"
                                    inputMode="text"
                                    placeholder="Enter site code..."
                                    value={siteCode}
                                    onChange={(e) => setSiteCode(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="sample_no"
                                    name="sample_no"
                                    inputMode="text"
                                    placeholder="Enter sample number..."
                                    value={sampleNo}
                                    onChange={(e) => setSampleNo(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="sender_no"
                                    name="sender_no"
                                    inputMode="text"
                                    placeholder="Enter sender number..."
                                    value={senderNo}
                                    onChange={(e) => setSenderNo(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="facility"
                                    name="facility"
                                    inputMode="text"
                                    placeholder="Enter facility..."
                                    value={facility}
                                    onChange={(e) => setFacility(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="datetime-local"
                                    className="form__control"
                                    id="sample_date"
                                    name="sample_date"
                                    // inputMode="date"
                                    // placeholder="Enter sender number..."
                                    value={sampleDate}
                                    onChange={(e) => setSampleDate(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="water_clarity"
                                    name="water_clarity"
                                    inputMode="text"
                                    placeholder="Enter water clarity... e.g leaves, algae, debries, muddy, clear"
                                    value={waterClarity}
                                    onChange={(e) => setWaterClarity(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="temperature"
                                    name="water_temperature"
                                    id="water_temperature"
                                    inputMode="text"
                                    placeholder=" Enter temperature levels"
                                    value={temperature}
                                    onChange={
                                        (e) => setTemperature(e.target.value)
                                    }
                                />
                                <datalist id="temperature" >
                                    <option value="Above Normal"></option>
                                    <option value="Normal"></option>
                                    <option value="Below Normal"></option>
                                </datalist>
                            </div>
                            <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="the_ph"
                                    name="the_ph"
                                    // id="the_ph"
                                    inputMode="text"
                                    placeholder="Edit water purity & pH level "
                                    value={thePh}
                                    onChange={
                                        (e) => setThePh(e.target.value)
                                    }
                                />
                                <datalist id="the_ph" >
                                    <option value="0 - 6.0 acidic pH"></option>
                                    <option value="7.0 neutral pH"></option>
                                    <option value="8.0 - 14.0 alkaline pH"></option>
                                </datalist>
                            </div>
                            <hr />
                            <div className="form__group" id="form_group--footer">
                                <input type="submit" className="btn btn__submit" value="Submit" />
                                <input type="button" className="btn btn__close" value="Cancel" onClick={() => { clearInput(); modalRefSampling.current.closeModal() }} />
                            </div>
                        </form>
                    </div>
                </fieldset>
            </Modal>
            {/* End of creating sampling data for water source*/}

            {/* Creating analysis data for water source */}
            <Modal ref={modalRefAnalysis}>
                <fieldset>
                    <legend style={{ textAlign: "center" }}><h4 style={{ margin: "0 .5rem" }}>Analysis data for source</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={e => handleAnalysis(e)}>
                             <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="submitted_by"
                                    name="submitted_by"
                                    inputMode="text"
                                    placeholder="Enter your name.."
                                    value={submittedBy}
                                    onChange={(e) => setSubmittedBy(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="datetime-local"
                                    className="form__control"
                                    id="date_received" name="date_received"
                                    inputMode="date"
                                    // placeholder="enter turbidity..."
                                    value={dateReceived}
                                    onChange={(e) => setDateReceived(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="turbidity"
                                    name="turbidity"
                                    inputMode="text"
                                    placeholder="Enter water turbidity..."
                                    value={turbidity}
                                    onChange={(e) => setTurbidity(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="hardness"
                                    name="hardness"
                                    inputMode="text"
                                    placeholder="Enter hardness..."
                                    value={hardness}
                                    onChange={(e) => setHardness(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="fluoride"
                                    name="fluoride"
                                    inputMode="text"
                                    placeholder="Enter fluoride unit..."
                                    value={fluoride}
                                    onChange={(e) => setFluoride(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="choride"
                                    name="chloride"
                                    inputMode="text"
                                    placeholder="Enter chloride unit..."
                                    value={chloride}
                                    onChange={(e) => setChloride(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="iron"
                                    name="iron"
                                    inputMode="text"
                                    placeholder="Enter water iron unit"
                                    value={iron}
                                    onChange={(e) => setIron(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="temperature"
                                    name="water_temperature"
                                    id="water_temperature"
                                    inputMode="text"
                                    placeholder=" Enter temperature levels"
                                    value={temperature}
                                    onChange={
                                        (e) => setTemperature(e.target.value)
                                    }
                                />
                                <datalist id="temperature" >
                                    <option value="Above Normal"></option>
                                    <option value="Normal"></option>
                                    <option value="Below Normal"></option>
                                </datalist>
                            </div>
                            <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="ph"
                                    name="the_ph"
                                    inputMode="text"
                                    placeholder="Edit water purity & pH level "
                                    value={ph}
                                    onChange={
                                        (e) => onchangepH(e)
                                    }
                                />
                                <datalist id="ph" >
                                    <option value="0 - 6.0 acidic pH"></option>
                                    <option value="7.0 neutral pH"></option>
                                    <option value="8.0 - 14.0 alkaline pH"></option>
                                </datalist>
                            </div>
                            <hr />
                            <div className="form__group" id="form_group--footer">
                                <input type="submit" className="btn btn__submit" value="Submit" />
                                <input type="button" className="btn btn__close" value="Cancel" onClick={() => { clearInput(); modalRefAnalysis.current.closeModal() }} />
                            </div>
                        </form>
                    </div>
                </fieldset>
            </Modal>
            {/* End of creating analysis data for water source */}

            {/* Modal Create water source */}
            <Modal ref={modalRef}>
                {/* <div className="posts-section"> */}
                <fieldset>
                    <legend style={{ textAlign: "center" }}><h4 style={{ margin: "0 .5rem" }}>Register water source</h4></legend>
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
                                    onChange={(e) => onchangeSourse(e)}
                                    required
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input
                                    type="text"
                                    className="form__control"
                                    list="source_type"
                                    name="ward"
                                    inputMode="text"
                                    placeholder="--select water source type--"
                                    value={source_type}
                                    onChange={
                                        (e) => waterSourceType(e)
                                    }
                                    required
                                />
                                <datalist id="source_type" >
                                    <option value="Well water"></option>
                                    <option value="Bore-hole water"></option>
                                    <option value="Piped water"></option>
                                </datalist>
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="region"
                                    name="region"
                                    inputMode="text"
                                    placeholder="Region..."
                                    value={region}
                                    onChange={(e) => onchangeRegion(e)}
                                    required
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
                                    onChange={(e) => onchangeCost(e)}
                                    required
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
                                    required
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
                                    onChange={(e) => onchangeCounty(e)}
                                    required
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
                                    onChange={(e) => onchangeSubcounty(e)}
                                    required
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="date"
                                    className="form__control"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={(e) => onchangeDate(e)}
                                    required
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
                                        (e) => onchangeWard(e)
                                    }
                                    required
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
                                    value={location}
                                    onChange={e => onchangeLocation(e)}
                                    required
                                >
                                    <option defaultValue value="default">--select location--</option>
                                    {locationOptions.map((campusName, index) => {
                                        return <option value={campusName} key={index + 1}> {campusName} </option>
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
                                    value={water_level}
                                    onChange={
                                        (e) => onchangeWaterLevel(e)
                                    }
                                    required
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
                                    list="ph"
                                    name="ph"
                                    inputMode="text"
                                    placeholder="-- water purity & pH level --"
                                    value={ph}
                                    onChange={
                                        (e) => onchangepH(e)
                                    }
                                    required
                                />
                                <datalist id="ph" >
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
                                    onClick={() => { clearInput(); modalRef.current.closeModal() }}
                                />
                            </div>
                        </form>
                    </div>
                </fieldset>
                {/* <button type="button" className="btn btn__add" onClick={ handleModal }> Add Data </button> */}
                {/* </div> */}
            </Modal>
            {/* End of creating water source modal */}
        </div>
    )
}

export default MainPage;
