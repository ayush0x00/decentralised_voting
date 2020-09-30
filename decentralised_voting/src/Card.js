import React from 'react';
import {Card, CardImg,CardBody,CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';

const ContestantCard=(props)=>{
  if(props.ipfsHash!==""){
  return(
    <div key={props.contestantId} className="container" style={{margin:"15px"}}>
    <div className="row">
    <div className="col-md-3">
      <Card>
      <Link to={`/ContestantDetails/${props.contestantId}`}>
        <CardImg style={{width:"200px",height:"150px"}} src={`https://ipfs.io/ipfs/${props.ipfsHash}`} />
          <CardBody>
            <CardTitle>{props.contestantAddress} </CardTitle>
          </CardBody>
        </Link>
        </Card>
        </div>
        </div>
        </div>
  )
}
else{
  return(
    <div className="container" style={{margin:"20px"}}>
      <div className="row">
        <h1>Most recent additions..</h1>
        <p>Your most recent added contestant will be displayed here...For total available contestants for voting please visit ContestantDetails section </p>
      </div>
    </div>
  )
}
}

export default ContestantCard;
