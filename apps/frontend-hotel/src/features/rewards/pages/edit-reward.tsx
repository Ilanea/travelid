import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@libs/ui-web';

import { RewardsForm } from '../components/rewards-form';

const EditReward = () => {
  return (
    <div className="p-12 h-full space-y-2 justify-center flex">
      {' '}
      <Tabs defaultValue="account" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="account">Profile</TabsTrigger>
          <TabsTrigger value="password">Facilities</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <RewardsForm />
        </TabsContent>
        <TabsContent value="password">
          <div>Facilities</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditReward;
