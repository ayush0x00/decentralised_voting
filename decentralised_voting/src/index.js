import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Web3 from 'web3';
import base_contract from "./contracts/base_contract.json"

const web3=new Web3("http://localhost:9545")
const contract= new web3.eth.Contract(base_contract.abi,"0x691E00CC42A2AAE4e96eD035976d1806D68bb08D");


ReactDOM.render(
  <Home web3={web3} contract={contract}/>,document.getElementById('root')
)
