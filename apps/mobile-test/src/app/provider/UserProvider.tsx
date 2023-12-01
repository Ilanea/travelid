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
  public setBonuspoints(userId: string, bonuspoints: number) {
    console.log('setBonuspoints', userId, bonuspoints);
  }

  public async updateBonuspoints(userId: string, bonuspoints: number) {
    try {
      const result = await axios.patch(
        `${API_URL}/api/users/${userId}/bonuspoints`,
        { "bonuspoints": bonuspoints },
        // Authorization check is done in the backend
        { withCredentials: true }
      );

      // Update the bonuspoints in the local state
      this.setBonuspoints(userId, bonuspoints);

      // Update User Info in SecureStore
      await SecureStore.setItemAsync('userInfo', JSON.stringify(result.data));

      return;
    } catch (error) {
      console.error('Failed to update bonus points:', error);
      return { error: true, msg: (error as any).response.data.message };
    }
  }
  public async updateUser(userId: string, firstName: string, contactNumber: string) {
    const userData = await SecureStore.getItemAsync("userInfo")
    try {
      const result = await axios.patch(
        `${API_URL}/api/users/${userId}/bonuspoints`,
        {
          "userName": userData.userName,
          "email": userData.email,
          "firstName": firstName,
          "lastName": userData.lastName,
          "academicDegree": userData.academicDegree,
          "gender": userData.gender,
          "street": userData.street,
          "city": userData.city,
          "country": userData.country,
          "nationality": userData.nationality,
          "birthday": userData.birthday,
          "documentNo": userData.documentNo,
          "mobilePhone": contactNumber,
          "phone": "string",
        },
        // Authorization check is done in the backend
        { withCredentials: true }
      ); 

      // Update the bonuspoints in the local state

      // Update User Info in SecureStore
      await SecureStore.setItemAsync('userInfo', JSON.stringify(result.data));

      return;
    } catch (error) {
      console.error('Failed to update bonus points:', error);
      return { error: true, msg: (error as any).response.data.message };
    }
  }
}
