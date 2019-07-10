/*eslint no-useless-constructor: "off"*/
import React, {Component} from 'react';
import NavBar from './../ui/template/NavBar';
import CardUI from './../ui/template/Card';
import ReactTable from "react-table";
import firebase from '../config/database';
import SkyLight from 'react-skylight';
import Notification from '../components/Notification';
// import NavBarDefault from './../ui/template/NavBarDefault'

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      userDetails:[],
      pageLength:null,
      userRow:[],
      isApproved:false
    }

    this.getUserDataFromDatabase=this.getUserDataFromDatabase.bind(this);
    this.doApprove=this.doApprove.bind(this);
    this.doDelete=this.doDelete.bind(this);
    this.approveFieldAction=this.approveFieldAction.bind(this);
    this.deleteFieldAction=this.deleteFieldAction.bind(this);
    this.cancelDelete=this.cancelDelete.bind(this);
    this.cancelApprove=this.cancelApprove.bind(this);
  }
  componentDidMount(){
    //Uncomment if you want to do a edirect
    //this.props.router.push('/fireadmin/clubs+skopje+items') //Path where you want user to be redirected initialy
    this.getUserDataFromDatabase();
  }

  getUserDataFromDatabase(){
    var _this =this;

    const userRef = firebase.app.database().ref(`/users`);
    const allowedRef = firebase.app.database().ref(`/meta/config/allowedUsers`);

    var userDetails=[];
    
    userRef.orderByKey().once("value")
    .then(function(snapshot){
      snapshot.forEach(function(snap){
        var content = snap.val();
        var iscomplete = snap.val().iscomplete;
        var userRole = snap.val().userRole;
        if(userRole!=="visitor" && iscomplete===0){
          userDetails.push({
            key:snap.key,
            content
          })
        }
      })

      _this.setState({pageLength:userDetails.length,
        userDetails:userDetails,
        pageLength:userDetails.length
        
      })
    })
  }

  approveFieldAction(row){
    this.refs.approveDialog.show();

    this.setState({
      userRow:row
    })
   
  }

  doApprove(){
    const _this = this;

    var key = this.state.userRow.original.key;
    var email = this.state.userRow.original.content.email;
    var userRole = this.state.userRow.original.content.userRole;

    const allowedUserRef = firebase.app.database().ref('/meta/config/allowedUsers');

    const newUserRef = allowedUserRef.push();

    newUserRef.set({
      email:email,
      type:userRole
    }, function(error) {
      if (error) {
        console.log("erroe",error);
      } else {
        const ref = firebase.app.database().ref('users/'+key);
        ref.update({
          iscomplete:1
        })
        _this.refs.approveDialog.hide();
        _this.setState({notifications:[{type:"success",content:email+" approved successfully!"}]});
        _this.refreshDataAndHideNotification();
      }
    })
    


    
  }

  deleteFieldAction(row){
    this.refs.deleteDialog.show();

    this.setState({
      userRow:row
    })
  }

  doDelete(){
    const _this = this;

    var key = this.state.userRow.original.key;
    var email = this.state.userRow.original.content.email;

    const ref = firebase.app.database().ref('users/'+key);

    ref.remove(function(error) {
      if (error) {
        console.log("erroe",error);
      } else {
        _this.refs.deleteDialog.hide();
        _this.setState({notifications:[{type:"success",content:email+" removed successfully!"}]});
        _this.refreshDataAndHideNotification();
      }
    })
  }

  cancelDelete(){
    this.refs.deleteDialog.hide()
  }

  cancelApprove(){
    this.refs.approveDialog.hide();
  }

  generateNotifications(item){
    return (
        <div className="col-md-12">
            <Notification type={item.type} >{item.content}</Notification>
        </div>
    )
  }

  resetDataFunction(){
    this.getUserDataFromDatabase();
  }

  refreshDataAndHideNotification(refreshData=true,time=3000){
    //Refresh data,
    if(refreshData){
      this.resetDataFunction();
    }

    //Hide notifications
    setTimeout(function(){this.setState({notifications:[]})}.bind(this), time);
  }


  render() {
    const columns = [{
      Header: 'Full Name',
      accessor: 'content.fullName' // String-based value accessors!
    }, {
      Header: 'Email',
      accessor: 'content.email',
    },{
      Header: 'User Role', // Custom header components!
      accessor: 'content.userRole'
    }, {
      Header: 'Action',
      filterable:false,
      Cell: row => 
        <span>
          <button onClick={()=>this.approveFieldAction(row)} type="button" className="btn btn-success btn-sm">Approve</button>
          <button onClick={()=>this.deleteFieldAction(row)} type="button" className="btn btn-danger btn-sm">Delete</button>
        </span>
    }]
    return (
      <div className="content">
        <NavBar/>

        {/* NOTIFICATIONS */}
        {this.state.notifications?this.state.notifications.map((notification)=>{
            return this.generateNotifications(notification)
        }):""}

        <CardUI title="Approve Users">
          <ReactTable
            key={this.state.pageLength}
            data={this.state.userDetails}
            filterable
            columns={columns}
            className="-striped -highlight"
            defaultPageSize={this.state.pageLength}
            showPagination={false}  
          />
        </CardUI>

        <SkyLight hideOnOverlayClicked ref="deleteDialog" title="">
          <span><h4 className="center-block">Delete user</h4></span>
          <div className="col-md-12">
              <Notification type="danger" >Are you sure you want to delete this user?</Notification>
          </div>

          <div className="col-sm-12" style={{marginTop:80}}>
            <div className="col-sm-6">
            </div>
            <div className="col-sm-3 center-block">
              <a onClick={this.cancelDelete} className="btn btn-info center-block">Cancel</a>
            </div>
            <div className="col-sm-3 center-block">
              <a onClick={this.doDelete} className="btn btn-danger center-block">Delete</a>
            </div>

          </div>

        </SkyLight>

        <SkyLight hideOnOverlayClicked ref="approveDialog" title="">
          <span><h4 className="center-block">Approve user</h4></span>
          <div className="col-md-12">
              <Notification type="danger" >Are you sure you want to approve this user?</Notification>
          </div>

          <div className="col-sm-12" style={{marginTop:80}}>
            <div className="col-sm-6">
            </div>
            <div className="col-sm-3 center-block">
              <a onClick={this.cancelApprove} className="btn btn-info center-block">Cancel</a>
            </div>
            <div className="col-sm-3 center-block">
              <a onClick={this.doApprove} className="btn btn-danger center-block">Approve</a>
            </div>

          </div>

        </SkyLight>
      </div>

      
    )
  }
}
export default App;
