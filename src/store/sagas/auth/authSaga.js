import { put, call } from "redux-saga/effects";
import axios from "../../../http/axios/axios_main";
import { catchHandler } from "../helperSaga";

import {
  userLoginStart,
  userloginSuccess,
  userLoginFail,
} from "../../reducers/authReducer";
import { toast } from "react-toastify";
import { decryptData, encryptData } from "../../../helpers/encryption";

function* setItemToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

// @ note := THis login saga is for connecting the wallet ,
// and not for login the user through API Call

// @ note := THis login saga is for login the user through API Call

export function* userLoginSaga(action) {
  yield put(userLoginStart());
  const { payload, navigate , setDisable} = action.payload;
  try {
    const response = yield axios.post(`/admin/verify-otp`, payload);
    if (response?.data.status) {
      yield call(
        setItemToLocalStorage,
        "saveprodata",
        JSON.stringify(response.data.data)
      )
      yield call(
        setItemToLocalStorage,
        "userId",
        response.data.data._id
      );
      // yield call(
      //   [localStorage, "setItem"],
      //   "authToken",
      //   response.data.token
      // );
      yield call(setItemToLocalStorage, "isUserAuthenticated", true);
      yield call(
        setItemToLocalStorage,
        "userData", 
        JSON.stringify(response.data.data)
      );
      yield put(userloginSuccess(response.data.data));
      if (response.data.status === true) {
        sessionStorage.setItem("jwt" , "enable")
        if(response.data.data.user_role === "admin"){
          toast.success("Admin Login successful")
          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 3000);
        }else{
        toast.success("Login successful")
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 3000);
      }
      }
    } else {
      setDisable(false)
      toast.error(response.data.message);
      yield put(userLoginFail(response.data.message));
    }
  } catch (error) {
    setDisable(false)
    toast.error(error.response.data.message);
    yield call(catchHandler, error, userLoginFail);
  }
}









