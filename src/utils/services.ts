import { useQuery } from '@tanstack/react-query';

import * as service from '../utils/service';

export const addUserService = (params: Object) => service.post('/users', params);

export const newOrderService = (params: Object) => service.post('/orders', params);

export const getUsersService = () => service.get('/users');

// Hooks
export function useUsers() {
  return useQuery(['user'], getUsersService, {
    staleTime: 5 * 60000,
  });
}

export const getOrdersService = () => service.get('/orders');

// Hooks
export function useOrders() {
  return useQuery(['orders'], getOrdersService, {
    staleTime: 5 * 60000,
  });
}

export const updateOrdersService = (params: Object) => service.put(`/orders/${params.orderId}`, params);
