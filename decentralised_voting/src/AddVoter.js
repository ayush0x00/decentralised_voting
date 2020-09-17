import React,{Component} from 'react'
import {Row,Form,FormGroup,Col,Input,Label,Button} from "reactstrap"

class AddVoter extends Component{
    constructor(props){
      super(props);
      this.state={
        contestantId:0,
        contestantAddress:""
      }
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }
componentDidMount(){
  this.loadingContract()
}

async addingContestant(){
  const receipt=await this.props.contract.methods.addContestants(this.state.contestantId,this.state.contestantAddress).send({from:"0x319b770eBA2ad8Fdf7DEa91379d95C3c24Ddcb5B"})
  await this.props.contract.once('contestantAdded',function(error,event){console.log(event);})
  console.log(receipt);
}

handleChange(event){
  event.persist()
  const name=event.target.name;
  this.setState({[name]:event.target.value})
}

handleSubmit(event){
  event.preventDefault();
  this.addingContestant();

}


async loadingContract(){
  const network=await this.props.web3.eth.net.getNetworkType();
  const status=await this.props.contract.methods.contractStatus().call()
  console.log(status);
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
    <Col  md={{offset:3}}>
      <Button  type="submit"  outline color="primary"> Add contestant </Button>
    </Col>
    </Form>
    </div>
  )
}
}

export default AddVoter
