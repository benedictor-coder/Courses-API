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
import Analysis from '../analysis/Analysis';
import Sampling from '../sampling/Sampling';
import Meetering from '../meetering/Meetering';
import FieldWork from '../fieldworks/FieldWork';
import PrivateRoute from '../../includes/PrivateRoute';

function Pages () {
    return (
        <ScrollToBottom className="top-content">
            <ErrorBoundary>
                <Switch>
                    <PrivateRoute exact path='/home' name="Home" component={ props=> <Home {...props}/>} />
                    {/* <Route exact path='/home' name="Home" component={Home} /> */}
                    <PrivateRoute exact path='/main/users' name="Users" component={ porps => <Users {...porps}/>}/>
                    {/* <Route exact path='/main/users' name="Users" component={Users }/> */}
                    <PrivateRoute exact path='/main/water-sources' name="MainPage" component={props => <MainPage {...props}/>} />
                    {/* <Route exact path='/main/water-sources' name="MainPage" component={MainPage } /> */}
                    {/* <Route exact path='/main/bore-holes' component={BoreHoles}/> */}
                    {/* <Route exact path='/main/wells' component={Wells}/> */}
                    {/* <PrivateRoute exact path='/main/meetering' name="Meetering" component={props => <Meetering {...props}/>}/>? */}
                    <Route exact path='/main/meetering' name="Meetering" component={Meetering }/>
                    <PrivateRoute exact path='/main/water-sampling' name="Sampling" component={props => <Sampling {...props}/>}/>
                    {/* <Route exact path='/main/water-sampling' name="Sampling" component={Sampling}/> */}
                    <PrivateRoute exact path='/main/water-analysis' name="Analysis" component={props => <Analysis {...props}/>}/>
                    {/* <Route exact path='/main/water-analysis' component={Analysis}/> */}
                    <PrivateRoute exact path='/main/meetings' name="Meetings" component={props => <Meetings {...props}/>}/>
                    {/* <Route exact path='/main/meetings' name="Meetings" component={Meetings }/> */}
                    <Route exact path='/main/fieldwork' component={FieldWork}/>
                    <PrivateRoute exact path='/main/projects' name="Projects" component={ props => <Projects {...props}/>} />
                    {/* <Route exact path='/main/projects' name="Projects" component={ Projects} /> */}
                    <Route exact path='/main/information' component={ InfoSection } />
                    {/* <Route exact path='/main/signin' component={ SignIn } /> */}
                    {/* <Route exact path='/main/booking' component={ Booking } /> */}
                    {/* <Route exact path='/main/posts' component={PostData} /> */}
                    <PrivateRoute exact path='/main/report' name="Report" component={props => <Report {...props}/>}/>
                    {/* <Route exact path='/main/report' name="Report" component={Report }/> */}
                </Switch>
            </ErrorBoundary>
        </ScrollToBottom>
    );
}

export default React.memo(Pages);
