import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './surveyField';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component{

    renderFields(){
        return _.map(formFields, ({label, name})=>{
            return(
                <Field key={name} label ={label} name={name} type= 'text' component={SurveyField}/>
            )
        });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to ='/surveys' className='red btn-flat white-text'>
                        Cancel
                    </Link>
                    <button className='teal btn-flat right white-text' type='submit'>
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>

            </div>
        )
    }

}

function validate(values){
    const errors= {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({name})=>{
        if(!values[name]){
            errors[name]='You must provide a value'
        }
    });

    return errors;


}

export default reduxForm({
    //what you end up calling the object that holds all the fields surveyForm becomes a property of form
    form: 'surveyForm',
    destroyOnUnmount: false,
    validate: validate
})(SurveyForm);