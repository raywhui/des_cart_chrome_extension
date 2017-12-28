import React, { Component } from 'react';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Items from "../../components/Items";
// import "./AddCart.css";


class AddCart extends Component {
	state = {
		name:'',
		url:''
	}

	updateState(e){
		const name = e.target.name;

		this.setState({
			[name]: e.target.value
		})
	}

	passDataToApp(data){
		// this.props.
	}

  render(){
    return (
    	<div>
    		<Items description="Add Cart +" />
        <div className="container">
        	<Input
        		name="name"
        		value={this.state.name} 
        		placeholder="New Cart Name"
        		onChange={e => this.updateState(e)}
        	/>
        	<Input 
        		name="url"
        		placeholder = "Background Image URL"
        		value={this.state.url} 
        		onChange={e => this.updateState(e)}
        	/>
        	<Button onClick={()=>console.log(this.state)}>Confirm</Button>
      	</div>
      </div>
    );
  }
}

export default AddCart;