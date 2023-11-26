import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../constants/constants';

export const getUserById = async (userId: number) => {
  try {
    const result = await axios.get(`${API_URL}/api/users/${userId.toString()}`, {
      withCredentials: true,
    });

    await SecureStore.setItemAsync('userInfo', JSON.stringify(result.data));
    return result.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};