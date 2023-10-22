/* eslint-disable @next/next/no-async-client-component */
'use client';
import React from 'react';
import Navbar from './navbar';
import { useUser } from '@auth0/nextjs-auth0/client';
import getUser from '../fauna/getUser';
import createUser from '../fauna/createUser';

export default async function Nav() {
  const { user, error, isLoading } = useUser();
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  React.useEffect(() => {
    async function fetchData() {
        if (!user) return;
        const myUser = await getUser(user?.email);
        localStorage.setItem('user', JSON.stringify(myUser))
        if(!myUser){
          const addUser = await createUser(user) as any;
          localStorage.setItem('user', JSON.stringify(addUser.data))
        }
    }
    fetchData();
}, [user])

  return <Navbar user={user ?? null} />;
}
