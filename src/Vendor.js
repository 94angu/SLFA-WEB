import React, { Component } from 'react';

import MasterVendor from './containers/MasterVendor'
import App from './containers/App'
import Firevendor from './containers/Firevendor'
import Firestorevendor from './containers/Firestorevendor'
import Push from './containers/Push'
import User from './containers/User'

import { Router, Route,hashHistory} from 'react-router'

class Vendor extends Component {

  render() {

    return (
      <Router history={hashHistory}>
          <Route path="/account" component={User}></Route>
          <Route component={MasterVendor} >
            {/* make them children of `Master` */}
            <Route path={"/"} component={App}></Route>
            <Route path="/app" component={App}/>
            <Route path="/push" component={Push}/>
            <Route path="/firevendor" component={Firevendor}/>
            <Route path="/firevendor/:sub" component={Firevendor}/>
            <Route path="/firestorevendor" component={Firestorevendor}/>
            <Route path="/firestorevendor/:sub" component={Firestorevendor}/>


          </Route>
        </Router>
    );

   }

    
  }


export default Vendor;
