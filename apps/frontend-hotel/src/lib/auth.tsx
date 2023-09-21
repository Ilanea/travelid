import {
  SignInDto,
  SignUpDto,
  UserResponse,
  getUser,
  signIn,
  signUp,
} from '../features/auth';
import storage from '@hotel/utils/storage';
import { configureAuth } from 'react-query-auth';

async function handleUserResponse(data: UserResponse) {
  const { accessToken, user } = data;
  storage.setToken(accessToken);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

async function signInFn(data: SignInDto) {
  const response = await signIn(data);
  const user = await handleUserResponse(response);
  return user;
}

async function signUpFn(data: SignUpDto) {
  const response = await signUp(data);
  const user = await handleUserResponse(response);
  return user;
}

async function signOutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

// old syntax
/* const authConfig = {
  loadUser,
  signInFn,
  signUpFn,
  signOutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Icons.Spinner />
      </div>
    );
  },
}; */

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn: loadUser,
    loginFn: signInFn,
    registerFn: signUpFn,
    logoutFn: signOutFn,
  });
