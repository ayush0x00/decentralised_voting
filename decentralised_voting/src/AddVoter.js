import React,{Component} from 'react'
import {Row,Form,FormGroup,Col,Input,Label,Button,Image,Alert} from "reactstrap"
import ContestantCard from './Card'


const IPFS=require('ipfs-api');
const ipfs=new IPFS({host:'ipfs.infura.io',port:5001,protcol:'https'})

class AddVoter extends Component{
    constructor(props){
      super(props);
      this.state={
        contestantId:0,
        contestantAddress:"",
        imageBuffer:"",
        ipfsHash:this.props.previpfsHash,
        senderAddress:"",
        senderBalance:null
      }
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.captureImage=this.captureImage.bind(this);
    }
componentDidMount(){
  this.loadingContract()
}

async addingContestant(){
  //console.log(`the ipfs hash is ${this.state.ipfsHash}`);
  const receipt=await this.props.contract.methods.addContestants(this.state.contestantId,this.state.contestantAddress,this.state.ipfsHash).send({from:this.state.senderAddress,gas:3000000})
  //await this.props.contract.once('contestantAdded',function(error,event){console.log(event);})
  //alert("transaction successfull")
  this.props.getipfsHash(this.state.contestantId);
  console.log(receipt);
  console.log(this.state.ipfsHash);

}

 captureImage(event){
   event.stopPropagation();
  event.preventDefault();
  const file=event.target.files[0];
  let reader=new window.FileReader()
  reader.readAsArrayBuffer(file);
  reader.onloadend= ()=>this.convertToBuffer(reader);
}

async convertToBuffer(reader){
  const buffer=Buffer.from(reader.result);
  this.setState({imageBuffer:buffer});
}

handleChange(event){
  event.persist()
  const name=event.target.name;
  this.setState({[name]:event.target.value})
}

async handleSubmit(event){
  event.preventDefault();
  const result=await ipfs.files.add(this.state.imageBuffer);
  //console.log(result);
  this.setState({ipfsHash:result[0].hash})
  //console.log(this.state.ipfsHash);
  this.addingContestant();
}


async loadingContract(){
   this.props.web3.eth.getAccounts((err,res)=>{
    if(err) console.log(err);
    else {
      this.setState({senderAddress:res[0]})
      this.props.web3.eth.getBalance(res[0]).then((res)=>this.setState({senderBalance:this.props.web3.utils.fromWei(res,"ether")}))
    }
  })
}



render(){
  if(this.state.senderAddress==="") return(<h1>Your ethereum account is not connected</h1>)
  else{
  return(
    <div className="container">
      <h1 className="row" style={{margin:"20px 0px 0px 0px"}}> Welcome to decentralised Voting </h1>
      <hr />
      <p>Your current accoount address is: {this.state.senderAddress}, with current balance as {this.state.senderBalance} ethers.<b> Happy Voting </b> </p>
      <Form onSubmit={this.handleSubmit} >
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
    <Row style={{margin:"0px 70px 0px 70px"}}>
      <FormGroup>
      <Input type="file" name="uploadImage" onChange={this.captureImage} id="uploadImage" placeholder="Upload Contestant Image" />
      </FormGroup>
    </Row>
    <Col  md={{offset:3}}>
      <Button  type="submit"  outline color="primary"> Add contestant </Button>
    </Col>
    </Form>
    <div className="row">
      <ContestantCard contestantId={this.state.contestantId} contestantAddress={this.state.contestantAddress} ipfsHash={this.state.ipfsHash}/>
    </div>
    </div>
  )
}
}
}

export default AddVoter
