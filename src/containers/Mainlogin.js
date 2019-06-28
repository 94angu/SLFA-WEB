import React, {Component} from 'react';
import firebase from '../config/database'
import MainloginUI from '../ui/template/Mainlogin';
import * as firebaseCLASS from 'firebase';
import {Redirect} from 'react-router-dom'
// import {Redirect} from 'react-router'
require("firebase/firestore");

class Mainlogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            error:'',
            isLogin:true,
            isRegistered:false,
            user:{},
           
        };

        this.authenticateLogin = this.authenticateLogin.bind(this);
        this.createUser = this.createUser.bind(this);
        this.changeIsLogin = this.changeIsLogin.bind(this);
        this.showGoogleLogin = this.showGoogleLogin.bind(this);
       
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
      } 
    });
    }

    login = () =>{
      console.log("button clicked"+this.props.isLoggedIn)
      this.props.authlogin();
    
        // fakeAuth.authenticate(()=>{
          // this.setState(()=>({
          //   redirectToReferrer:true
          // }))
        // })
    }
    /**
   * update login/register state 
   * @param {boolean} isLogin 
   */
  changeIsLogin(isLogin) {
    this.setState({
      isLogin: isLogin
    })
  }

  authenticateLogin(username, password, displayName) {
    const displayError = (error) => {
      this.setState({ error: error });
    }
    // const authlogin=(userRole) =>{
    //   this.props.authlogin(userRole)
    // } 

    //check the visitor
    const userRef = firebase.app.database().ref(`/users`);
    const allowedRef = firebase.app.database().ref(`/meta/config/allowedUsers`);
    userRef.orderByChild("email").equalTo(username).once("value")
      .then(snapshot => {
        if(snapshot.val()){
          userRef.orderByKey().once("value")
          .then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
              var email = childSnapshot.val().email;
              var userRole = childSnapshot.val().userRole;
              if(email===username && userRole==="visitor"){
                console.log("userRole :"+userRole)
                firebase.app.auth().signInWithEmailAndPassword(username, password)
                .then(    
                  // authlogin(userRole)
                )
                .catch(function (error) {
                  // Handle Errors here.
                  console.log(error.message);
                  displayError(error.message);
    
                });
              }else if(email===username && userRole==="vendor"){
                console.log("userRole :"+userRole)
                allowedRef.orderByChild("email").equalTo(username).once("value")
                .then(snap => {
                  if(snap.val()){
                    firebase.app.auth().signInWithEmailAndPassword(username, password)
                    .then(    
                      // authlogin(userRole),
                    )
                    .catch(function (error) {
                      // Handle Errors here.
                      console.log(error.message);
                      displayError(error.message);
        
                    });
                  }else{
                    displayError("This user doens't have access to this vendor panel!");
                  }
                })

                // if(Config.adminConfig.allowedUsers != null && Config.adminConfig.allowedUsers.indexOf(username) === -1){
                //   //Error, this user is not allowed anyway
                //   displayError("This user doens't have access to this vendor panel!");
                // }else{
                //     firebase.app.auth().signInWithEmailAndPassword(username, password)
                //     .then(    
                //       authlogin,
                //       setCurrentUser(userRole)
                //     )
                //     .catch(function (error) {
                //       // Handle Errors here.
                //       console.log(error.message);
                //       displayError(error.message);
        
                //     });
                // }
              } else if(email===username && userRole==="admin"){
                console.log("userRole :"+userRole)
                allowedRef.orderByChild("email").equalTo(username).once("value")
                .then(snap => {
                  if(snap.val()){
                    firebase.app.auth().signInWithEmailAndPassword(username, password)
                    .then(    
                      // authlogin(userRole),
                      
                    )
                    .catch(function (error) {
                      // Handle Errors here.
                      console.log(error.message);
                      displayError(error.message);
        
                    });
                  }else{
                    displayError("This user doens't have access to this admin panel!");
                  }
                })
              }
              
            })
          })
        }else{
          console.log("user not found")
          displayError("user not found");
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error.message);
        displayError(error.message);

      });
    

    // if (Config.adminConfig.allowedUsers != null && Config.adminConfig.allowedUsers.indexOf(username) === -1) {
    //   //Error, this user is not allowed anyway
    //   displayError("This user doens't have access to this admin panel!");
    // } else {
    //   // this.props.authlogin();

    //   console.log("found email start");
    //   firebase.app.database().ref(`/users`).orderByChild("email").equalTo(username).once("value")
    //   .then(snapshot => {
    //       if (snapshot.val()) {
    //         console.log(" snapshot found email");
    //         firebase.app.auth().signInWithEmailAndPassword(username, password)
    //         .then(    
    //           this.props.authlogin()
    //         )
    //         .catch(function (error) {
    //           // Handle Errors here.
    //           console.log(error.message);
    //           displayError(error.message);

    //         });
    //       }
    //   })
     
    // }
  }

  /**
   * Send password reset link
   * @param {String} emailAddress 
   */
  sendPasswordResetLink(emailAddress){
    firebase.app.auth().sendPasswordResetEmail(emailAddress).then(function() {
      alert("Password reset email is sent on your email "+emailAddress);
    }).catch(function(error) {
      alert(error.message)
    });
  }

  // authenticateRegister(username, password, displayName) {
  //   const displayError = (error) => {
  //     this.setState({ error: error });
  //   }

  //   firebase.app.auth().createUserWithEmailAndPassword(username, password)
  //     .then(
  //       function (data) {
  //         firebase.app.auth().currentUser.updateProfile({
  //           displayName: displayName
  //         })
  //       }
  //     )
  //     .catch(function (error) {
  //       // Handle Errors here.
  //       console.log(error.message);
  //       displayError(error.message);

  //     });

  // }


  authWithGoogle() {
    const displayError = (error) => {
      this.setState({ error: error });
    }
    const authlogin=(userRole) =>{
      this.props.authlogin(userRole)
    } 

    var provider = new firebaseCLASS.auth.GoogleAuthProvider();
    firebase.app.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log("USER"+user.email);
      // const userRef = firebase.app.database().ref(`/users`);
      // userRef.orderByChild("email").equalTo(user.email).once("value")
      // .then(snapshot => {
      //   if(snapshot.val()){
      //     console.log("USER have registered");
      //   }else{
      //     // firebase.app.auth().signOut();
      //     console.log("USER not registered");
      //   }
     
    }).catch(function (error) {
      // Handle Errors here.
      //var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
      console.log(errorMessage);
      // ...
    });
  }

  showGoogleLogin() {
    // console.log(Config.adminConfig);
    // if (Config.adminConfig.allowedUsers != null && Config.adminConfig.allowedUsers.length > 0 && Config.adminConfig.allowGoogleAuth) {
    //   return (<div>
    //     <p className="category text-center">
    //       <a onClick={this.authWithGoogle} className="btn btn-social btn-fill btn-google">
    //         <i className="fa fa-google"></i>&nbsp;&nbsp;&nbsp;Login with google
    //         </a>
    //     </p>
    //     <br />
    //     <p className="category text-center">Or login using email</p>
    //   </div>)
    // } else {
    //   return (<div></div>)
    // }

    return(
      <div>
        <p className="category text-center">
          <a onClick={this.authWithGoogle} className="btn btn-social btn-fill btn-google">
            <i className="fa fa-google"></i>&nbsp;&nbsp;&nbsp;Login with google
            </a>
        </p>
        <br />
        <p className="category text-center">Or login using email</p>
      </div>
    )
   
  }

  createUser(fullName,dob,gender,tele,nationality,job){
    // console.log("MAIN LOGIN : createUser ")
    const _this = this;
    var usersRef = firebase.app.database().ref("users");
    var newUsersRef = usersRef.push();
    
    newUsersRef.set({
      email: this.state.user.email,
      fullName: fullName,
      userRole: "visitor",
      dateofbirth:dob,
      gender:gender,
      telephone:tele,
      nationality:nationality,
      job:job,
      iscomplete:0
    },function(error){
      if(error){
        console.log(error);
      }else{
        _this.setState({
          isRegistered:true
        });
      }
    })

    _this.setState({
      isRegistered:true
    });

    

  }

    render(){
      
      // if(this.props.isLoggedIn === true){
        // console.log("MAIN LOGIN : isLoggedIn - ",this.props.isLoggedIn)
        // console.log("MAIN LOGIN : isRegistereduser - ",this.props.isRegisteredUser)
        // return(
        //   <Redirect to="/"/>
        // )
      // }
      // console.log("MAIN LOGIN : isLoggedIn - ",this.props.isLoggedIn)
      // console.log("MAIN LOGIN : isRegistereduser - ",this.props.isRegisteredUser)
      // console.log("MAIN LOGIN : isRegistered - ",this.state.isRegistered)

      if(this.state.isRegistered===true){
        return(
          <Redirect to="/ticket"/>
        )
      }
      
      if(this.props.isLoggedIn === true && this.props.isRegisteredUser){
        return(
          <Redirect to="/"/>

        )
      }
      
        return(
            <MainloginUI
            showGoogleLogin={this.showGoogleLogin}
            authenticate={this.authenticateLogin}
            createUser={this.createUser}
            user={this.state.user}
            error={this.state.error}
            isRegisteredUser={this.props.isLoggedIn ? this.props.isRegisteredUser : true}
            isRegister={!this.state.isLogin}
            changeIsLogin={this.changeIsLogin}
            sendPasswordResetLink={this.sendPasswordResetLink}
            />
        )
    }
}

export default Mainlogin;