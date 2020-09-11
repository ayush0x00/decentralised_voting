import base_contract from "./contracts/base_contract.json";

const Options={
  contracts:[base_contract],
  web3:{
    fallback:{
      type:"ws",
      url:"ws://127.0.0.1:9545"
    }
  }
}

export default Options;
