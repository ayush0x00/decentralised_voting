import React, {Component} from 'react';
import {Jumbotron,Button} from 'reactstrap';

class Home extends Component {
  render(){
    return(
      <div>
  <Jumbotron>
    <h1 className="display-3">Hola!</h1>
    <p className="lead">This web App is an implementation of using ethereum blockchain solutions for providing a safer platform for online voting.</p>
    <hr className="my-2" />
    <p>It uses blockchain technology to provide a public ledger which is practically immmutable. The votes can be casted from any device
    with an internet connection and voterId. The present implementation uses aadhar number inorder to verify voters. It includes a pausability feature to terminate the contract,
    however, this feature can only be used by deployer of the contract.</p>
    <p className="lead">
      <Button color="primary">Learn More</Button>
    </p>
  </Jumbotron>
</div>

    )
  }
}

export default Home;
