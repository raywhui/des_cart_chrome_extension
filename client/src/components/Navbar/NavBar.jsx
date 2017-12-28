import React from "react";
// import { Link, Redirect } from "react-router-dom";
import { FBLogout } from '../../components/FBlogin';

//Needed for react-bootstrap functionality
import { Navbar, Nav, NavItem } from 'react-bootstrap';
//Needed to use routing, does the same thing as <Link>, but with Bootstrap Components
import { LinkContainer } from 'react-router-bootstrap';
import Input from '../../components/Input';
import './NavBar.css';


class NavBar extends React.Component {
  focusInputNavbar(){
    //setTimeout needed b/c Input takes time to render
    setTimeout(function(){
      document.getElementsByClassName('search')[0].focus();
    },100);
  }

  render(){
    return (
      <Navbar 
        className="navbar" 
        inverse 
        collapseOnSelect
        onClick={this.focusInputNavbar}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/home" className='go-away-bootstrap-colors'>
              <a>Des Carts</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>

            <NavItem eventKey={1}>
              <Input placeholder="Search Carts">Filter</Input>
            </NavItem>

            <NavItem 
              eventKey={2} 
              className='go-away-bootstrap-colors' 
              onClick={()=>console.log('Fake News')}
            >Settings</NavItem>

            <LinkContainer to="/add" className='go-away-bootstrap-colors'>
              <NavItem eventKey={3}>Add-a-Cart Test Page</NavItem>
            </LinkContainer>    

            <LinkContainer to="/single" className='go-away-bootstrap-colors'>
              <NavItem eventKey={4}>SpecificCart Test Page</NavItem>
            </LinkContainer>        
            
            <NavItem eventKey={5} className='go-away-bootstrap-colors'>
              <FBLogout checkCookie={this.props.cWM}/>
            </NavItem>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
};

export default NavBar;

// <ButtonToolbar>
//   <DropdownButton title="Dropdown" onToggle="open">
//     <MenuItem eventKey="1">Action</MenuItem>
//     <MenuItem eventKey="2">Another action</MenuItem>
//     <MenuItem eventKey="3" active>Active Item</MenuItem>
//     <MenuItem divider />
//     <MenuItem eventKey="4">Separated link</MenuItem>
//   </DropdownButton>
// </ButtonToolbar>

 //  <nav className="navbar navbar-default"> 
 //    <div className="container-fluid">
 //      <div className="navbar-header">
 //        <Link to="/home">Home</Link>
 //        <Link to="/all">All</Link>
 //        <Link to="/single">Single</Link>
 //        <img className="profile" src={props.src}/>
 //        <FBLogout checkCookie={props.cWM}/>
 //      </div>
 //    </div>
 // </nav>


 //   <nav class="navbar navbar-dark bg-dark">
 //    <a class="navbar-brand" href="#">Des Cart</a>

 //    <form class="form-inline">
   // <DropdownButton title='Dropdown'>
    //<MenuItem eventKey="1">Action</MenuItem>
    //<MenuItem eventKey="2">Another action</MenuItem>
    //<MenuItem eventKey="3">Active Item</MenuItem>
   // <MenuItem divider />
  //  <MenuItem eventKey="4">Separated link</MenuItem>
//  </DropdownButton>

 //    </form>
 //  </nav>