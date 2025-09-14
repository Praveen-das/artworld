import axios from "axios";
import axiosClient from "../lib/axiosClient";

export const _verifyPayment = (data) => axiosClient.post("/rzp/purchase/verify", data).then((res) => res.data);

export const _verifyRegistration = (data) => axiosClient.post("/rzp/registration/verify", data).then((res) => res.data);

export const createLinkedAccount = async (payload) => {
  return await axiosClient.post("/rzp/accounts", payload).then((res) => res.data);
};

export const updateLinkedAccount = async (accountId, payload) => {
  return await axiosClient.patch(`/rzp/accounts/${accountId}`, payload).then((res) => res.data);
};

export const getLinkedAccounts = async () => {
  return await axiosClient.get("/rzp/accounts").then((res) => res.data);
};

export const _createBankAccount = async (payload) => {
  return await axiosClient.post("/rzp/product", payload).then((res) => res.data);
};
