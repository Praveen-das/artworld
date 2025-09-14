import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { _getSalesOrderByUserId } from "../Services/sales.api";

const useSalesOrders = (params = "") => {
  const orders = useQuery(["sales_orders", params], () => _getSalesOrderByUserId(params), { keepPreviousData: true });
  return orders;
};
export default useSalesOrders;
