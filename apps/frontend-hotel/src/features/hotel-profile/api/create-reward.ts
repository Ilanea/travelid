import { axiosPrivate } from '@hotel/lib/axios-private';

import { Reward } from '../types';

export type RewardDto = {
  name: string;
  description: string;
  image?: string;
  active: boolean;
  price: number;
  validFrom?: Date;
  validUntil?: Date;
  hotelId: number;
};

export const createReward = async (data: RewardDto): Promise<Reward> => {
  const reward = await axiosPrivate.post(`/reward`, data);
  return reward;
};
