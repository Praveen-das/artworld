import axiosClient from "../lib/axiosClient";
import { BASE_URL } from "../Utils/urls";

const _createSalesOrder = async (payload) => {
  return await axiosClient.post("/orders/create", payload);
};

const _updateStatus = async ({ orderId, status }) => {
  return await axiosClient.patch(`/orders/status`, { orderId, status }).then((res) => res.data);
};

const _cancelOrder = async (params) => {
  return await axiosClient.patch(`/orders/cancel/${params.orderId}`, params).then((res) => res.data);
};

const _getSalesOrderByUserId = async (query) => {
  return await axiosClient.get(`/orders/sales${query && "?" + query}`).then((res) => res.data);
};

const _getOrdersByUserId = async () => {
  return await axiosClient.get("/orders").then((res) => res.data);
};

export { _createSalesOrder, _updateStatus, _cancelOrder, _getSalesOrderByUserId, _getOrdersByUserId };
