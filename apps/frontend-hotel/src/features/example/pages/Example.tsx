import { Button } from '@libs/ui-web';
import { useEffect, useState } from 'react';
import MyButton from '../components/MyButton';

const fetchUserAPI = async () => {
  const response = await fetch('/api/username');
  const data = await response.json();
  // timeout
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
};

function ExamplePage() {
  const [username, setUsername] = useState('kein username geladen');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      const data = await fetchUserAPI();
      setUsername(data.username);
      setLoading(false);
    };

    setLoading(true);
    fetchUsername();
  }, []);

  return (
    <div className="p-12 h-full space-y-2">
      <div>{loading ? 'loading...' : username}</div>
      <MyButton />
      <div className="space-x-2">
        <Button>Button</Button>
        <Button variant="secondary">Second</Button>
      </div>
    </div>
  );
}

export default ExamplePage;
