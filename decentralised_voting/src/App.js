import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './Home';
import Header from './Header'
import AddVoter from './AddVoter';
import Results from "./Results";
import ContestantDetails from './ContestantDetails';
import Web3 from 'web3';
import base_contract from "./contracts/base_contract.json"

const web3=new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
console.log(web3.eth.accounts);
const contract=new web3.eth.Contract(base_contract.abi,"0x1A044c0EcA15398797db6325F861A11b797E74e9")

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      contestantId:"",
      ipfsHash:""
    }
    this.handleipfs=this.handleipfs.bind(this);
  }
  handleipfs(id,ipfsHash){
    this.setState({contestantId:id,ipfsHash:ipfsHash});
  }
  render(){
    return(
      <BrowserRouter>
      <Header />
      <Switch>
      <Route path="/addContestants" component={()=><AddVoter web3={web3 && web3} contract={contract&&contract} getipfsHash={this.handleipfs} previpfsHash={this.state.ipfsHash} />}/>
      <Route path="/results" component={Results} />
      <Route path="/contestantDetails" component={()=><ContestantDetails web3={web3 && web3} contract={contract&&contract} contestantId={this.state.contestantId} />} />
      <Route path="/home" component={Home}/>
      <Redirect to="/home" />
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
