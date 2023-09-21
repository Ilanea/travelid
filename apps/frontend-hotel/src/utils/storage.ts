const storagePrefix = 'travel_id_';

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}accessToken`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(
      `${storagePrefix}accessToken`,
      JSON.stringify(token)
    );
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}accessToken`);
  },
};

export default storage;
