//erstelle eine neue Seite mit dem Namen Settings

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@libs/ui-web';
import React from 'react';
import Accounts from '../components/accounts';
import Notifications from '../components/notifications';


const Settings = () => {
  return (
    <Tabs defaultValue="accounts" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="accounts">Accounts</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="accounts">
        <Accounts />
      </TabsContent>
      <TabsContent value="notifications">
        <Notifications />
      </TabsContent>
    </Tabs>
  );
};

export default Settings;


