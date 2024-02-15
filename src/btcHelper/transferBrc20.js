export const inscribeTransfer = async (data) => {
  // console.log("data.ticker--------------",data.ticker);
  // console.log("data.amount--------------",data.amount);
  if (typeof window.unisat == "undefined") {
    console.error("please install unisat wallet!");
  } else {
    try {
      let voids = await window.unisat.inscribeTransfer(
        data.ticker,
        data.amount
      );
      return voids;
    } catch (e) {
      console.log(e);
    }
  }
};

export const transferInscription = async (data) => {
  console.log("data" , data);

  if (typeof window.unisat == "undefined") {
    console.error("please install unisat wallet!");
  } else {
    try {
      let txid = await window.unisat.sendInscription(
        data.reciever,
        data.inscriptionID,
        { feeRate: 1 }
      );
      return txid;
    } catch (e) {
      console.log(e);
    }
  }
};
