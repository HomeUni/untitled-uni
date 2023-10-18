'use client';

import React from 'react';
import { Card, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import getAllUsers from '../../fauna/getLessons';
import getAllUserCourses from '../../fauna/getLessons';
import Pagination from '../pagnation';
import Link from 'next/link';

function mycourses() {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasWindow, setHasWindow] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const coursesPerPage = 9;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const courses = await getAllUserCourses();
      const reformedCollection = courses.map((course: any) => {
        return { ...course.data, id: course.ref.id };
      });
      setCourses(reformedCollection);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid
        numItemsSm={2}
        numItemsLg={3}
        style={{ marginTop: 20 }}
        className="gap-6"
      >
        {courses.map((item) => (
          <Card key={item.id}>
            <Title>{item.title}</Title>
            <br />
            <Text>{item?.description}</Text>
            {/* {hasWindow && <ReactPlayer controls={false} width={'100%'} height={200} url={item.url} />} */}
            <Flex className="mt-6">
              <Text>{item?.category}</Text>
              <Link
                className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                href={{
                  pathname: 'course-details',
                  query: { id: item.id }
                }}
              >
                View Course
              </Link>
            </Flex>
          </Card>
        ))}
      </Grid>
      <div className="flex justify-center items-center fixed bottom-0 left-0 w-full bg-white p-4">
        <Pagination
          currentPage={currentPage}
          coursesPerPage={coursesPerPage}
          totalCourses={courses.length}
          handlePaginationClick={handlePaginationClick}
        />
      </div>
    </main>
  );
}

export default mycourses;
