import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Modal from '../modal/Modal'
import './Meetings.css';

function Meetings(props) {
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingVenue, setMeetingVenue] = useState('');
    const [startingTime, setStartingTime] = useState('');
    const [endingTime, setEndingtime] = useState('');
    const [agenda, setAgenda] = useState('');
    const [speaker, setSpeaker] = useState('');
    const [attendance, setAttendance] = useState('');
    const [moderator, setModerator] = useState('');
    const [meetingBreak, setMeetingBreak] = useState('');

    const [pageloading, setPageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [meetings, setMeetings] = useState([])
    const history = useHistory()
    // const handleChange = e => {
    //     const {name, value} = e.target;
    //     setMeeting({...meeting, [name]: value})
    // }
    const clearInputFields = () => {
        setStartingDate("")
        setEndingtime("")
        setEndingDate("")
        setMeetingTitle("")
        setMeetingVenue("")
        setStartingTime("")
        setAgenda("")
        setSpeaker("")
        setAttendance("")
        setModerator("")
        setMeetingBreak("")
        
        return;
    }
 async function fetchData () {
            await fetch('/water-management-meetings/api/v1/meetings', {
                method: 'GET', headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } || new Headers()
            })
                .then(res => res.ok && res.status === 200? res.json() : !res.ok?  () => "Error fetching meetings..." : "NO DATA FOUND.")
                .then(meetings => {
                    setMeetings(meetings);
                    // history.push('/main/meetings')

                    console.log(meetings)
                })
                .catch(err => {
                    console.log(err.message)
                    setErrorMsg(`Could not load data from the server...`)
                })
                .finally(() => {
                    setPageLoading(true)
                })

            return function cleanEffect () {
                setMeetings(meetings =>  meetings)
            };
    }
    useEffect(() => {
        setPageLoading(true)
        fetchData();
        return () => setPageLoading(false)

    }, []);

    let url = '/water-management-meetings/api/v1/meetings';

    let requestData = {
        "start_date": startingDate,
        "end_date": endingDate,
        "meeting_title": meetingTitle,
        "meeting_venue": meetingVenue,
        "starting_time": startingTime,
        "ending_time": endingTime,
        "meeting_agenda": agenda,
        "key_speaker": speaker,
        "expected_attendance": attendance,
        "meeting_moderator": moderator,
        "meeting_break": meetingBreak
    }
    let options = {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }|| new Headers()
    }

    async function postMeetingRequest() {
        await fetch(url, options, { withCredentials: true })
            .then(res =>
                res.ok && res.status === 200 ?
                    res.json({ message: "Success", data: res }) : res.text("POST DATA FAILURE.")
                // alert("Fill meeting details, please.")
                // console.log("Cant submit empty form")
        )
            .then(res => res? history.push('/main/meetings'):null)
            .catch(err => {
            console.error(err, `An Error Occured.Could not post data.`)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        postMeetingRequest()
        clearInputFields()
        return window.location.reload()
    }

    const handleReset = (e) => {
        e.preventDefault()
        clearInputFields()
        // return window.location.reload()
    }

    const editMeeting = async (id) => {
        const editData = {
        "meeting_title": meetingTitle,
        "meeting_venue": meetingVenue,
        "meeting_agenda": agenda,
        "key_speaker": speaker,
        "meeting_moderator": moderator,
        }
        const { _id } = meetings[0]
        id = _id;
        console.log(id)
        await fetch(`/water-management-meetings/api/v1/meeting/${id}`, {
            method: "PATCH",
            body: JSON.stringify(editData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            } || new Headers()
        })
            .then((res) => res.ok && res.status === 200 ? res.json() : console.error(`Bad request: ${res.status}`))
        .catch(error => {
            console.error("Update failed\n", error)
        })
    }

    const handleMeetingUpdate = (e, id) => {
        e.preventDefault()

        editMeeting(id)
        clearInputFields()
    }

    const deleteMeeting = async(id) => {
        const { _id } = meetings[0]
        id = _id

        await fetch(`/water-management-meetings/api/v1/meeting/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            } || new Headers()
        }).then(res => res.ok && res.status === 200 ? res.json(): console.error(`Bad request: ${res.status}`))
            .catch(err => {
            console.error("There was an error\n", err)
        })
    }

    const getMeeting = meetings.length > 0 ?
        meetings.map((meeting, index) => {
            return <div className="col-1-of-4" key={index}>
                <div className="feature-box meetings_lists">
                    <div key={meeting._id}>
                        <h3 className="meeting-title">{meeting.meeting_title}</h3>
                        <div className="meeting_essentials">
                            <ul key={meeting._id}>
                                <li><span>From: {meeting.starting_time} &rarr; To: {meeting.ending_time}</span></li>
                                <li> Venue: {meeting.meeting_venue}</li>
                                <li>Meeting agenda: {meeting.meeting_agenda}</li>
                                <li>Guest speaker: {meeting.key_speaker}</li>
                                <li>Attendance: {meeting.expected_attendance}</li>
                                <li>Moderator: {meeting.meeting_moderator}</li>
                                <li><span>Begins: {meeting.start_date} &rarr; To: {meeting.end_date}</span></li>
                            </ul>
                        </div>
                        <div className="meetings__btns btns--view">   
                            <input type="button" className="btn btn-view btn__review--meeting" onClick={handleModalReview} value="Review meeting" />
                            <input type="button" className="btn btn-delete btn__delete--meeting" value="Delete" onClick={(id) => deleteMeeting(id)}/>
                        </div>
                    </div>
                </div>
            </div>
        }) : <div className="feature-box"><h4 style={{ color: "white" }}>No scheduled meetings available.</h4></div>
    
    const mountData = React.useRef(false);
    const modalRefReview = React.useRef();

    function handleModalReview () {
        !mountData.current ?
        modalRefReview.current.openModal() :
        modalRefReview.current.closeModal()
    }
    return (
        <div className="meetings_section">
            <div className="meeting_sections meetings_section--left">
                <h1 className="heading-tertiary"> Meetings</h1>
                <div className="meeting-content">
                <h4 className="heading-tertiary" style={{ fontSize: "small", textAlign:"center"}}>Organize A Meeting</h4>
                <form action="#" onSubmit={e => handleSubmit(e)}>
                    <div className="form_group">
                        <label htmlFor="start_date">Begins on: </label>
                        <input
                            type="date"
                            className="meeting_form_control start_date"
                            id="start_date"
                            name="start_date"
                            value={startingDate}
                            onChange = {e => setStartingDate(e.target.value)}
                        />
                        <label htmlFor="end_date">Ends on:</label>
                        <input
                            type="date"
                            className="meeting_form_control end_date"
                            id="end_date"
                            name="end_date"
                            value={endingDate}
                            onChange={e => setEndingDate(e.target.value)}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="title_of_meeting">Title of meeting:</label>
                        <input
                            type="text"
                            className="meeting_form_control meeting_title"
                            id="meeting_title"
                            name="meeting_title"
                            placeholder="enter_title"
                            value={meetingTitle}
                            onChange={e => setMeetingTitle(e.target.value)}
                        />
                        <label htmlFor="venue_of_meeting">Venue of meeting:</label>
                        <input
                            type="text"
                            className="meeting_form_control meeting_venue"
                            id="meeting_venue"
                            name="meeting_venue"
                            placeholder="Meeting Venue"
                            value={meetingVenue}
                            onChange={e => setMeetingVenue(e.target.value)}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="starting_time">Starting time:</label>
                        <input
                            type="time"
                            className="meeting_form_control starting_time"
                            id="starting_time"
                            name="starting_time"
                            placeholder="Starts"
                            value={startingTime}
                            onChange ={e => setStartingTime(e.target.value)}
                        />
                        <label htmlFor="ending_time">Ending time:</label>
                        <input
                            type="time"
                            className="meeting_form_control ending_time"
                            id="ending_time"
                            name="ending_time"
                            placeholder="Ends"
                            value={endingTime}
                            onChange={e => setEndingtime(e.target.value)}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="meeting_agenda">Meeting agenda:</label>
                        <input
                            type="text"
                            className="meeting_form_control meeting_agenda"
                            id="meeting_agenda"
                            name="meeting_agenda"
                            placeholder="Meeting_agenda"
                            value={agenda}
                            onChange={e => setAgenda(e.target.value)}
                        />
                        <label htmlFor="invited_guests">Invited guest:</label>
                        <input
                            type="text"
                            className="meeting_form_control meeting_key_speakers"
                            id="key_speaker"
                            name="key_speaker"
                            placeholder="guest/key speakers"
                            value={speaker}
                            onChange={e => setSpeaker(e.target.value)}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="expected_attendance">Expected attendance:</label>
                    <select
                    className="meeting_form_control expected_attendance"
                        id="expected_attendance"
                        name="expected_attendance"
                        value={attendance}
                        onChange={e => setAttendance(e.target.value)}>
                        <option value="attendance" defaultValue>--number of attendees--</option>
                        <option value="10">10</option>
                    </select>
                    <label htmlFor="moderator">Moderator:</label>
                    <input
                        type="text"
                        className="meeting_form_control meeting_moderator"
                        id="meeting_moderator"
                        placeholder="moderator"
                        name="moderator"
                        value={moderator}
                        onChange={e => setModerator(e.target.value)}
                    />
                    <label htmlFor="meeting_breaks">Meeting breaks:</label>
                    <select
                        className="meeting_form_control meeting_breaks"
                        id="meeting_break"
                        name="meeting_break"
                        value={meetingBreak}
                        onChange={e => setMeetingBreak(e.target.value)}
                    >
                        <option value="breaks" defaultValue>--mins/hrs--</option>
                        <option value="10">10 mins</option>
                    </select>
                    </div>
                    <div className="form_group meetings_btns-group">
                    <input type="submit" className="btn btn__add meeting_btns"  value="Submit" />
                    <input type="reset" className="btn btn__cancel meeting_btns"value="Reset" onClick={(e) => handleReset(e)} />
                    </div>
                    </form>
                    </div>
            </div>
            <div className="meeting_sections meetings_section--right">
                <h1 className="heading-tertiary" style={{ fontSize: "large", color:"orangered", textAlign: "center" }}> Available meetings</h1>
                <>
                    {
                        getMeeting
                    }
                </>
            </div>
            <Modal ref={modalRefReview}>
                <fieldset>
                    <legend style={ { textAlign: "center" } }><h4 style={ { margin: "0 .5rem" } }>Review Meeting</h4></legend>
                    <hr />
                    <div className="registration__section" id="registration__section">
                        <form htmlFor="registration_form" className="registration__form" method="POST" onSubmit={ (e, id) => handleMeetingUpdate(e, id) }>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="meeting_tittle" name="meeting_title"
                                    inputMode="text"
                                    placeholder="Edit meeting title..."
                                    value={meetingTitle}
                                    onChange={(e) => setMeetingTitle(e.target.value)}
                                />
                                </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="meeting_venue"
                                    name="meeting_venue"
                                    inputMode="text"
                                    placeholder="Edit venue for meeting..."
                                    value={meetingVenue}
                                    onChange={(e) => setMeetingVenue(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="key_speaker"
                                    name="key_speaker"
                                    inputMode="text"
                                    placeholder="Edit key speaker..."
                                    value={speaker}
                                    onChange={(e) => setSpeaker(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="meeting_agenda"
                                    name="meeting_agenda"
                                    inputMode="text"
                                    placeholder="Edit meeting agenda..."
                                    value={agenda}
                                    onChange={(e) => setAgenda(e.target.value)}
                                />
                            </div>
                            <div className="form__group" id="form_group">
                                <input type="text"
                                    className="form__control"
                                    id="moderator"
                                    name="moderator"
                                    inputMode="text"
                                    placeholder="Edit moderator.."
                                    value={moderator}
                                    onChange={(e) => setModerator(e.target.value)}
                                />
                            </div>
                            <hr />
                            <div className="form__group" id="form_group--footer">
                                <input type="submit" className="btn btn__submit" value="Submit" />
                                <input type="button" className="btn btn__close" value="Cancel" onClick={ () => modalRefReview.current.closeModal() } />
                            </div>
                        </form>
                    </div>
                </fieldset>
            </Modal>
        </div>
    );
}

export default Meetings;
