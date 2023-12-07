import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@hotel/features/auth/store/auth';

import { createReward } from '../api/create-reward';
import { editReward } from '../api/edit-reward';

const useProperties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const createEditReward = async (
    rewardData: any,
    type: 'createReward' | 'editReward'
  ) => {
    setIsLoading(true);
    try {
      let rewardResponse;
      const myRewardData = {
        ...rewardData,
        hotelId: authUser?.hotelsAsAdmin[0].id,
      };
      if (type === 'createReward') {
        console.log('myRewardData', myRewardData);

        rewardResponse = await createReward(myRewardData);
        console.log('response', rewardResponse);
      } else if (type === 'editReward') {
        rewardResponse = await editReward(myRewardData);
      }
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  return { isLoading, createEditReward };
};

export default useProperties;
