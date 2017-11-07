import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName : "",
      pwd : ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {userName, pwd} = this.state;
    this.props.onSubmit(userName, pwd);
  }

  handleInputChange(e) {
    const {name,value} = e.target;
    this.setState({
      [name] : value
    });
  }

  render() {

    const {userName, pwd} = this.state;
    const {isLoading, error} = this.props;
    const disabled = isLoading?"disabled":"";

    return (
      <div className="loginBoxWrapper" >
        <div className = "starWarsLoginLabel">Login With Name & DOB</div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="starWarsTextBox"
              placeholder="Enter username"
              name="userName"
              value={userName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
              <input
                type="password"
                className="starWarsTextBox"
                placeholder="Enter password"
                name="pwd"
                value={pwd}
                onChange={this.handleInputChange}
              />
          </div>
          <div className = "loginButtonContainer">
            <button ref = "loginButton" type="submit" className="starWarsButton" disabled={disabled}>LOGIN</button>
          </div>
        </form>
        <h4 style={{textAlign:'center',color:'red'}}>{error.login}</h4>
      </div>
    );
  }
}

Login.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  onSubmit: PropTypes.func
};

export default Login;
