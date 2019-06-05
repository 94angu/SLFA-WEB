import React, {Component} from 'react';
import firebase from '../config/database'
import Config from '../config/app';
import MainloginUI from '../ui/template/Mainlogin';
import * as firebaseCLASS from 'firebase';
import {Redirect} from 'react-router-dom'
// import {Redirect} from 'react-router'
import {fakeAuth} from '../Auth'
require("firebase/firestore");

class Mainlogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            error:'',
            isLogin:true,
           
        };

        this.authenticateLogin = this.authenticateLogin.bind(this);
        this.changeIsLogin = this.changeIsLogin.bind(this);
        this.showGoogleLogin = this.showGoogleLogin.bind(this);
       
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
    const authlogin=(userRole) =>{
      this.props.authlogin(userRole)
    } 

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
                  authlogin(userRole)
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
                      authlogin(userRole),
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
                      console.log("main login fake auth"),
                      // fakeAuth.authenticate(),
                      console.log("main login fake auth",userRole),
                      // authlogin(userRole),
                      console.log("main login fake auth"),
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
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
      // //check the visitor
      // const userRef = firebase.app.database().ref(`/users`);
      // const allowedRef = firebase.app.database().ref(`/meta/config/allowedUsers`);
      // userRef.orderByChild("email").equalTo(user.email).once("value")
      //   .then(snapshot => {
      //     if(snapshot.val()){
      //       userRef.orderByKey().once("value")
      //       .then(function(snapshot){
      //         snapshot.forEach(function(childSnapshot){
      //           var email = childSnapshot.val().email;
      //           var userRole = childSnapshot.val().userRole;
      //           if(email===user.email && userRole==="visitor"){
      //             console.log("Google auth userRole :"+userRole)
      //             fakeAuth.authenticate()
      //             console.log("Google auth userRole :"+fakeAuth.isAuthenticated)
      //             authlogin(userRole)

      //             .catch(function (error) {
      //               // Handle Errors here.
      //               console.log(error.message);
      //               displayError(error.message);
      
      //             });
      //           }else if(email===user.email && userRole==="vendor"){
      //             console.log("userRole :"+userRole)
      //             allowedRef.orderByChild("email").equalTo(user.email).once("value")
      //             .then(snap => {
      //               if(snap.val()){
      //                 fakeAuth.authenticate()
      //                 authlogin(userRole)

      //                 .catch(function (error) {
      //                   // Handle Errors here.
      //                   console.log(error.message);
      //                   displayError(error.message);
          
      //                 });
      //               }else{
      //                 displayError("This user doens't have access to this vendor panel!");
      //               }
      //             })
      //           } else if(email===user.email && userRole==="admin"){
      //             console.log("userRole :"+userRole)
      //             allowedRef.orderByChild("email").equalTo(user.email).once("value")
      //             .then(snap => {
      //               if(snap.val()){
      //                 fakeAuth.authenticate(),
      //                 authlogin(userRole)

      //                 .catch(function (error) {
      //                   // Handle Errors here.
      //                   console.log(error.message);
      //                   displayError(error.message);
          
      //                 });
      //               }else{
      //                 displayError("This user doens't have access to this admin panel!");
      //               }
      //             })
      //           }
                
      //         })
      //       })
      //     }else{
      //       console.log("user not found")
      //       displayError("user not found");
      //     }
      //   })
      //   .catch(function (error) {
      //     // Handle Errors here.
      //     console.log(error.message);
      //     displayError(error.message);

      //   });
      
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

    render(){
      
      if(fakeAuth.isAuthenticated === true){
        console.log("main login fake auth :",fakeAuth.isAuthenticated)
        return(
          <Redirect to="/"/>
        )
      }
      // return(
      //   <div>
      //     <p>You must log in</p>
      //     <button onClick={this.login}>login</button>
      //   </div>
      // )
        return(
            <MainloginUI
            showGoogleLogin={this.showGoogleLogin}
            authenticate={this.authenticateLogin}
            error={this.state.error}
            isRegister={!this.state.isLogin}
            changeIsLogin={this.changeIsLogin}
            sendPasswordResetLink={this.sendPasswordResetLink}
            />
        )
    }
}

export default Mainlogin;