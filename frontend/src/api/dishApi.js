import API from './authApi';

export const fetchDishes = async () => {
  const response = await API.get('/api/dishes');
  return response.data;
};

export const toggleDish = async (dishId) => {
  const response = await API.patch(`/api/dishes/${dishId}/toggle`);
  return response.data;
};
