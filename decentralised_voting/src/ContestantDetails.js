import React, {Component} from 'react';
import ContestantCard from './Card'
const baseURL="https://ipfs.io/ipfs/"

class  ContestantDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
      id:[]
    }
    this.result=this.result.bind(this);
  }

  async componentDidMount(){
    try{
      const id=await this.props.contract.methods.getIds().call();
      this.setState({id});
      console.log(id);
    }catch(err){
      console.log(err);
    }
  }
  result(){
  const value=this.state.id.map(async id=>{
  const image=await this.props.contract.methods.contestantImage(id).call();
  const address=await this.props.contract.methods.contestants(id).call();
    return( <ContestantCard id={id} ipfsHash={image} contestantAddress={address} />)
  })
  return(value.map(val=>(<div>{val}</div>)))
}


  render(){

    if(this.state.id.length===0){
      return(<div>Nothing in the voters section</div>)
    }
    const value=this.result();
    console.log(value);
    return(
      <div>
        {value.map(val=><div>{val[0]}</div>)}
      </div>
      )
  }
}


export default ContestantDetails;
