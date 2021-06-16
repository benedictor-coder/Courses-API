import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './PostData.css';

function PostData () {
    const [successAlert, setSuccessAlert] = useState(false);
    const [ userId, setUserId ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');

    const mountData = React.useRef(false);

    const onchangeUserId = (e) => {
        setUserId(e.target.value)
        console.log({ [ e.target.name ]: userId })
    }
    const onchangeTitle = (e) => {
        setTitle(e.target.value)
        console.log({ [ e.target.name ]: title })
    }
    const onchangeBody = (e) => {
        setBody(e.target.value)
        console.log({ [ e.target.name ]: body })
    }
    let url = 'https://jsonplaceholder.typicode.com/posts';
    let data = {
        userId,
        title,
        body
    }

    let request = {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: new Headers()
    }
    const clearInput = () => {
        if (!mountData.current) {
            setUserId('')
            setTitle('')
            setBody('')
            setTimeout(() => {
                setSuccessAlert(true)
            }, 500)
            setTimeout(() => {
                setSuccessAlert(false)
            }, 3000)
        }
        return () => mountData.current = true;
    }
    async function setUsers () {
        const results = (callback) => {
            fetch(url, request)
                .then(res => res.json())
                
                .catch(err => {
                    console.log(err)
                })
        }
        return await results(clearInput());
    }

    const submitHandler = (e) => {
        e.preventDefault();

        console.log({ userId }, { title }, { body })

        setUsers();
    }

    return (
        <div className="posts-section">
            <form onSubmit={ (e) => submitHandler(e) }>
                { successAlert && <h4>Request successful </h4> }
                <div className="">
                    <input type="text" name="userId" onChange={ (e) => onchangeUserId(e) } value={ userId } />
                </div>
                <div className="">
                    <input type="text" name="title" onChange={ (e) => onchangeTitle(e) } value={ title } />
                </div>
                <div className="">
                    <input type="text" name="body" onChange={ (e) => onchangeBody(e) } value={ body } />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        )
}

export default PostData;