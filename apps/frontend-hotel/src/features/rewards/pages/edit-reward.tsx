import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@libs/ui-web';

import { RewardsForm } from '../components/rewards-form';

const EditReward = () => {
  return (
    <div className="p-12 h-full space-y-2 justify-center flex ">
      <RewardsForm />
    </div>
  );
};

export default EditReward;
