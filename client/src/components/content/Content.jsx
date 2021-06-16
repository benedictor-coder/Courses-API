import React from 'react';
import './Content.css';
import Sidebar from '../sidebar/Sidebar';
import Body from '../body/Body';
import ErrorBoundary from '../../error-boundary/ErrorBoundary';

function Content () {
    return (
        <div className="content">
            <ErrorBoundary>
                <Sidebar />
            </ErrorBoundary>
            <Body />
            </div>
        );
}

export default Content;