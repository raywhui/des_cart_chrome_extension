import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {FBLogin, FBLogout} from '../../components/FBlogin';
import "./Login.css";


// const LoginPage = props => {  
let storedData;

class LoginPage extends React.Component {

  // PASSES USER DATA FROM FB LOGIN API TO LOGIN PAGE
  passDataFbToLogin(userData){
    //vvv PASSES USER DATA TO APP.jsx
    this.props.passDataFromLoginToApp(userData)
    storedData = userData;
    console.log('FBlogin.jsx --> Login.jsx:', storedData);
  }

  render(){
    // if (this.props.wantedState === true) {
    //   return (
    //     <Redirect to="/home" />
    //   )
    // } else {
      return (
        <div className="align-elements">
          <div className="container">
            <h1>Des Carts</h1>
            <Input type='text' placeholder='Login'/>
            <Input type='password' placeholder='Password'/>
            <Button 
              className='button login-button' 
              onClick={() => console.log('this button does nothing')}
            >Login</Button>
            <h3> - OR - </h3>
            <div>
              <FBLogin 
                checkCookie={this.props.cWM} 
                passDataFromFb={this.passDataFbToLogin.bind(this)}
              />
              <Button 
                className='demo-button button'
                onClick={() => console.log('this button also does nothing')}
              >Demo</Button>
            </div>
          </div>
        </div>
      );
    }
  // }
};

export default LoginPage;