import React, { useState, useEffect } from 'react';

function MainPage () {
    const [ users, setUsers ] = useState({ usersList: [] });
    const [ errorMsg, setErrorMsg ] = useState('');

    useEffect(() => {
        async function fetchData () {
            return await fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(users => {
                    setUsers({ usersList: users })
                    console.log(users)
                })
                .catch(err => {
                    console.log(err)
                    setErrorMsg(`Could not load data from the server...`)
                });

            return function cleanEffect () {
                setUsers(users.usersList)
            };
        }
        fetchData();
    }, []);

    if (users.usersList === []) {
        return <p className="heading-secondary">Loading list of users...</p>
    }
    return (
        <div className="main-page">
            <h1 className="heading-secondary chat-heading">Content Section</h1>
                What is Lorem Ipsum ?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book.It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.

            <h3 className="heading-tertiary">List of courses</h3>
            {
                users.usersList.length ? users.usersList.map(user => <div key={ user.id }> { user.id } { user.title }</div>) : null
            }
            {
                errorMsg ? <div><h6 className="heading-primary">{ errorMsg }</h6></div> : null
            }
        </div>
    )
}

export default MainPage;