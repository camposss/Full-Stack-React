import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash'
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';

const SurveyFormReview = ({onCancel,formValues,submitSurvey, history})=>{
    const reviewFields =_.map(formFields, ({name, label}) =>{
        return(
            <div key ={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });

    return(
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className='yellow darken-3 white-text btn-flat' onClick={onCancel}>Back</button>
            <button onClick={()=>submitSurvey(formValues, history)} className='green right white-text btn-flat'>
                Send Survey
                <i className='material-icons right'>email</i>
            </button>
        </div>
    )
};

function mapStateToProps(state){
    return{
        formValues: state.form.surveyForm.values
    }
}

//since surveyFormReview isnt an actual routed page (it's a child component) it needs a helper function that will tell it about react router.
// withRouter gives this component access to all the router props, in particular the HISTORY object

export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));