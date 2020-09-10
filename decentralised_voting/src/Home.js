import React, {Component} from 'react';
import {Row,Col,Input,Button,Label,Form,FormGroup,FormText} from 'reactstrap'
//import Web3 from 'web3';
const abi=[
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "disableContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "contestantId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "contestantAddress",
        "type": "address"
      }
    ],
    "name": "addContestants",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "contestantId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "voterAadharNo",
        "type": "uint256"
      }
    ],
    "name": "voteFor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

/*var web3=new Web3(Web3.givenProvider);
web3.eth.defaultAccount=web3.eth.accounts[0];
var contract=new web3.eth.Contract(abi);
console.log(contract);*/


class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      contestantId:0,
      contestantAddress:''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event){
    console.log(event);
  }

  handleSubmit(event){
    event.preventDefault();
    //console.log(event);
  }

  render(){
    //console.log(web3.version);
    return(
      <div className="container">
        <h1> Welcome to decentralised Voting </h1>
        <Form onSubmit={this.handleSubmit}>
      <Row form>
        <Col style={{margin:"70px 70px 0px 70px"}} md={{size:2,offset:2}}>
          <FormGroup>
            <Label for="contestantId">Contestant ID</Label>
            <Input onChange={this.handleChange} value={this.state.contestantId} type="text" name="contestantId" id="contestantId" placeholder="contestantId" />
          </FormGroup>
        </Col>
        <Col style={{margin:"70px 70px 0px 70px"}} md={{size:6,offset:1}}>
          <FormGroup>
            <Label for="contestantAddress">Contestant Address</Label>
            <Input type="text" name="contestantAddress" onChange={this.handleChange} value={this.state.contestantAddress} id="contestantAddress" placeholder="contestantAddress" />
          </FormGroup>
        </Col>
      </Row>
      <Col  md={{offset:3}}>
        <Button  type="submit" outline color="primary"> Add contestant </Button>
      </Col>
      </Form>
      </div>
    )
  }
}

export default Home;
