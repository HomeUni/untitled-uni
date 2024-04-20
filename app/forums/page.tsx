"use client"

import React, { useState, useEffect } from 'react';
import { Title, Grid } from '@tremor/react';
import Link from 'next/link';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPosts from '../../fauna/getPosts';
import ForumPost from './components/ForumPost';
import AddPost from "../elements/AddPost";
import Loading from '../loading';
import EmptyState from '../elements/EmptyState';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  title: string;
  date: string;
  forum: string;
  user: User;
  content: string;
  likes: number;
  link: string;
  comments: any[]; // Update comments type
}

function PostPlaceholder() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      if (typeof window !== 'undefined') {
        const user = JSON.parse(localStorage.getItem('user' || {}) as any);
        if (user?.sid) { setUserLoggedIn(true); }
        setUser(user);
      }
      const posts = await getPosts();
      setPosts(posts);
      setLoading(false); // Set loading to false after data fetching
    }
    fetchData();
  }, []);

  const filterPostsByForum = (forum: string) => {
    if (forum === 'global') return posts;
    const filteredPosts = posts.filter(post => post.data.forum === forum);
    return filteredPosts;
  };

  const forums = [
    { name: 'Global', href: 'global', icon: '🌎', badge: 0 },
    { name: 'Random Stuff', href: 'random', icon: '😎', badge: 0 },
    { name: 'Announcement', href: 'announcements', icon: '📣', badge: 0 },
    { name: 'Learning', href: 'learning', icon: '📚🎓🧠', badge: 0 },
  ];

    const getBadgeCount = (forum: string) => {
      const filteredPosts = filterPostsByForum(forum);
      return filteredPosts.length;
    }

  return (
    <>
      <ToastContainer />
      <AddPost />
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className="mb-8 md:mb-10 mt-8 md:mt-10">
          {/* <Title>Filter conversation</Title> */}
          <div className="flex flex-wrap">
            {forums.map((item) => (
              <Link
                key={item.name}
                className=" px-2 py-1 text-sm rounded flex items-center justify-center bg-gray-200 mr-2 mb-2"
                href={'#'}
                onClick={() => setSelectedCategory(item.href)}
              >
                <span className="mr-1">{item.icon}</span>
                {item.name}
                <span style={{ backgroundColor: '#8a81f6', width: '20px', height: '20px' }} className="flex items-center justify-center text-white ml-1 rounded-full">{getBadgeCount(item.href)}</span>
              </Link>
            ))}
          </div>
        </div>
        {loading ? <Loading /> : (
          selectedCategory === '' ? (
            posts.length === 0 ? (
              <div className="text-center">
                <EmptyState message="No posts found." />
              </div>
            ) : (
              <Grid numItemsSm={1} numItemsLg={1} className="gap-4">
                {posts.map(post => (
                  <div key={post.id} className="mb-4">
                    <ForumPost post={post} user={user} />
                    <Link href={`/forums/${post.id}`}>
                      {/* <span className="text-green-500">Go to Forum</span> */}
                    </Link>
                  </div>
                ))}
              </Grid>
            )
          ) : (
            <Grid numItemsSm={1} numItemsLg={1} className="gap-4">
              {filterPostsByForum(selectedCategory).length === 0 ? (
                <div className="text-center">
                  <EmptyState message="No posts in this forum." />
                </div>
              ) : (
                filterPostsByForum(selectedCategory).map(post => (
                  <div key={post.id} className="mb-4">
                    <ForumPost post={post} user={user} />
                    <Link href={`/forums/${post.id}`}>
                      {/* <span className="text-green-500">Go to Forum</span> */}
                    </Link>
                  </div>
                ))
              )}
            </Grid>
          )
        )}
      </main>
    </>
  );
}

export default PostPlaceholder;
