
pragma solidity >=0.4.22 <0.8.0;

contract base_contract{
  address owner;
  constructor() public {
    owner=msg.sender;
  }
  mapping(address=>uint256) voterAadhar;
  mapping(uint256=>address) contestants;
  mapping(address=>uint256) votes;
  bool paused=false;

  modifier godMode(){
    require(msg.sender==owner,"Only owner can perform this reaction");
    _;
  }

  modifier isContractActive(){
    require(paused==false,"Contract is already suspeded");
    _;
  }

  function disableContract() public godMode isContractActive{
    paused=true;
  }

  function addContestants(uint contestantId, address contestantAddress) public godMode isContractActive{
    contestants[contestantId]=contestantAddress;
  }

  function voteFor(uint contestantId,uint voterAadharNo) public isContractActive{
    votes[contestants[contestantId]]+=1;
    voterAadhar[msg.sender]=voterAadharNo;
  }




}
