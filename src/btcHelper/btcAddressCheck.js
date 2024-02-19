// import { verifyMessage } from "@unisat/wallet-utils";
import  bitcore  from "bitcore-lib";

export const checkAddressType = async (address , network) =>{
    try {
        const addressInstance = bitcore.Address(address, network); // Specify network here
        return addressInstance;
    } catch (error) {
        // console.log(error);
       return false
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
