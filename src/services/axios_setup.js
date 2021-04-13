import axios from "axios";
import * as actionCreator from "../ReduxStore/action_creators";
import { STORE } from "./store_setup";

/************AXIOS SETUP***************/

// axios.defaults.baseURL='http://localhost:4000';

axios.defaults.baseURL = "https://vinayakatradergroup.herokuapp.com";

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    STORE.dispatch(actionCreator.spinner(true));
    return request;
  },
  (error) => {
    STORE.dispatch(actionCreator.spinner(false));
    console.log(error.status);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    STORE.dispatch(actionCreator.spinner(false));
    return response;
  },
  (error) => {
    console.log(JSON.stringify(error));
    let errorStatus = 0;
    if (error.message.includes("status code 400")) errorStatus = 400;
    else errorStatus = 500;
    STORE.dispatch(actionCreator.spinner(false));
    return Promise.reject(errorStatus);
  }
);

export default axios;
