export const transferBtc = async (data) => {
  console.log("data", data);

  if (typeof window.unisat == "undefined") {
    console.error("please install unisat wallet!");
  } else {
    try {
      let txid = unisat.sendBitcoin(data.reciever, data.amount);

      return txid;
    } catch (e) {
      console.log(e);
    }
  }
};
