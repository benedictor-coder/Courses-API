import React, {useState }from 'react';
import PropTypes from 'prop-types';
import './PostData.css';
import Modal from '../modal/Modal';
import Select from '../select/Select';

function PostData() {
    const [ source, setSource ] = useState('');
    const [region, setRegion] = useState('');
    const [cost, setCost] = useState('');
    const [approval, setApproval] = useState('');
    const [county, setCounty] = useState('');
    const [sub_county, setSubcounty] = useState('');
    const [date, setDate] = useState('');
    const [ward, setWard] = useState('');
    const [location, setLocation] = useState('');
    const propTypes = {
        source: PropTypes.string,
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
        setSource(e.target.value)
        console.log({ [ e.target.name ]: source })
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
            setSource("")
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
        if (!source || !region || !cost || !approval || !county || !sub_county || !date || !ward || !location) {
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
        "source": source,
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
    return (
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
                                value={source}
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
            <button type="button" className="btn btn__add" onClick={ handleModal }> Add Data </button>
        </div>
    )
}

export default PostData;
