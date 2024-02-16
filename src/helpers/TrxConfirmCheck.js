import axiosMain from "../http/axios/axios_main";

export const TransactionConfirmCheck = async (data) => {
    console.log("data-----------------", data);
    try {
        let adminWallet = "tb1qq2xtm7n8tuw9ywac36ve0uxjk6748k5c9d5acd";

        const expectedBlockTime = 30000; // 1sec
        const sleep = (milliseconds) => {
            return new Promise((resolve) => setTimeout(resolve, milliseconds));
        };
        let walletFromAPI = data.unisataddress;
        while (walletFromAPI == data.unisataddress) {
            // Waiting expectedBlockTime until the transaction is mined
            const getTransfaredBalance = await axiosMain.get(
                `/v1/indexer/inscription/info/${data.inscriptionId}`
            );
            walletFromAPI = getTransfaredBalance?.data?.data?.address;
            console.log("walletFromAPI-----------------", walletFromAPI);

            await sleep(expectedBlockTime);
        }
        if (walletFromAPI === adminWallet) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.error(e);
    }

};


// const TrxConfirmCheck = async (data) => {
//     let adminWallet = "tb1qg6l5arguyze2u96xgc0aqdl8cqfnmaawa78nj7";
//     let walletFromAPI;
//     for (let i = 0; i < 10; i++) {
//         setTimeout(async () => {
//             try {
//                 const getTransfaredBalance = await axiosMain.get(
//                     `/v1/indexer/inscription/info/${data.inscriptionId}`
//                 );
//                 walletFromAPI = getTransfaredBalance?.data?.data?.address;
//             } catch (err) {
//                 console.log("yha 2");

//             }
//         }, 60000);

//         if(walletFromAPI == adminWallet){
//             break;
//         }
//     }
//     console.log("walletFromAPI----------------",walletFromAPI)
//     return walletFromAPI;
// };

// export default TrxConfirmCheck
