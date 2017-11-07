// This component handles the App template used on every page.
import React from 'react';
import axios from 'axios';

import LogIn from './home/LogIn';
import SearchPage from './pages/SearchPage';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName : "",
      pwd : "",
      isLoggedIn : false,
      isLoading : false,
      error : {
        login : "",
        search : ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleSubmit(userName,pwd) {
    const USER_NAME = userName.trim();
    if (USER_NAME==="" || pwd.trim()==="") {
      this.setState({
        error : {login : "Please enter username and password"}
      });
      return ;
    }

    const URL = `https://swapi.co/api/people/?search=`;
    this.setState({
      isLoading : true,
      userName,
      pwd
    });

    axios.get(`${URL+USER_NAME}`).then((resp)=>{
      if (resp.data.results.length===0){
        this.setState({
          error : {login : "Username or Password is incorrect"},
          isLoading : false
        });

      }else{
        resp.data.results.every((result)=>{
          if (result.name===USER_NAME && result.birth_year===pwd) {
            this.setState({
              error : {login : ""},
              isLoading : false,
              isLoggedIn : true,
              userName:userName,
            });
            return false;
          }
          return true;
        });
        if(!this.state.isLoggedIn){
          this.setState({
            error : {login : "UserName or Password is incorrect"},
            isLoading : false
          });
        }
      }
    });
  }

  handleLogOut(){
    this.setState({
      userName:"",
      pwd:"",
      isLoggedIn:false
    });
  }

  render() {
    const {isLoggedIn, error, isLoading} = this.state;
    return (
      <div className="container" >
        {isLoggedIn ? (
          <SearchPage
            onLogOut={this.handleLogOut}
            userName = {this.state.userName}
          />
        ) : (
          <LogIn
            onSubmit={this.handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    );
  }
}

export default App;
