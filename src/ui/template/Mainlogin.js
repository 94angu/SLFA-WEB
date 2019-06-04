import React, { Component } from 'react'
import Config from '../../config/app';

const ConditionalDisplay = ({condition, children}) => condition ? children : <div></div>;

export default class MainloginUI extends Component {

    constructor(props) {

        super(props);
        this.state = {
            displayName: '',
            username: '',
            password: '',
            isResetPassword: false
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeDisplayName = this.handleChangeDisplayName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeDisplayName(event){
        this.setState({ displayName: event.target.value }); 
    }   

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        //alert('Username: ' + this.state.username+ " Password: "+this.state.password);
        if(!this.state.isResetPassword){
            //when login
            this.props.authenticate(this.state.username, this.state.password, this.state.displayName);
        }else{
            this.props.sendPasswordResetLink(this.state.username);
            this.setState({isResetPassword:false})
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="wrapper wrapper-full-page">
                    <div className="full-page login-page">
                        <div className="content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">        
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="card card-login">
                                                    <div className="card-header text-center" data-background-color="rose">
                                                        <h4 className="card-title">{
                                                            this.state.isResetPassword?"Reset Password":"Login"
                                                        }</h4>
                                                    </div>
                                                    <div className="card-content">
                                                        {this.props.showGoogleLogin()}
                                                        <h4>{this.props.error}</h4>
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="material-icons">email</i>
                                                            </span>
                                                            <div className="form-group label-floating">
                                                                <label className="control-label">Email address</label>
                                                                <input type="email" value={this.state.username} onChange={this.handleChangeUsername} className="form-control" />
                                                            </div>
                                                        </div>
                                                        <ConditionalDisplay condition={!this.state.isResetPassword}>
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="material-icons">lock_outline</i>
                                                            </span>
                                                            
                                                            <div className="form-group label-floating">
                                                                <label className="control-label">Password</label>
                                                                <input type="password" value={this.state.password} onChange={this.handleChangePassword} className="form-control" />
                                                            </div>
                                                           
                                                        </div>
                                                        </ConditionalDisplay>
                                                    </div>
                                                    <div className="footer text-center">
                                                        <input type="submit" className="btn btn-rose btn-simple btn-wd btn-lg" />
                                                    </div>
                                                    <div style={{"textAlign": "center"}}>
                                                        <a onClick={()=>{ this.setState({isResetPassword: !this.state.isResetPassword} )}} role="button">{
                                                            !this.state.isResetPassword?"Forgot your password?":"Back to Login"
                                                        }</a>
                                                    </div>
                                                </div>
                                            </form>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
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
        )
    }
}
