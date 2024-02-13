import { createSlice } from "@reduxjs/toolkit";
import { decryptData } from "../../helpers/encryption";


const isAuthenticated = localStorage.getItem("isAuthenticated");
const isUserAuthenticated = localStorage.getItem("isUserAuthenticated");
const userRole = localStorage.getItem("userRole");
const userData = localStorage.getItem("userData");
const WalletEVM = localStorage.getItem("WalletEVM");
const proupdatedata = localStorage.getItem("saveprodata");


const authSlice =  createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    WalletEVM:!!WalletEVM ? JSON.parse(WalletEVM) : {},
    isAuthenticated: !!isAuthenticated ? true : false,
    isUserAuthenticated: !!isUserAuthenticated ? true : false,
    userRole: !!userRole ? userRole : "",
    user: !!userData ? JSON.parse(userData) : {},
    authToken: "",
    errorMsg: "",
    proupdate: !!proupdatedata ? JSON.parse(proupdatedata) : {},
  },

  reducers: {

    loginSaga: (state, action) => {
      return { ...state };
    },


    userLoginSaga: (state, action) => {
      return { ...state };
    },
    userLoginStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    userloginSuccess: (state, action) => {
      // console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: true,
        user: action.payload,
        userRole: action.payload.user_role,
        authToken : action.payload.token,
  
      };
    },

    
    saveprofiledata: (state, action) => {
      // console.log(action.payload , "data yha tak aa rha h");
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: true,
        proupdate : action.payload
      };
    },

    userLoginFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: false,
        user: {},
        errorMsg: action.payload,
      };
    },

    logout: (state) => {
      localStorage.clear();
      return {
        ...state,
        isLoading: false,
        WalletEVM: "",
        isUserAuthenticated : false,
        isAuthenticated: false,
        errorMsg: "",
        user : {},
        authToken : ""
      };
    },

    setEVMWallet: (state, action) => {
      localStorage.setItem("WalletEVM", JSON.stringify(action.payload));
      return {
        ...state,
        WalletEVM: action.payload,
      };
    },

  
  },
});

export const {
  logout,
  setEVMWallet,
  userLoginSaga,
  userLoginStart,
  saveprofiledata,
  userloginSuccess,
  userLoginFail,
} = authSlice.actions;

export default authSlice.reducer;
