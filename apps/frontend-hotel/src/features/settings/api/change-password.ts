import storage from '@hotel/utils/storage';

import { axios } from '../../../lib/axios';
import { AuthUser } from '../types';
import { getUser } from './get-user';

export type changePasswordDto = {
  oldPassword: string;
  newPassword: string;
};



export const changePassword = async (data: changePasswordDto): Promise<AuthUser> => {
  
  const user = await axios.post( `/user//password`, data); // add ID here
  return user;
};
