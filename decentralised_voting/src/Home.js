import React, {Component} from 'react';
import {Row,Col,Input,Button,Label,Form,FormGroup,FormText} from 'reactstrap'
import {ContractForm} from 'drizzle-react-components'
import {drizzleConnect} from 'drizzle-react';

const mapStateToProps = (state)=> ({state});

class Home extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state={
      contestantId:0,
      contestantAddress:''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event){
    //console.log(event);
    event.persist()
    const name=event.target.name;
    this.setState({[name]:event.target.value})
  }

   handleSubmit(event){
    event.preventDefault();
    //<ContractForm contract="base_contract" method="addContestants" methodArgs={[this.state.contestantId,this.state.contestantAddress]} />

  }

  render(){
    //console.log(web3.version);
    return(
      <div className="container">
        <h1> Welcome to decentralised Voting </h1>
        <ContractForm onSubmit={this.handleSubmit} >
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
      </ContractForm>
      </div>
    )
  }
}

export default drizzleConnect(Home,mapStateToProps);
