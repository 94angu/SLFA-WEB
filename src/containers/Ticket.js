/*eslint array-callback-return: "off"*/
import React, { Component } from 'react'
import firebase from '../config/database'
import Config from   './../config/app'
import Card from './../ui/template/Card'
import SkyLight from 'react-skylight';


var md5 = require('md5');
const ConditionalDisplay = ({condition, children}) => condition ? children : <div></div>;

export default class Ticket extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      user: {}
    }

    
    this.authListener = this.authListener.bind(this);
    this.purchaseTicket = this.purchaseTicket.bind(this);
    this.cancelPurchase = this.cancelPurchase.bind(this);

  }

  componentDidMount(){
    this.authListener();
  }
  
  authListener(){
    const setUser=(user)=>{
    this.setState({user:user})
    }

    //Now do the listner
    firebase.app.auth().onAuthStateChanged(function(user) {
    if (user) {
        setUser(user);
        // User is signed in.
        console.log("User has Logged  in Master");
        console.log(user.email);
        
    } else {
        // No user is signed in.
        console.log("User has logged out Master");
    }
    });

    }

    purchaseTicket(){
        this.refs.puchaseTicket.show();
    }

    cancelPurchase(){
        this.refs.puchaseTicket.hide();
      }

render() {
    return (
        <div className="wrapper wrapper-full-page">
        <div className="full-page landing-page">
            <div className="content">
                <div className="section intro-section">
                    <div className="container w-container">
                        <div className="section-title-wrapper intro">
                            <h2 className="section-title">Gifts & Tickets</h2>
                            <div className="section-divider"></div>
                            <div className="section-title subtitle">
                            </div>
                        </div>

                        <div className="card">
                            <div style={{margin:"20px"}} className="card-body">
                            <div className="card-title"><h4 style={{marginBottom:"0px"}}>Gifts</h4> Claim your gift for your successful registration</div>
                            <hr/>
                            <div className="col-lg-5 col-md-5 col-xs-5">
                                <p>Successful Registration gift</p>
                            </div>
                            <div className="col-lg-5 col-md-5 col-xs-5">
                                <p>AGHK356</p>
                            </div>
                            <div className="col-lg-2 col-md-2 col-xs-2">
                                <div className="badge badge-primary">Available</div>
                            </div>
                            <hr/>

                            </div>
                        </div>

                        <div className="card">
                            <div style={{margin:"20px"}} className="card-body">
                                <div className="card-title">
                                    <h4 style={{marginBottom:"0px"}}>
                                        <button onClick={()=>this.purchaseTicket()} style={{float:"right"}} type="button" className="btn btn-primary">Purchase Ticket</button>
                                        Ticket Purchase
                                    </h4>
                                    Your gifts vouchers to claim
                                </div> 
                                    
                                
                                
                                <hr/>
                                <div className="col-lg-5 col-md-5 col-xs-5">
                                    <p>Raffel ticket</p>
                                </div>
                                <div className="col-lg-5 col-md-5 col-xs-5">
                                    <p>HJK876</p>
                                </div>
                                <div className="col-lg-2 col-md-2 col-xs-2">
                                    <div className="badge badge-primary">Raffle</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
            
            </div>
        
        </div>

        <SkyLight hideOnOverlayClicked ref="puchaseTicket" title="">
          <span><h3>Purchase Ticket</h3></span>
          <div className="col-md-12">
              <h5>Your Ticket No : KJU498</h5>
          </div>
          <div className="col-sm-12" style={{marginTop:80}}>
            <p>Are you sure you want to purchase the ticket?</p>
            <div className="col-sm-3 center-block">
              <a onClick={this.cancelPurchase} className="btn btn-info center-block">Cancel</a>
            </div>
            <div className="col-sm-3 center-block">
              <a onClick={this.purchase} className="btn btn-danger center-block">Purchase</a>
            </div>

          </div>

        </SkyLight>
    </div>
    )
  }
}
