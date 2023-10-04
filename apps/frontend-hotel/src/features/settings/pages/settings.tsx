import { Tabs, TabsContent, TabsList, TabsTrigger } from '@libs/ui-web';

import SecurityForm from '../components/security-form';
import UserForm from '../components/user-form';

const fetchUserAPI = async () => {
  const response = await fetch('/api/username');
  const data = await response.json();
  // timeout
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
};

function SettingsPage() {
  /* useEffect(() => {
    const fetchUsername = async () => {
      const data = await fetchUserAPI();
      setUsername(data.username);
      setLoading(false);
    };

    setLoading(true);
    fetchUsername();
  }, []); */

  return (
    <div className="p-12 h-full space-y-2 justify-center flex">
      {/* <SecurityForm /> */}

      <Tabs defaultValue="account" className="w-[600px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UserForm />
        </TabsContent>
        <TabsContent value="password">
          <SecurityForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsPage;
