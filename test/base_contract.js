var base_contract=artifacts.require('base_contract');

contract('base_contract',function(accounts){
  const owner=accounts[0];
  const contestantAddress=accounts[1];
  const contestantId=1;
  const voterAadharNo=1234;
  const voterAddress=accounts[2];

  it("Testing function addContestants",async ()=>{
    const deployedContract=await base_contract.deployed();
    let result=await deployedContract.addContestants(contestantId,contestantAddress,{from:owner});
    assert.equal(result.logs[0].args.contestant,contestantAddress);
    //console.log(result.logs[0].args.contestant);
  })

  it("Testing function voteFor()",async()=>{
    const deployedContract=await base_contract.deployed();
    let result=await deployedContract.voteFor(contestantId,voterAadharNo,{from:voterAddress});
    assert.equal(result.logs[0].args.contestant,contestantAddress,"Error in voting for given candidate");
    assert.equal(result.logs[0].args.voter,voterAddress,"Voter address do not match");
    assert.equal(result.logs[0].args.currentVoteCount,1,"vote count do not match");
  })

  it("Contract should not be disabled by users except owner",async ()=>{
    const deployedContract=await base_contract.deployed();
    try{
      await deployedContract.disableContract({from:accounts[6]});
    } catch(e){
      assert.equal(e.reason,"Only owner can perform this action");
    }
  })


  it("Testing function disableContract",async()=>{
    const deployedContract= await base_contract.deployed();
    await deployedContract.disableContract({from:owner});
    let result=await deployedContract.contractStatus.call();
    assert.equal(result,true);
  })

});
