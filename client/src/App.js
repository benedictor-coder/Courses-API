import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Popup from './components/popup/Popup';
const Header = lazy(() => import ('./components/header/Header'));
const Content = lazy(() => import  ('./components/content/Content'));

function App() {
    return (
        <div className="App">
            <Popup/>
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

