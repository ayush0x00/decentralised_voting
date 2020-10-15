import React, {Component} from 'react';
import ContestantCard from './Card'
const baseURL="https://ipfs.io/ipfs/"

class  ContestantDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
      id:[]
    }
  }

  async componentDidMount(){
      const id=await this.props.contract.methods.getIds().call();
      const value=await id.map(async id=>{
      const image=await this.props.contract.methods.contestantImage(id).call();
      const address=await this.props.contract.methods.contestants(id).call();
        return([id,image,address]);
      })
      Promise.all(value).then(val=>{
      val.map(temp=>this.setState({id:[...this.state.id,temp]}))})
      //console.log(this.state.id);
  }


  render(){

    if(this.state.id.length===0){
      return(<div>Nothing in the voters section</div>)
    }

    return(
      <div>
        {this.state.id.map(data=>(
          <div className="container" key={data[0]}>
                <ContestantCard id={data[0]} contestantAddress={data[2]} ipfsHash={data[1]} />
            </div>
        ))}
      </div>
      )
  }
}


export default ContestantDetails;
