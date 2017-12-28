import React from "react";

const Button = props => 
	<button 
		type="button" 
		className={"btn " + props.className} 
		children={props.children}
		onClick={props.onClick}
	/>;

export default Button;


