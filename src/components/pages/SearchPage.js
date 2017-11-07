import React from 'react';
import axios from 'axios';
import BarChart from '../barChart.js';
import PropTypes from 'prop-types';
import '../../styles/searchPage.css';
import '../../styles/switch.css';

const mappingObject =
{
  "Population" : "akooakhuanraaoahoowh",
  "Average_Height":"rahoworcrarrwo_acwoahrracao",
  "Mass":"scracc",
  "akooakhuanraaoahoowh":"Population",
  "rahoworcrarrwo_acwoahrracao":"Average_Height",
  "scracc":"Mass",
  "name":"whrascwo",
  "whrascwo":"name",
}

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      searchTerm:"",
      error : "",
      isLoading : false,
      chartData:[],
      lukeWalkerSearches:0,
      yLabel:'Population',
      searchCriteria:'Planets',
      showWookieEncoding:false,
      nameLabel:'name'
    };
  }

  componentDidMount(){

    const self = this;
    if(this.props.userName !== "Luke Skywalker"){
      setInterval(function(){
        self.setState({
        lukeWalkerSearches:0,
        error:'',
        })
      }, 60000);
    }
  }

  handleChange=(e)=>{
    if(this.state.lukeWalkerSearches < 15){
      if (e.target.value.trim()==="") {
        this.setState({
          searchTerm : e.target.value,
          chartData:[]
        });
        return ;
      }
      const SEARCH_TERM = e.target.value;
      let URL = `http://swapi.co/api/${this.state.searchCriteria.toLowerCase()}/?search=${SEARCH_TERM}`;

      URL = !this.state.showWookieEncoding ? URL : URL+'&format=wookiee'

      this.setState({
        searchTerm : e.target.value,
        isLoading : true,
        chartData:[],
        error:""
      });

      axios.get(`${URL}`).then((resp)=>{
        if(this.state.showWookieEncoding){
          let parsedObject = JSON.parse(resp.data.replace(/whhuanan/g ,'"whhuanan"'))

          if (parsedObject.rcwochuanaoc.length===0) {
            this.setState({
              isLoading : false,
              error : `${this.state.searchCriteria} entered by you doesn't exist`,
              chartData: [],
              lukeWalkerSearches : this.props.userName !== "Luke Skywalker" ? ++this.state.lukeWalkerSearches : 0
            });
          }else{
            const finalResult = this.renderModifiedList(parsedObject.rcwochuanaoc);
            this.setState({
              isLoading : false,
              chartData: finalResult,
              lukeWalkerSearches : this.props.userName !== "Luke Skywalker" ? ++this.state.lukeWalkerSearches : 0
            });
          }

        }else{
          if (resp.data.results.length===0) {
            this.setState({
              isLoading : false,
              error : `${this.state.searchCriteria} entered by you doesn't exist`,
              chartData: [],
              lukeWalkerSearches : this.props.userName === "Luke Skywalker" ? ++this.state.lukeWalkerSearches : 0
            });
          }else{
            const finalResult = this.renderModifiedList(resp.data.results);
            this.setState({
              isLoading : false,
              chartData: finalResult,
              lukeWalkerSearches : this.props.userName === "Luke Skywalker" ? ++this.state.lukeWalkerSearches : 0
            });
          }
        }
      });
    }else{
      this.setState({
        error : `Search Limit Exhausted`,
        chartData: [],
        searchTerm : e.target.value,
      });
    }

  }

  handleLogOut=()=>{
    this.props.onLogOut();
  }

  renderModifiedList=(arrayElements=[])=> {
    return arrayElements.map((individualElement,i)=>{
      if(individualElement[this.state.yLabel.toLowerCase()] !== "unknown"){
        individualElement.value = parseInt(individualElement[this.state.yLabel.toLowerCase()],10);
      }else{
        individualElement.value = 0
      }
      return individualElement;
    })
  }

  changeSelection=(event)=>{
    this.setState({
      searchCriteria:event.target.value ,
      searchTerm:'',
      yLabel: !this.state.showWookieEncoding ? event.target.getAttribute('data-yLabel') : mappingObject[event.target.getAttribute('data-yLabel')] ,
      chartData:[],
      error:""
    });
  }

  showWookieEncoding=()=>{
    this.setState({
      showWookieEncoding:!this.state.showWookieEncoding,
      yLabel: mappingObject[this.state.yLabel],
      nameLabel:mappingObject[this.state.nameLabel],
      chartData: [],
      searchTerm:''
    })
  }

  render(){
    const {isLoading, error} = this.state;
    const searchPlaceHolder = `Enter the ${this.state.searchCriteria} name`;
    const loader = isLoading ? <div className = "loaderBackground"><div className="loader"></div></div> : null;

    return(
      <div className = "searchPageContainer">
        {loader}
        <div className = "starWarsSearchPanel" >
          <div className="starWarsSearchBox">
            <input className="starWarsTextBox"
              placeholder={searchPlaceHolder}
              value={this.state.searchTerm}
              onChange={this.handleChange}
              disabled = {this.state.isLoading}
              />
            <div style={{textAlign:'center',float:'right'}}>
              <button  className="btn btn-danger" onClick={this.handleLogOut} className="starWarsButton logout" >LOGOUT</button>
            </div>
         </div>
           <div>Wookie Encoding</div>
           <label className="switch">
            <input type="checkbox" className = "wookieCheckBox" onChange={this.showWookieEncoding}/>
            <span className="slider round"></span>
          </label>
         <div className = "radioButton">
           <input className = "planets radioButtonGroup" onChange = {this.changeSelection} data-yLabel = "Population" type="radio" name="selection" defaultValue="Planets" defaultChecked/> Planets
         </div>
         <div className = "radioButton">
           <input className = "species radioButtonGroup" onChange = {this.changeSelection} data-yLabel = "Average_Height" type="radio" name="selection" defaultValue="Species"/> Species
         </div>
         <div className = "radioButton">
           <input className = "people radioButtonGroup" onChange = {this.changeSelection} data-yLabel = "Mass" type="radio" name="selection" defaultValue="People"/> People
         </div>
        </div>
        <h4 style={{textAlign:'center',color:'red'}}>{error}</h4>
          {
           this.state.chartData.length > 0
              &&
            <div className = "barCharWrapper">
              <BarChart nameLabel = {this.state.nameLabel} wookieEncoding = {this.state.showWookieEncoding} data = {this.state.chartData} searchCriteria = {this.state.searchCriteria} yLabel = {this.state.yLabel}/>
           </div>
          }
      </div>
    );
  }

}

SearchPage.propTypes = {
  onLogOut: PropTypes.func
};

export default SearchPage;
