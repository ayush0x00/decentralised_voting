import React,{Component} from 'react'
import {Row,Form,FormGroup,Col,Input,Label,Button} from "reactstrap"
const IPFS=require('ipfs-api');
const ipfs=new IPFS({host:'ipfs.infura.io',port:5001,protcol:'https'})

class AddVoter extends Component{
    constructor(props){
      super(props);
      this.state={
        contestantId:0,
        contestantAddress:"",
        imageBuffer:"",
        ipfsHash:null
      }
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.captureImage=this.captureImage.bind(this);
    }
componentDidMount(){
  this.loadingContract()
}

async addingContestant(){
  const receipt=await this.props.contract.methods.addContestants(this.state.contestantId,this.state.contestantAddress).send({from:"0x319b770eBA2ad8Fdf7DEa91379d95C3c24Ddcb5B"})
  await this.props.contract.once('contestantAdded',function(error,event){console.log(event);})
  console.log(receipt);
}

 captureImage(event){
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

handleSubmit(event){
  event.preventDefault();
  this.addingContestant();
  ipfs.files.add(this.state.buffer,(err,res)=>{
    if(err){
      console.log(err);
      return
    }
    console.log(res);
    return this.setState({ipfsHash:res[0].hash})
  })

}


async loadingContract(){
  const network=await this.props.web3.eth.net.getNetworkType();
  const status=await this.props.contract.methods.contractStatus().call()
  console.log(this.props.contract);
}



render(){
  return(
    <div className="container">
      <h1> Welcome to decentralised Voting </h1>
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
    </div>
  )
}
}

export default AddVoter
