/*global FB*/

import React from 'react';
import "./FBlogin.css";
import FacebookIcon from "./fb_icon.png";

let userData;

// FACEBOOK REDIRECT WITH ONLY FRONT END JS + REACT
// https://www.facebook.com/dialog/oauth?client_id=141088316668315&response_type=token&scope=PUBLIC_INFOANDORPOSSIBLYMORESTUFF&redirect_uri=localhost:3000/
// USE AXIOS TO MAKE GET CALL FOR >>> https://graph.facebook.com/me/?fields=name,picture.width(500).height(500),email&access_token=<ACCESS TOKEN FROM ^>

//PSEUDOCODE
// 1. FB LOGIN BUTTON REDIRECTS USER TO TO OAUTH LINK ABOVE
// 2. AFTER APPROVAL, REDIRECT URI TO "SUCCESSFUL LOGIN PAGE"
// 3. THROUGH CHROME EXTENSION, PARSE TABS FOR ^ PAGE AND PLACE ACCESS TOKEN INTO LOCAL STORAGE
// 4. CHANGE APP.JSX LOGIC TO CHECK FOR ACCESS TOKEN IN LOCAL STORAGE INSTEAD OF FB COOKIE, SETSTATE UPON APPROVAL
// 5. ONCE REDIRECTED, IN COMPONENTWILLMOUNT(), USE AXIOS TO MAKE FB GRAPH API CALL TO PULL AND POPULATE USER INFO ON PAGE


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('Status Callback:', response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log("User is logged in");
  } else {
    console.log('User has logged out');
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '141088316668315',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=141088316668315';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function pullUserData(cb) {
  FB.api('/me?fields=name,picture.width(500).height(500),email', function(response) {
    userData = response;
    console.log('FBlogin.jsx pullUserData():', userData);
    cb();
  });
}

function fbLogout(cb){
  FB.logout(function(response) {
    checkLoginState();
    cb();
  });

}

//Callback for fbLogin to ensure pullUserData 
//receieves use data before attempting to reroute
function fbLogin(cb){
  FB.login(function(response){
    checkLoginState();
    pullUserData(cb);
  });

}


class FBLogin extends React.Component{
  //RECEIVES USER DATA TO BE PASSES TO LOGIN PAGE TO APP.JSX
  passFbData(data){
    this.props.passDataFromFb(data)
    console.log('User data:', data)
  }

  //pass data will only occur when the FBlogin component unmounts
  componentWillUnmount(){
    this.passFbData(userData);
  }


  render(){
    return(
      <div>
        <button 
          className="facebook-colors"
          onClick={() => 
            {
              fbLogin(this.props.checkCookie)
            }
          }
        >
        <img className="facebook-icon" src={FacebookIcon} alt="Facebook_Icon"/>
        Continue with Facebook
        </button>
      </div>
    )
  }
}

const FBLogout = props => (
  <div onClick={() => fbLogout(props.checkCookie)}>Logout</div>
)

export {FBLogin, FBLogout};

//   <div 
  //   class="fb-login-button" 
  //   data-max-rows="1" 
  //   data-size="large" 
  //   data-button-type="continue_with" 
  //   data-show-faces="false" 
  //   data-auto-logout-link="false" 
  //   data-use-continue-as="false"
  //   onClick={() => checkLoginState()}
  // ></div>