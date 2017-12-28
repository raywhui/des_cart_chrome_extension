import React, { Component } from 'react';
import Input from '../../components/Input';
// import Button from '../../components/Button';
import Button from '../../components/Button';
import Items from '../../components/Items';
import {
  BrowserRouter as Router,
  Link,
  Redirect
} from 'react-router-dom';

//vvv carts needs to be transferred to a database at some point
const carts = [
  {
    src: "https://www.thedailymeal.com/sites/default/files/styles/hero_image_breakpoints_theme_tdmr_lg_1x/public/story/MAIN-skillsperfect-istock_thinkstock.jpg?itok=lBPpfbNb&timestamp=1418658115",
    description: "Cooking"
  },  
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    description: "Foods"
  },  
  {
    src: "https://citelighter-cards.s3.amazonaws.com/p17d98f5st15qd1tsv1m9c1sbu11uo0_64674.jpg",
    description: "Tech"
  },  
  {
    src: "http://www.frador.com/wp-content/uploads/2015/04/gardening_in_mn.jpg",
    description: "Gardening"
  },  
  {
    src: "http://trendingallday.com/wp-content/uploads/2017/05/GordonRamsay.jpg",
    description: "Gordon Ramsay"
  },  {
    src: "asdfasdf",
    description: "don say"
  }
];


class Homepage extends Component {
  state = {
    newCartInput: false,
    name:'',
    url:'',
    appendNewCart: false,
    carts: carts
  }

  inputOnAndOff(state){
     state === false ?
    (
      this.setState({
        newCartInput: true
      })
    ) : 
    (
      this.setState({
        newCartInput: false
      })
    )
  }

  updateInput(e){
    const name = e.target.name;

    this.setState({
      [name]: e.target.value
    })
  }

  //NO logic attached to appendNewCart, but cannot auto generate without it for some reason...
  createNewCart(array){
    this.setState({
      newCartInput: false,
      appendNewCart: true
    }, function(){
      array.push({ 
        src: this.state.url, 
        description: this.state.name 
      });
      this.setState({ appendNewCart: false });
      console.log(this.state, "\n New Cart Added");
      console.log(carts); 
    })
  }

  redirectToSpecificCart(){
    this.context.router.push({
     pathname: '/SpecificCart',
     state: {name: this.state.name}  
    })
  }

  render(){
    return (
      <div>
        <Items 
          description="Add Cart +" 
          onClick=
          {
            () => this.inputOnAndOff(this.state.newCartInput)
          }
        />

        {//Conditional Rendering: if newCartInput is true, generate inputs
          this.state.newCartInput ? 
          <div className="container">
            <Input
              name="name"
              value={this.state.name} 
              placeholder="New Cart Name"
              onChange={e => this.updateInput(e)}
            />
            <Input 
              name="url"
              placeholder = "Background Image URL"
              value={this.state.url} 
              onChange={e => this.updateInput(e)}
            /> 
            <Button onClick={()=> this.createNewCart(carts)}>Confirm</Button>
          </div>
          :  ""
        }


        {this.state.carts.map((cart,i) => 
          //loops through carts state and maps them onto homepage
          <Link to="/single">
            <Items 
              key = {i}
              src= {cart.src}
              description= {cart.description}
              onClick={()=>this.props.passCartData(cart)}
            >{cart.description}</Items>
          </Link>
        )}

      </div>
    );
  }
}

export default Homepage;