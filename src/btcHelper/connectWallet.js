export const connectUnisat = async () => {
  if (typeof window.unisat == "undefined") {
    console.error("please install unisat wallet!");
  } else {
    try {
      let connects = await window.unisat.requestAccounts();
      let network = await window.unisat.getNetwork();
      let account = await window.unisat.getAccounts();
      let obj = {
        connects: connects,
        network: network,
        account: account,
      };
      return obj;
      // console.log('connect success', accounts);
    } catch (e) {
      console.log("connect failed");
    }
  }
};

export const switchNetworkUnisat = async () => {
  if (typeof window.unisat == "undefined") {
    console.error("please install unisat wallet!");
  } else {
    try {
      let network = await window.unisat.getNetwork();
      let changeNetwork;
      if (network == "livenet") {
        changeNetwork = "testnet";
      } else {
        changeNetwork = "livenet";
      }
      let newNetwork = await window.unisat.switchNetwork(changeNetwork);
      return newNetwork;
    } catch (e) {
      console.log(e);
    }
  }
};
