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

let web3;
let contract;
async function loadingContract(){
    web3 = await new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/a2ecb7a0bb684c5d95627a967bdce072'));
    contract=await  new web3.eth.Contract(base_contract.abi,"0xD246AEE1C357A0164d767ec0d4A85081229b2174").deploy();
  //console.log(contract);
}

loadingContract();


ReactDOM.render(
  <BrowserRouter>
  <Header />
  <Switch>
  <Route path="/addContestants" render={()=><AddVoter web3={web3} contract={contract} />}/>
  <Route path="/results" component={Results} />
  <Route path="/contestantDetails" component={ContestantDetails} />
  <Route path="/home" component={Home}/>
  <Redirect to="/home" />
  </Switch>
  </BrowserRouter>,document.getElementById('root')
)
