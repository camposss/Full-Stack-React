import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './landing';
import Dashboard from './dashboard';
import Header from './header';
import SurveyNew from './surveys/surveynew';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';




class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return(
            //this top div is left strictly for CSS
            <div className="container">
                <Router>
                    <div>
                        <Header/>
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/surveys' component={Dashboard}/>
                        <Route path ='/surveys/new' component={SurveyNew}/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default connect( null , {fetchUser} ) (App);