"use client"

import React, {useState, useEffect} from 'react'
import { Card, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import Link from 'next/link';
import getAllUserCourses from "../fauna/getAllUserCourses";
import EmptyState from "./elements/EmptyState"
import { useUser } from '@auth0/nextjs-auth0/client';
import getUser from '../fauna/getUser';
import createUser from '../fauna/createUser';
import Loading from './loading';
import SocialShare from './elements/SocialShare';

function CoursePlaceholder() {
  const [courses, setCourses] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 6; // Number of courses per page

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

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      if (typeof window !== 'undefined') {

        const user =  JSON.parse(localStorage.getItem('user' || {}) as any);

      const allCourses = await getAllUserCourses(user?.sid);

      if (allCourses.length > 0) {
        const reformedCollection = allCourses.map((course: any) => {
          return { ...course.data, id: course.ref.id };
        });
        setCourses(reformedCollection);
      } else {
        setCourses([]);
      }
    }
      setLoading(false);
    }
    fetchData();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

const data = [
  {
    title: 'Syllabus',
    description: 'See all syllabus available for you',
    status: 'enabled',
    link: '/syllabus'
  },
  {
    title: 'Premium Courses',
    description: 'Coming soon',
    status: 'disabled',
    link: '/'

  }
];

if(loading){
  return (
    <Loading/>
  )
}

  return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div  style={{marginBottom: 20}}>
          <Title>Dashboard</Title>
      <Text>
        Hello, {user?.name ?? 'Guest'}
      </Text>
      </div>
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
        {data.map((item) => (
          <Card key={item.title}>
            <Title>{item.description}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
            </Flex>
            <Flex className="mt-6">
              <Text>{item.title}</Text>
              <Link
              style={{backgroundColor: '#6D61F5',}}
                className="bg-green-500 text-size-10 text-sm text-white px-2 py-1 rounded mr-1 text-right"
                href={{
                  pathname: item.link,
                }}
                >Visit</Link>
            </Flex>
          </Card>
        ))}
      </Grid>

      <div  style={{marginBottom: 20, marginTop: 20}}>
          <Title>My Courses</Title>
      <Text>
        List of your current courses
      </Text>
      </div>

      {!loading && currentCourses.length === 0 ? (
        <EmptyState />
      ) : (
          <Grid numItemsSm={2} numItemsLg={3} style={{ marginTop: 20 }} className="gap-3">
          {currentCourses.map((item: any) => (
            <Card key={item.id}>
              <Title>{item.title}</Title>
              <br />
              <Text>{item?.description}</Text>
              <Flex className="mt-6">
                <Text style={{ textTransform: 'capitalize', width: 20 }}>
                  {item?.category as string}
                </Text>
                <Link
                style={{backgroundColor: '#6D61F5',}}
                  className="bg-blue-500 text-size-10 text-sm text-white px-2 py-1 rounded mr-1"
                  href={{
                    pathname: 'course-details',
                  }}
                  onClick={() => {
                    localStorage.setItem('courseData', JSON.stringify(item));
                  }}
                >
                  View
                </Link>
              </Flex>
            </Card>
          ))}
        
      </Grid>
      )}

<div className="flex  justify-center ">
            <div className="flex flex-wrap">
        {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            style={{marginTop: 50,
              backgroundColor: i + 1 === currentPage ? '#B1ABF4' : '#6D61F5' }}
            className={`bg-blue-500 text-white px-4 py-2 rounded mx-1 ${
              i + 1 === currentPage ? 'bg-blue-700' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </div>
      
      <Card  style={{marginTop: 20}}>
      <SocialShare
            url={'https://lekture.vercel.app/syllabus'}
            title={'Hi, I just invited you to visit lekture, A learning platform to learn anything for free.'}
          />
      </Card>
    </main>
  );
}

export default CoursePlaceholder;
