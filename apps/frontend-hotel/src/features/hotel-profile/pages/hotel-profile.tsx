import { Tabs } from '@radix-ui/react-tabs';
import React from 'react';

import { Separator, TabsContent, TabsList, TabsTrigger } from '@libs/ui-web';

import { FacilitiesForm } from '../components/facilities-form';
import { ProfileForm } from '../components/profile-form';

function HotelProfile() {
  return (
    <div className="p-12 h-full space-y-2 justify-center flex">
      {' '}
      <Tabs defaultValue="account" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="account">Profile</TabsTrigger>
          <TabsTrigger value="password">Facilities</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="password">
          <FacilitiesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HotelProfile;
