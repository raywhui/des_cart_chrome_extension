import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import NavBar from "./components/Navbar";
import LoginPage from "./pages/Login";
import Homepage from "./pages/Homepage";
import AddCartPage from "./pages/AddCart";
import SpecificCart from "./pages/SpecificCart";
import Banner from './components/Banner';

// TEAMNAME: WNATN, MAHIRA,AIRHAM,ARMAIH, harmia
// NAMES: Shopkeep, Vender

const fbAppId = '141088316668315';
let fbCookie = document.cookie;


//Put all login fb cookie checking here?
class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      isLoggedIn: false,
      userId:'999999999',
      name:'Jane Doe',
      profileImg:'',
      cart:'',
      item:'',
      specificCart:{
        src:'',
        description:''
      }
    };
  }

  pullCartInfo(cartData){
    //this.setState is IMMUTABLE, SHOULD BE MESSIN WITH
    //NESTED OBJECTS DIRECTLY
    // SOLUTION: create and mutate new object then set that object to state
    var cartInfo = Object.assign({}, this.state.specificCart, {src:cartData.src, description:cartData.description});
    this.setState({specificCart:cartInfo}, console.log(cartInfo));
  }

  // RETRIEVES USER DATA FROM LOGIN PAGE
  pullUserData(dataFromLogin){
    console.log('Data From Login:', dataFromLogin);

    if(dataFromLogin === undefined){
      console.log('Should change this to keep user data forever, but we can do that with a server up');
    } else {
      //Set State, does not immediately set state.
      // OPTIONS: SETSTATE HAS BUILT IN CALLBACK OR USE componentDidUpdate
      this.setState({ 
        userId: dataFromLogin.id,
        name: dataFromLogin.name, 
        profileImg: dataFromLogin.picture.data.url
      });
    }
  }

  checkIfLoggedIn(){
    //CHANGE TO ACCESS TOKEN
    fbCookie = document.cookie;

    console.log('FB Login Cookie:', fbCookie);
    // reuse to check cookies for other parts of page
    // NEED CALLBACK FOR AFTER COOKIES CHANGE

    if (fbCookie === "fblo_" + fbAppId + "=y"){ //OR UNDEFINED
      //IF NOT LOGGED IN LOGIC
      console.log('Log Out Successful');
      this.setState({ isLoggedIn: false });
    } else {
      // IF ALREADY LOGGED IN LOGIC
          // vvv IF ACCESS TOKEN EXISTS, SETSTATE
      //Need to add pull user data from database if 
        //refreshed but still logged in
      console.log('Log In Successful');
      this.setState({ isLoggedIn: true });
    }
  }
  //NEED LOGIC FOR WHEN LOGOUT, TURNS isLoggedIn STATE TO FALSE

  componentWillMount(){
    this.checkIfLoggedIn();
  }

  componentDidMount(){
    this.pullUserData();
  }

  componentDidUpdate(){
    console.log('COMPONENT DID UPDATE:',this.state)
  }

// this.state.isLoggedIn === true

  render(){
    if(this.state.isLoggedIn === false){
      return (
        <LoginPage 
          // wantedState={this.state.isLoggedIn} 
          cWM={()=>this.componentWillMount()}
          passDataFromLoginToApp={this.pullUserData.bind(this)}
        />
      )
    } else {
      return (
        <Router>
          <div>
            <Redirect to="/home" />
            <NavBar cWM ={()=>this.componentWillMount()}/>
            <Banner 
              name={this.state.name} 
              profileSrc={this.state.profileImg}
            />
            <Switch>
              <Route 
                exact path="/home" 
                render={()=><Homepage passCartData={this.pullCartInfo.bind(this)}/>} 
              />
              <Route exact path="/add" component={AddCartPage} />
              <Route 
                exact path="/single" 
                render={ ()=>
                  <SpecificCart 
                    src={this.state.specificCart.src} 
                    description={this.state.specificCart.description}
                  />
                } 
              />
            </Switch> 
          </div>
        </Router>  
      )
    }
  }
}

export default App;

  // render() {
  //   return (
  //     <div>
  //       <p>Go team!</p>
  //       <FacebookLogin
		// 	    appId={fbAppId}
		// 	    autoLoad={true}
		// 	    fields="name,email,picture"
		// 	    onClick={console.log('fb')}
		// 	    callback={responseFacebook} 
		// 	    icon="fa-facebook"
		// 	  />
  //     </div>
  //   );
  // }
