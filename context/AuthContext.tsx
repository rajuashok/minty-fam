import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isWhitelisted } from '../lib/whitelisted';
import { magic } from '../magic';
import { get } from '../lib/api';
import { UserType } from '../common/types/user';

interface AuthContextType {
  user: UserType;
  setUser: (user: UserType) => void
  loginUser: (email: string) => Promise<void>
  logoutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: null,
  loginUser: null,
  logoutUser: null,
});

export const AuthProvider: React.FC<{}> = (props) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();

  /**
   * Fetch valid user data with given auth token.
   *
   * @param token Auth token
   */
  const fetchUser = async (token: string, redirect?: boolean) => {
    const res = await get('/api/user', true, token);
    if (res.status == 200) {
      const json = await res.json();
      setUser(json.user);
      if (redirect) {
        router.push('/');
      }
    } else {
      throw new AuthFailedError('Failed to login to /api/user');
    }
  }

  /**
   * Login user with given email. This succeeds if we're able to
   * both create an auth token AND fetch user data.
   *
   * @param email Email address to auth with.
   */
  const loginUser = async (email) => {
    if (!isWhitelisted(email)) {
      throw new InvalidEmailError();
    }

    try {
      // 1. AUTH TOKEN w/ submitted email
      const token = await magic.auth.loginWithMagicLink({
        email,
        showUI: true,
        redirectURI: new URL('/callback', window.location.origin).href,
      });

      // 2. FETCH AUTHed user
      await fetchUser(token, true);
    } catch {
      setUser(null);
      throw new AuthFailedError();
    }
  };

  /**
   * Invalidate existing user session and clear existing user data.
   */
  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push('/login');
    } catch {
    }
  };

  /**
   * Check for a valid user session (either using credentials in URL
   * or session in cookies). If we have a valid session use the token
   * to fetch and store user data.
   */
  const checkUserLoggedIn = async () => {
    try {
      if (router.pathname == '/callback') {
        // 1. AUTH TOKEN w/ credentials in URL
        const token = await magic.auth.loginWithCredential();
        // 2. FETCH AUTHed user
        await fetchUser(token, true);
      } else {
        // const isLoggedIn = await magic.user.isLoggedIn();
        // 1. AUTH TOKEN
        const token = await magic.user.getIdToken();
        if (!!token) {
          // 2. FETCH AUTHed user
          await fetchUser(token, router.pathname == '/login');
        } else {
          router.push('/login');
        }
      }
    } catch (e) {
      console.log(`User not logged in, error: ${e}`);
      router.push('/login');
    }
  }

  useEffect(() => {
    checkUserLoggedIn();
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  )

}

export default AuthContext;

export class InvalidEmailError extends Error {
}

export class AuthFailedError extends Error {
}