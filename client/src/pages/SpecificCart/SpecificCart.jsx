import React, { Component } from 'react';
import Items from "../../components/Items";

//Homepage frontend logic goes here

class SpecificCart extends Component {
  render(){
    return (
      <div>
      	<Items 
      		src={this.props.src}
      		description={this.props.description}
      	>{this.props.description}</Items>
        <p>This is the {this.props.description} Cart Page</p>
      </div>
    );
  }
}

export default SpecificCart;