import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isWhitelisted } from '../lib/whitelisted';
import { magic } from '../magic';

const AuthContext = createContext({
  user: null,
  loginUser: null,
  logoutUser: null,
});

export const AuthProvider: React.FC<{}> = (props) => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  const loginUser = async (email) => {
    if (!isWhitelisted(email)) {
      throw new InvalidEmailError();
    }

    try {
      // Grab auth token from loginWithMagicLink
      const didToken = await magic.auth.loginWithMagicLink({
        email,
        showUI: false,
        redirectURI: new URL('/', window.location.origin).href,
      });

      // Validate auth token with server
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
      if (res.status === 200) {
        setUser({ email });
        router.push('/');
      }
    } catch {
      setUser(null);
      throw new AuthFailedError();
    }
  };

  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push('/login');
    } catch {
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });
      } else {
        router.push('/login');
      }
    } catch (e) {
    }
  }

  useEffect(() => {
    checkUserLoggedIn();
  }, [])

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  )

}

export default AuthContext;

export class InvalidEmailError extends Error {
}

export class AuthFailedError extends Error {
}