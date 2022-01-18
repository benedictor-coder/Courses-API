import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    let session_token = localStorage.getItem("token");
    return (
        <Route {...rest} render={props => (
            session_token !== null ? (<Component {...props} />) :
                (<Redirect to={{
                    pathname: '/signin',
                    state: {
                        from: props.location
                    }
                }}/>)
        )}/>
    );
}

export default PrivateRoute;