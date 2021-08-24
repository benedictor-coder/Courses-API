import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';
import Popup from './components/popup/Popup';
import SignIn from './components/signin/SignIn';
const Header = lazy(() => import ('./components/header/Header'));
const Content = lazy(() => import  ('./components/content/Content'));

function App () {
    return (
        <div className="App">
            {/* <Popup title={
                <Router>
                    <Link to='' className="sign-up heading-secondary">
                        SignUp
                    </Link>
                </Router>
            }
                content={ <SignIn /> }
            /> */}
            <Router>
                <Suspense fallback={
                    <div style={ { textAlign: 'center' } }>
                        <h1 className="heading-secondary">Loading content... </h1>
                    </div>
                }>
                    <Header />
                    <Content />
                </Suspense>
            </Router>
        </div>
    );
}

export default App;

