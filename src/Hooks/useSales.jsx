import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _cancelOrder, _createSalesOrder, _updateStatus } from "../Services/sales.api";

function useSales() {
  const queryClient = useQueryClient();

  // Mutation for creating a new sales order
  const createOrder = useMutation(_createSalesOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["sales_orders"]);
    },
  });

  // Mutation for updating the status of a sales order
  const updateStatus = useMutation(_updateStatus, {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(["sales_orders"]);
    },
  });

  // Mutation for cancelling a sales order
  const cancelOrder = useMutation(_cancelOrder, {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(["sales_orders"]);
    },
  });

  return {
    createOrder,
    updateStatus,
    cancelOrder,
  };
}

export default useSales;
