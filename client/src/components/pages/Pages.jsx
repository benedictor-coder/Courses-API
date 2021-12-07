import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Pages.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Home from '../home/Home';
import Users from '../users/Users';
import MainPage from '../main-page/MainPage';
import Projects from '../projects/Projects';
import InfoSection from '../info-section/InfoSection';
import SignIn from '../signin/SignIn';
import Booking from '../Booking/Booking';
import ErrorBoundary from '../../error-boundary/ErrorBoundary';
import PostData from '../postdata/PostData';
import Report from '../reports/Report';
import Meetings from '../meetings/Meetings';
import BoreHoles from '../bore-holes/BoreHoles';
import Wells from '../Wells/Wells';
import Catchments from '../catchments/Catchments';
import TreatmentPlants from '../treatment-plants/TreatmentPlants';
import Meetering from '../meetering/Meetering';
import Plumbing from '../plumbing/Plumbing';

function Pages () {
    return (
        <ScrollToBottom className="top-content">
            <ErrorBoundary>
                <Switch>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/main/users' component={Users}/>
                    <Route exact path='/main/water-sources' component={MainPage} />
                    <Route exact path='/main/bore-holes' component={BoreHoles}/>
                    <Route exact path='/main/wells' component={Wells}/>
                    <Route exact path='/main/meetering' component={Meetering}/>
                    <Route exact path='/main/water-treatment-plants' component={TreatmentPlants}/>
                    <Route exact path='/main/water-catchments' component={Catchments}/>
                    <Route exact path='/main/meetings' component={Meetings}/>
                    <Route exact path='/main/plumbing' component={Plumbing}/>
                    <Route exact path='/main/projects' component={ Projects } />
                    <Route exact path='/main/information' component={ InfoSection } />
                    <Route exact path='/main/signin' component={ SignIn } />
                    <Route exact path='/main/booking' component={ Booking } />
                    <Route exact path='/main/posts' component={PostData} />
                    <Route exact path='/main/report' component={Report}/>
                </Switch>
            </ErrorBoundary>
        </ScrollToBottom>
    );
}

export default React.memo(Pages);
