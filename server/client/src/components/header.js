import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Payments from './payments';



class Header extends Component {
    renderContent(){
        switch(this.props.auth){

            //we can't sub in Link tag in here because these are HTTP requests as opposed to front end routing
            case null:
                return;
            case false:
                return(
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                //you can return an array of components since the parent is a ul
                return [
                    <li key='1'><Payments/></li>,
                    <li key='3' style={{margin: '0 10px'}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key='2'><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link className='left brand-logo' to= {this.props.auth? '/surveys': '/'}>
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Header);