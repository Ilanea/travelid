import { stat } from 'fs';
import { useEffect, useState } from 'react';

import { Button } from '@libs/ui-web';

import { useAuthStore } from '@hotel/features/auth/store/auth';
import SettingsForm from '@hotel/features/settings/components/settings-form';

import { getUser } from '../../auth';
import MyButton from '../components/MyButton';
import SecurityForm from '../components/security-form';

const fetchUserAPI = async () => {
  const response = await fetch('/api/username');
  const data = await response.json();
  // timeout
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
};

const fetchUser = async () => {
  const user = await getUser();
  console.log('user', user);
};

const storeHandler = () => {
  const authUser = useAuthStore.setState({ user: null });
  console.log('authUser', authUser);
};

function SettingsPage() {
  const [username, setUsername] = useState('kein username geladen');
  const [loading, setLoading] = useState(false);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const authUser = useAuthStore((state) => state.user);

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
    <div className="p-12 h-full space-y-2">
      <h1>
        {' '}
        Profile Settings for:{' '}
        <div>{loading ? 'loading...' : authUser?.email}</div>
      </h1>

      {/* <SettingsForm/> */}
      <SecurityForm />
    </div>
  );
}

export default SettingsPage;
