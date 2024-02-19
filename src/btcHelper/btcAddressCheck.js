// import { verifyMessage } from "@unisat/wallet-utils";
import { bitcore } from "bitcore-lib";

export const checkAddressType = async (data) =>{
    try {
        const addressInstance = bitcore.Address(data.address, data.network); // Specify network here
        return addressInstance.type;
    } catch (error) {
        return "Invalid address";
    }
    
}


export const checkValidAddress = async (data) =>{
    try {
        const isValid = bitcore.Address.isValid(inputAddress);
        if(!isValid){
            return false;
        }
        else{
            return true;
        }
    } catch (error) {
        return "Invalid address";
    }
}
