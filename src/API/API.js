import axios from "axios";

const url = "http://13.124.129.107:8080/AppAdmin";

export const signUp = (data) => {
  return axios.post(`${url}/member/regist`, data);
};

export const signIn = (data) => {
  return axios.post(`${url}/member/login`, data);
};

export const adminModify = (data) => {
  return axios.post(`${url}/member/modify`, data);
};

export const adminInfo = (data) => {
  return axios.post(`${url}/member/info`, data);
};

export const appDelete = (data) => {
  return axios.post(`${url}/appinfo/delete`, data);
};

export const appRegist = (data) => {
  return axios.post(`${url}/appinfo/regist`, data);
};

export const appModify = (data) => {
  return axios.post(`${url}/appinfo/modify`, data);
};
