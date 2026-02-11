
import api from './axios';

export const createStore = (data) =>
  api.post('/stores/create-store', data);

export const getStores = () =>
  api.get('/stores/get-stores');
