import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
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

    const [errorMsg, setErrorMsg] = useState('');
    const [meetings, setMeetings] = useState([])
    const history = useHistory()
    // const handleChange = e => {
    //     const {name, value} = e.target;
    //     setMeeting({
    //         ...meeting,
    //         [name]: value
    //     })
    // }
    useEffect(() => {
        async function fetchData () {
            await fetch('/water-management-meetings/api/v1/meetings', {
                method: 'GET', headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } || new Headers()
            })
                .then(res => res.ok && res.status === 200? res.json() : !res.ok?  () => "There was an error in getting data." : "NO DATA FOUND.")
                .then(meeting => {
                    setMeetings(meeting);
                    history.push('/main/meetings')
                    console.log(meeting)
                })
                .catch(err => {
                    console.log(err)
                    setErrorMsg(`Could not load data from the server...`)
                });

            return function cleanEffect () {
                setMeetings(meetings =>  meetings)
            };
        }
        fetchData();
    }, [setMeetings]);

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
                res.json({ message: "Success", data: res }) :
                console.log("\nCant submit empty form")
        )
            .then(res => res? history.push('/main/meetings'):null)
            .catch(err => {
            console.error(err, `An Error Occured.Could not post data.`)
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        return postMeetingRequest()
    }

    const getMeeting = meetings.length > 0 ?
        meetings.map(meeting => {
            return <div className="col-1-of-4">
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
                                    <input type="button" className="btn btn-view" value="Review meeting" />
                                </div>
                            </div>
                        </div>
                    </div>
        }) : <div><h3 style={{ color: "white" }}>No scheduled meetings available.</h3></div>
    
    return (
        <div className="meetings_section">
            <div className="meeting_sections meetings_section--left" style={{ width: "75%",float:"left" }}>
            <h1 className="heading-tertiary"> Meetings</h1>
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
                    <input type="reset" className="btn btn__cancel meeting_btns"value="Reset" />
                    </div>
                </form>
            </div>
            <div className="meeting_sections meetings_section--right" style={{ width:"25%", float:"right", padding:"0 .5rem"}}>
                <h1 className="heading-primary" style={{ fontSize: "large"}}> Available meetings</h1>
                <>
                    {
                        getMeeting
                    }
                </>
            </div>
        </div>
    );
}

export default Meetings;