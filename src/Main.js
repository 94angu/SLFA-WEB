import React,{Component}  from 'react';
import User from './containers/User';
import Landingpage from './containers/Landingpage'
import Program from './containers/Program'
import About from './containers/About'
import Centre from './containers/Centre'
import Products from './containers/Products'
import Dashboard from './containers/Dashboard'
import Mainlogin from './containers/Mainlogin';
import Mainregister from './containers/Mainregister';
// import {Router, Route, hashHistory,Link,IndexRoute,withRouter,Redirect} from 'react-router'
import {BrowserRouter as Router,Route,Link,Redirect,withRouter,hashHistory} from 'react-router-dom'
// import { Router, Route,hashHistory,Redirect} from 'react-router'
import HomeUI from './ui/template/Home';
import HeaderUI from './containers/HeaderUI';
import {AuthButton,PrivateRoute,Login,fakeAuth} from './Auth'
import Config from   './config/app';
import firebase from './config/database'
import Master from './containers/Master'

class Main extends Component{
    constructor(props){
      console.log("MAIN : Constructor");
        super(props);

        this.state = {
            error:'',
            currentUser:this.props.userRole,
            isLoggedIn:this.props.Loggedin,
            user:{}

        };

        this.authLogin = this.authLogin.bind(this);
        this.authListener = this.authListener.bind(this);

    }

    componentWillMount(){
      console.log("MAIN : ComponentWillMount");
      this.setState({
        currentUser:this.props.userRole,
        isLoggedIn:this.props.Loggedin
      })
    }

    componentDidMount() {
      console.log("MAIN : ComponentDidMount");
      this.authListener();
    }
  
    /**
     * Function that start the Firebase listener for authentication change
     */
     authListener(){
        const setUser=(user)=>{
          this.setState({user:user})
        }
  
        //Now do the listner
        firebase.app.auth().onAuthStateChanged(function(user) {
          if (user) {
            setUser(user);
            fakeAuth.authenticate(true);
            // User is signed in.
            console.log("MAIN : User has Logged  in Master");
            // console.log("is auth Master",fakeAuth.isAuthenticated);
            if(window.setSideBG){
              window.setSideBG(Config.adminConfig.design.sidebarBg);
            }
            
          } else {
            // No user is signed in.
            console.log("MAIN : User has logged out Master");
          }
        });
    }

    authLogin(userRole){
      const setUser=(user)=>{
        this.setState({
          currentUser:user,
          isLoggedIn:true
        })
      }
      console.log("auth login",userRole);
      fakeAuth.authenticate(true);
      setUser(userRole);
      <Redirect to='/about'/>
      
      console.log("main fakeauth"+fakeAuth.isAuthenticated);
      // fakeAuth.authenticate(()=>this.setState({isLoggedIn:true}));
    }

    authLogout(){
      fakeAuth.signout(()=>this.setState({isLoggedIn:false}));
      
      <Redirect to='/' />
    }

    render(){
      console.log("MAIN : State current user - "+this.state.currentUser)
      console.log("MAIN : State isloggedin - "+this.state.isLoggedIn)
      console.log("MAIN : Props isloggedin - "+this.props.Loggedin)
      console.log("MAIN : Props userRole - "+this.props.userRole)
        return(
          
            <Router history={hashHistory}>
              
              <HeaderUI currentUser={this.props.userRole}>
                <Route exact path={"/"} component={Landingpage}/>
                <Route path="/landing" component={Landingpage}/>
                <Route path="/about" component={About}/>
                <Route path="/centre" component={Centre}/>
                <Route path="/products/:id" component={Products}/>
                <Route path="/program" component={Program}/>
                <Route path="/login" component={(props)=>
                  <Mainlogin 
                    authlogin={this.authLogin}
                    {...props}
                  />}
                />
                <Route path="/register" component={Mainregister}/>
                <PrivateRoute path="/dashboard" currentUser={this.props.userRole} component={()=>
                  <Dashboard 
                    currentUser={this.props.userRole}
                  />}
                />  
                <PrivateRoute path="/account" component={User}/>
              </HeaderUI>
              
            </Router>

          // <Router history={hashHistory}>
          //   <Route path="/" component={(props)=>
          //       <HeaderUI 
          //         currentUser={this.state.currentUser}
          //         {...props}
          //       />}>
          //     <IndexRoute component={Landingpage}/>
          //     <Route path="/landing" component={Landingpage}/>
          //     <Route path="/about" component={About}/>
          //     <Route path="/Centre" component={Centre}/>
          //     <Route path="/program" component={Program}/>
              
          //     <Route path="/login" component={(props)=>
          //       <Mainlogin 
          //         authlogin={this.authLogin}
          //         setCurrentUser={this.setCurrentUser}
          //         {...props}
          //       />}
          //     />
          //     <Route path="/register" component={Mainregister}/>
          //     {/* <PrivateRoute path="/dashboard" component={()=>
          //       <Dashboard 
          //         currentUser={this.state.currentUser}
          //       />}
          //     />   */}
          //   </Route>
          //   <Route path="/account" component={User}></Route>
          // </Router>

          
           
            // <Router history={hashHistory}>
               
            //     <Route component={Home} >
            //         {/* make them children of `Master` */}
                    // <Route path={"/"} component={Landingpage}></Route>
                    // <Route path="/landing" component={Landingpage}/>
                    // <Route path="/about" component={About}/>
                    // <Route path="/Centre" component={Centre}/>
                    // <Route path="/contact" component={Contact}/>
                    // <Route path="/login" component={Mainlogin}/>
                    // <Route path="/register" component={Mainregister}/>
                    // <PrivateRoute path="/dashboard" component={Dashboard}/>
               
            //     </Route>
            // </Router>
            // <Home/>

            // <Router  history={hashHistory}>
            //     <AuthProvider>
                
            //     <Switch>
            //         {/* <ProtectedRoute path="/dashboard" component={Dashboard} />
            //         <Route path="/" component={Landing} /> */}
            //         <Route component={Home} >
            //         {/* make them children of `Master` */}
            //             <Route path={"/"} component={Landingpage}></Route>
            //             <Route path="/landing" component={Landingpage}/>
            //             <Route path="/about" component={About}/>
            //             <Route path="/Centre" component={Centre}/>
            //             <Route path="/contact" component={Contact}/>
            //             <Route path="/login" component={Mainlogin}/>
            //             {/* <ProtectedRoute path="/dashboard" component={Dashboard} /> */}
            //         </Route>
            //     </Switch>
            //     </AuthProvider>
            // </Router>
        );
    }
}

export default Main;
