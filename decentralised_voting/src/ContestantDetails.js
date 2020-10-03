import React, {Component} from 'react';
import ContestantCard from './Card'
const baseURL="https://ipfs.io/ipfs/"

class ContestantDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      response:false,
      ids:null,
      result:null
    }
  }
  componentDidMount(){
    this.loadContestants();
  }
  componentDidUpdate(){
    this.returned_id()
  }

  async loadContestants(){
    console.log(this.props.contract);
    await this.props.contract.methods.getIds().call().then(result=>this.setState({ids:result}))
  }
   returned_id(){
   const result=this.state.ids.map(async(id)=>{
     const ipfsHash=await this.props.contract.methods.contestantImage(id);
     const address=await this.props.contract.methods.contestants(id);
     return(
       <div>
         <ContestantCard contestantId={id} contestantAddress={address} ipfsHash={ipfsHash} />
         </div>
     )
   })
   this.setState({result:result});
 }

  render(){
    return(
      <div className="container">{this.state.result}</div>
    )
  }
}


export default ContestantDetails;
