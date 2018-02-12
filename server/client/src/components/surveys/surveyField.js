import React from 'react';

export default ({input, label, meta:{error, touched}}) => {
    return(
        <div>
            <label> {label} </label>
            <input type="text" {...input}  style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error ? error:''}
            </div>
        </div>
    )
}