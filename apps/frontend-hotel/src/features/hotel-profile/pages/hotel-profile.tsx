import { Tabs } from '@radix-ui/react-tabs';
import React from 'react';

import { Separator, TabsContent, TabsList, TabsTrigger } from '@libs/ui-web';

import { FacilitiesForm } from '../components/facilities-form';
import { ProfileForm } from '../components/profile-form';
import { RoomsForm } from '../components/rooms-form';

function HotelProfile() {
  return (
    <div className="p-12 h-full space-y-2 justify-center flex">
      {' '}
      <Tabs defaultValue="profil" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="profil">Profile</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <TabsContent value="profil">
          <ProfileForm />
        </TabsContent>
          <TabsContent value="rooms">
            <RoomsForm />
        </TabsContent>
        <TabsContent value="facilities">
          <FacilitiesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HotelProfile;
