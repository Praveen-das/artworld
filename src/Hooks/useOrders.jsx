import { useQuery } from '@tanstack/react-query';
import { _getOrdersByUserId } from '../Services/sales.api';

const useOrders = () => useQuery(['orders'], _getOrdersByUserId);
export default useOrders