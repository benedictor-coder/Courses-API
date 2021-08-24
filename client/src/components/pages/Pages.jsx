import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Pages.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Home from '../home/Home';
import MainPage from '../main-page/MainPage';
import Cards from '../cards/Cards';
import InfoSection from '../info-section/InfoSection';
import SignIn from '../signin/SignIn';
import Booking from '../Booking/Booking';
import ErrorBoundary from '../../error-boundary/ErrorBoundary';
import PostData from '../postdata/PostData';
import Report from '../reports/Report';

function Pages () {
    return (
        <ScrollToBottom className="top-content">
            <ErrorBoundary>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/main' component={MainPage} />
                    <Route exact path='/main/cards' component={ Cards } />
                    <Route exact path='/main/information' component={ InfoSection } />
                    <Route exact path='/main/signin/' component={ SignIn } />
                    <Route exact path='/main/booking' component={ Booking } />
                    <Route exact path='/main/posts' component={PostData} />
                    <Route exact path='/main/report' component={Report}/>
                </Switch>
            </ErrorBoundary>
        </ScrollToBottom>
    );
}

export default React.memo(Pages);