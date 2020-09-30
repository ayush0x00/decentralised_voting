import React, {Component} from 'react';

class ContestantDetails extends Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.ipfsHash!==""){
      return(
      <div>
        <img src={`https://ipfs.io/ipfs/${this.props.ipfsVal}`} />
      </div>
    )
  }
  else{
    return(<h1>Waiting for first contestant to be added...</h1>)
  }
}
}

export default ContestantDetails;
