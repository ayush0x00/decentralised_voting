import React, {Component} from 'react';
import ContestantCard from './Card'
const baseURL="https://ipfs.io/ipfs/"

class ContestantDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      response:false,
      ids:null,
      data:false
    }
    this.returned_id=this.returned_id.bind(this);
    this.display=this.display.bind(this);

  }
  display(){
    const result=this.returned_id();
    console.log(result);;
  }


   async returned_id(){
     const id=await this.props.contract.methods.getIds().call();
     console.log(id);
       const result=id.map(async(id)=>{
        const ipfsHash=await this.props.contract.methods.contestantImage(id).call();
        const address=await this.props.contract.methods.contestants(id).call();
        console.log(ipfsHash);
        return(
            <div>
              <ContestantCard contestantId={id} contestantAddress={address} ipfsHash={ipfsHash} />
            </div>
     )
   })
   return result;
 };

  render(){
    return(
    <div>{this.display()}</div>
    )
  }
}


export default ContestantDetails;
