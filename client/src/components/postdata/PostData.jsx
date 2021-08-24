import React, {useState }from 'react';
import './PostData.css';
import Modal from '../modal/Modal';
import Select from '../select/Select';

function PostData () {
    const [ course, setCourse ] = useState('');
    const [duration, setDuration] = useState('');
    const [tuition, setTuition] = useState('');
    const [approval, setApproval] = useState('');
    const [school, setSchool] = useState('');
    const [department, setDepartment] = useState('');
    const [date, setDate] = useState('');
    const [intake, setIntake] = useState('');
    const [campus, setCampus] = useState('');

    const mountData = React.useRef(false);

    const onchangeCourse = (e) => {
        setCourse(e.target.value)
        console.log({ [ e.target.name ]: course })
    }
    const onchangeDuration = (e) => {
        setDuration(e.target.value)
        console.log({ [ e.target.name ]: duration })
    }

    const onchangeTuition = (e) => {
        setTuition(e.target.value);
        console.log({ [e.target.name]: tuition })
    }
    const onchangeApproval = (e) => {
        setApproval(e.target.value)
        console.log({ [e.target.name]: approval })
    }
    const onchangeSchool = (e) => {
        setSchool(e.target.value)
        console.log({ [e.target.name]: school })
    }
    const onchangeDepartment = (e) => {
        setDepartment(e.target.value)
        console.log({ [e.target.name]: department })
    }
    const onchangeDate = (e) => {
        setDate(e.target.value)
        console.log({[e.target.name]: date})
    }
    const onchangeCampus = (e) => {
        setCampus(e.target.value);
        console.log({ [e.target.name]: campus})
    }
    const onchangeIntake = (e) => {
        setIntake(e.target.value);
        console.log({[e.target.name]: intake})
    }
    const clearInput = () => {
            if (!mountData.current) {
                setCourse("")
                setDuration("")
                setApproval("")
                setDepartment("")
                setSchool("")
                setTuition("")
                setDate("")
                setIntake("")
                setCampus("")
            }
            return () => mountData.current = true;
        }
    const modalRef = React.useRef();

        function handleModal() {
            !mountData.current ?
                modalRef.current.openModal() :
                modalRef.current.closeModal()
        }
    function validateInput () {
        if (!course || !duration || !tuition || !approval || !school || !department || !date || !intake || !campus) {
                alert("Fill in the required fields")
            }
        clearInput()
        modalRef.current.openModal()
    }
    
    let data = {
        "course": course,
        "duration": duration,
        "tuition": tuition,
        "approval": approval,
        "school": school,
        "department": department,
        "date": date,
        "intake": intake,
        "campus": campus
    }
    let url = '/posts';

    let requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    // useEffect(() => {
        
    // },[])
    async function setUsers () {
        await fetch(url, requestOptions, { withCredentials: true })
            .then(async (response) => {
                try {
                    await response.json()
                } catch (error) {
                    console.log("Error occured here!")
                    console.error(error)
                }
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    
    const submitHandler = (e) => {
            e.preventDefault();

            validateInput()
            setUsers();
            modalRef.current.closeModal()
            console.log(data)
    }
    const options = [
        'kitale',
        'kigali',
        'nakuru',
        'nairobi'
    ]
    return (
        <div className="posts-section">
            <Modal ref={modalRef}>
                <fieldset>
                    <legend style={ { textAlign: "center"} }><h4 style={ { margin: "0 .5rem" } }>Register course</h4></legend>
                <hr />
                <div className="registration__section" id="registration__section">
                    <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={(e) => submitHandler(e)}>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="course" name="course"
                                placeholder="Enter course name..."
                                value={course}
                                onChange={(e) => onchangeCourse(e)}
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="duration"
                                name="duration"
                                placeholder="Course duration..."
                                value={duration}
                                onChange={(e) => onchangeDuration(e)}
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="tuition"
                                name="tuition"
                                placeholder="Course tuition..."
                                value={tuition}
                                onChange={(e) => onchangeTuition(e)}
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="approval"
                                name="approval"
                                placeholder="Approval..."
                                value={approval}
                                onChange={(e) => onchangeApproval(e)}
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="school"
                                name="school"
                                placeholder="School for the course..."
                                value={school}
                                onChange={(e) => onchangeSchool(e)}
                            />
                        </div>
                        <div className="form__group" id="form_group">
                            <input type="text"
                                className="form__control"
                                id="department"
                                name="department"
                                placeholder="Course department..."
                                value={department}
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
                                className="form__control"
                                list="intakes"
                                name="intake"
                                placeholder="--select intake--"
                                value={intake}
                                onChange={
                                    (e) => onchangeIntake(e)
                                }
                                />
                            <datalist id="intakes" >
                                <option value="january"></option>
                                <option value="may"></option>
                                <option value="september"></option>
                            </datalist>
                        </div>
                        <div className="form__group" id="form_group">
                            <Select
                                className='form__control'
                                id="campus"
                                name="campus"
                                value={ campus }
                                onChange={ e => onchangeCampus(e) }
                                >
                                <option defaultValue value="default">--select campus--</option>*/
                                { options.map((option, index) => {
                                    return <option value={ option } key={ index }> { option } </option>
                                    })
                                }
                                </Select>
                        </div>
                        <hr />
                        <div className="form__group" id="form_group--footer">
                            <input type="submit" className="btn btn__submit" value="Register" />
                            <input type="button" className="btn btn__close" value="Close" onClick={() => modalRef.current.closeModal()}/>
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