import { Tabs, TabsContent, TabsList, TabsTrigger } from '@libs/ui-web';

import { HotelForm } from '../components/hotels/hotel-form';

const EditReward = () => {
  return (
    <div className="p-12 h-full space-y-2 justify-center flex">
      <Tabs defaultValue="account" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <HotelForm />
        </TabsContent>
        <TabsContent value="images">
          <div>Add Images...</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditReward;
