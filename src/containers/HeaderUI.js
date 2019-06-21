/*eslint no-unused-vars: "off"*/
/*eslint no-script-url: "off"*/
/*eslint no-unused-expressions: "off"*/
/*eslint array-callback-return: "off"*/
import React, { Component } from 'react'
import {BrowserRouter as Router, Link,NavLink } from 'react-router-dom'
// import { Link } from 'react-router'
import firebase from '../config/database'
var md5 = require('md5');

export default class HeaderUI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
          }

          this.createUserView = this.createUserView.bind(this);
          this.handleLogout = this.handleLogout.bind(this);
   
    }

    componentDidMount(){
        this.authListener();
    }
      
    authListener(){
    console.log("HEADER : componentDidMount");
    const setUser=(user)=>{
    this.setState({user:user})
    }

    //Now do the listner
    firebase.app.auth().onAuthStateChanged(function(user) {
    if (user) {
        setUser(user);
       
        
    } else {
        // No user is signed in.
        console.log("HEADER : No user is signed in.");
    }
    });
    }
      
      /**
   * Logout function
   * @param {Event} e 
   */
  handleLogout(e) {
    e.preventDefault();

    console.log('HEADER : The Logout link is clicked');
    firebase.app.auth().signOut();
  }
    
    //Create user dropdown menu in navigation
    createUserView(){
    var userPhoto=this.state.user.photoURL?this.state.user.photoURL:'http://www.gravatar.com/avatar/' + md5(this.state.user.email+"")+"?s=512";
    return (
        <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><img alt="" className="img-circle img-responsive fireadmin-user_image" src={userPhoto} /></a>
            
            <ul className="dropdown-menu userDropdownMenu" role="menu">
            <li><a>{this.state.user.email}</a></li>
            <li><Link to="/account">Account</Link></li>
            {(this.props.isLoggedIn && (this.props.currentUser!=="visitor")) ?                            
            <li>
                <Link to="/dashboard">Dashboard</Link> 
            </li>
            :""
            }
            <li className="divider" />
            <li role="button"><a onClick={this.handleLogout}>Logout</a></li>
            </ul>
        </li>
    );
    }

    render() {

       console.log("HEADER : isLoggedin - "+this.props.isLoggedIn)
       console.log("HEADER : Props Current user - "+this.props.currentUser)
       
        return (

        <div>
                <nav className="navbar navbar-primary navbar-fixed-top">{/*navbar-tranparent*/}
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a style={{width:'80%'}} className="navbar-brand" href="#">
                                {/* {Config.adminConfig.appName} */}
                                {/* Ceylon One */}
                                <img style={{marginTop:'-12px'}} alt="" src="assets/img/Ceylon one Wide.png"></img>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse">
                        
                        <ul className="nav navbar-nav navbar-right">
                                        <li>
                                            <NavLink exact activeStyle={{backgroundColor:'#fffcff1a'}} to="/">Home</NavLink> 
                                        </li>
                                        <li>
                                            <NavLink exact activeStyle={{backgroundColor:'#fffcff1a'}} to="/about">About</NavLink> 
                                        </li>
                                        <li>
                                            <NavLink exact activeStyle={{backgroundColor:'#fffcff1a'}} to="/centre">Centres</NavLink> 
                                        </li>
                                        <li>
                                            <NavLink exact activeStyle={{backgroundColor:'#fffcff1a'}} to="/program">Program</NavLink> 
                                        </li>
                                       
                                        {!this.props.isLoggedIn ?
                                        <li className={this.props.isRegister ? "active" : ""}>
                                            <NavLink exact activeStyle={{backgroundColor:'#fffcff1a'}} to="/login">
                                                <a style={{color:'#01fde6'}} className="nav-link" role="button" >
                                                    <i className="material-icons">fingerprint</i>Login
                                                </a>
                                            </NavLink>
                                            
                                        </li>
                                        :
                                        // <li>
                                        //     <Link to="/login"><a onClick={this.logout}>Logout</a></Link> 
                                        // </li>
                                        // <AuthButton/>
                                        ""
                                        }

                                        {!this.props.isLoggedIn ?
                                        <li className={this.props.isRegister ? "active" : ""} >
                                            <NavLink exact activeStyle={{backgroundColor:'#fffcff1a'}} to="/register">
                                                <a style={{color:'#01fde6'}} className="nav-link" role="button" >
                                                    <i className="material-icons">how_to_reg</i>Register
                                                </a>
                                            </NavLink>
                                            
                                        </li>
                                        :
                                        this.createUserView()
                                        }
                                        
                                    </ul>
                                    
                        </div>
                    </div>
                </nav>
                    
                {this.props.children}

                <footer className="footer" style={{backgroundColor:'#353535'}}>
                    <div className="container w-container">
                        <div className="footer-row w-row">
                            <div className="footer-column first w-col w-col-6">
                                <div className="footer-title">About the festival</div>
                                <div className="section-divider"></div>
                                <p style={{color:'#b8b8b8'}}>
                                Sri Lanka Festival organized by Sri Lanka Business Council of Japan, consists of well over 100 booths and stalls, marketing and projecting products made, primarily in Sri Lanka. There are over 35 stalls at the Food Mart at the festival serving authentic Sri Lankan food and beverages as well as non-authentic Sri Lankan food. A number of booths and stalls sell Sri Lankan products and services ranging from garments, gems & Jewellery, handicrafts, ornamental items, financial and banking services to astrological and ayurvedic services, among others.
                                </p>
                            </div>

                            <div className="footer-column w-col w-col-3">
                                <div className="footer-title">Contact us</div>
                                <div className="section-divider"></div>
                                <ul className="footer-list w-list-unstyled">
                                    <li className="footer-list-item">
                                        <p style={{color:'#b8b8b8'}}>
                                            <em>Organized by</em>
                                            <br></br>
                                            <strong>Sri Lanka Business Council of Japan</strong>
                                            <br></br>
                                            C/O Sri Lanka Embassy, 2 Chome-1-54 Takanawa, Minato, Tokyo 108-0074, Japan
                                            <br></br>
                                        </p>
                                    </li>
                                    <li className="footer-list-item">
                                        <a style={{color:'#b8b8b8'}} className="link footer-link"><strong>Call</strong>: 03-6868-8666</a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a style={{color:'#b8b8b8'}} className="link footer-link"><strong>Mail</strong>: info@srilankafestival.jp</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="footer-column w-col w-col-3">
                                <div className="footer-title">Links</div>
                                <div className="section-divider"></div>
                                <ul className="footer-list w-list-unstyled">
                                    <li className="footer-list-item">
                                       <a style={{color:'#b8b8b8'}} className="link footer-link">Frequently Asked Questions</a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a style={{color:'#b8b8b8'}} className="link footer-link">About the festival</a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a style={{color:'#b8b8b8'}} className="link footer-link">Our Restaurants</a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a style={{color:'#b8b8b8'}} className="link footer-link">Our Program</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* <div className="wrapper wrapper-full-page">
                    <div className="full-page login-page">
                        {this.props.children}
                        <footer className="footer">
                            <div className="container">
                                <nav className="pull-left">
                                    <ul>

                                    </ul>
                                </nav>
                                <p className="copyright pull-right">

                                    &copy;
                                <script>
                                        document.write(new Date().getFullYear())
                                </script>
                                    {Config.adminConfig.appName}


                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
                */}
                
            </div>
       
             
            
        )
    }
}
