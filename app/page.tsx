"use client"

import React, {useState, useEffect} from 'react'
import { Card, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import Link from 'next/link';
import getAllUserCourses from "../fauna/getAllUserCourses";
import EmptyState from "./elements/EmptyState"

function CoursePlaceholder() {
  const [courses, setCourses] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({}) as any;
  const coursesPerPage = 6; // Number of courses per page

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      if (typeof window !== 'undefined') {

        const user =  JSON.parse(localStorage.getItem('user' || {}) as any);

        setUser(user);

      const allCourses = await getAllUserCourses(user?.sid);

      console.log('courses', allCourses)

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

console.log('user', user)
console.log('currentCourses', currentCourses)


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

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`bg-blue-500 text-white px-4 py-2 rounded mx-1 ${
              i + 1 === currentPage ? 'bg-blue-700' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
}

export default CoursePlaceholder;
