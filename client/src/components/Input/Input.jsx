import React from 'react';


const Input = (props) =>
	<div>
    <input
    	name={props.name}
    	className='form-control search' 
    	type={props.type || 'text'} 
    	placeholder={props.placeholder}
    	value={props.value}
    	onChange={props.onChange}
    />
	</div>

export default Input;	