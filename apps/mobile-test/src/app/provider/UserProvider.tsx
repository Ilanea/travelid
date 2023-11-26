import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { API_URL } from './AuthProvider';

interface User {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  academicDegree: string;
  street: string;
  city: string;
  country: string;
  nationality: string;
  birthday: string;
  documentNo: string;
  mobilePhone: string;
  phone: string;
  bonuspoints: number;
}

export class UserProviderClass {
  public async setBonuspoints(userId: string, bonuspoints: number) {
    try {
      const result = await axios.post(
        `${API_URL}/api/users/{userId}/bonuspoints`,
        { userId, bonuspoints },
        { withCredentials: true }
      );

      // Update the bonuspoints in the local state
      this.setBonuspoints(bonuspoints);

      // Update User Info in SecureStore
      await SecureStore.setItemAsync('userInfo', JSON.stringify(result.data));

      return;
    } catch (error) {
      console.error('Failed to update bonus points:', error);
      return { error: true, msg: (error as any).response.data.message };
    }
  }
}
