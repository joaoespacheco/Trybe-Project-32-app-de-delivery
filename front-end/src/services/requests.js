import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (body) => {
  const { data } = await api.post('/login', body);
  return data;
};

export const requestRegister = async (body) => {
  const { data } = await api.post('/register', body);
  return data;
};

export const requestProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const requestAllSellers = async () => {
  const { data } = await api.get('/sellers');
  return data;
};

export const requestCreateOrder = async (body) => {
  const { data } = await api.post('/orders_products', body);
  return data;
};

export const requestOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const requestOrdersByClient = async (id) => {
  const { data } = await api.get(`/customer/${id}/orders`);
  return data;
};

export const requestOrdersBySeller = async (id) => {
  const { data } = await api.get(`/sellers/${id}/orders`);
  return data;
};

export const requestChangeStatusOrder = async (id, status) => {
  await api.put(`/orders/${id}`, { status });
};

export const requestAllUsers = async () => {
  const { data } = await api.get('/admin/manage/users');
  return data;
};

export const requestCreateUser = async (body) => {
  const { data } = await api.post('/admin/manage/register', body);
  return data;
};

export const requestDeleteUser = async (id) => {
  await api.delete(`/admin/manage/users/${id}`);
};

export default api;
