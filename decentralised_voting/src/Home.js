import React, {Component} from 'react';
import {Row,Col,Input,Button,Label,Form,FormGroup,FormText,Alert} from 'reactstrap'

class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      currentAccount:"",
      currentBalance:"",
      contestantId:0,
      contestantAddress:''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  componentDidMount(){
    this.loadingContract();
  }

  async loadingContract(){
    const network=await this.props.web3.eth.net.getNetworkType();
    const currentAccount=await this.props.web3.eth.getAccounts();
    const currentBalance=await this.props.web3.eth.getBalance(currentAccount[0]);
    this.setState({currentAccount:currentAccount[0],currentBalance});
  }

  async addingContestant(){
    const result=await this.props.contract.methods.addContestants(this.state.contestantId,this.state.contestantAddress);
    <Alert color="success">
      <h4>Contestant Added successfully</h4>
      <p> `Hola! Admin, You have successfully added a new contestan with id {this.state.contestantId} and address {this.state.contestantAddress}</p>
    </Alert>
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

export default Home;
