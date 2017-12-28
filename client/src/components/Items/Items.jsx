import React from "react";
import './Items.css';

class Items extends React.Component { 
	render(){
		return(
			<div className="item" onClick={this.props.onClick}>
				<img className="item item-image" src={this.props.src} alt={this.props.children}/>
				<div className="description">{this.props.description}</div>
			</div>
		)
	}
}
export default Items;


