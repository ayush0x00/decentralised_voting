import React from 'react';
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
const contract=new web3.eth.Contract(base_contract.abi,"0x8299CF04b670bc2426a5128FA869663903D8ebDC")



ReactDOM.render(
  <BrowserRouter>
  <Header />
  <Switch>
  <Route path="/addContestants" component={()=><AddVoter web3={web3 && web3} contract={contract&&contract} />}/>
  <Route path="/results" component={Results} />
  <Route path="/contestantDetails" component={ContestantDetails} />
  <Route path="/home" component={Home}/>
  <Redirect to="/home" />
  </Switch>
  </BrowserRouter>,document.getElementById('root')
)
