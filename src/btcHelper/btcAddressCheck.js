// import { verifyMessage } from "@unisat/wallet-utils";
import  bitcore  from "bitcore-lib";

export const checkAddressType = async (data) =>{
    try {
        const addressInstance = bitcore.Address(data, "testnet"); // Specify network here
        return addressInstance;
    } catch (error) {
        throw error;
    }
    
}


// export const checkValidAddress = async (data) =>{
//     try {
//         const isValid = bitcore.Address.isValid(data);
//         if(isValid){
//             return data;
//         }
//         else{
//             return "Invalid address";
//         }
//     } catch (error) {
//         throw error;
//     }
// }
