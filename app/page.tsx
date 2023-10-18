'use client';

import React from 'react';
import {
  Card,
  Title,
  Text,
  Grid,
  Flex,
  Metric,
  BarList,
  Button
} from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import getAllCourses from '../fauna/getLessons';

function CoursePlaceholder() {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasWindow, setHasWindow] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const courses = await getAllCourses(); // NOTE :: this will be changed to user courses
      const reformedCollection = courses.map((course: any) => {
        return { ...course.data, id: course.ref.id };
      });
      setCourses(reformedCollection);
      setLoading(false);
    }
    fetchData();
  }, []);

  const data = [
    {
      title: 'My Courses',
      category: 'My Courses',
      stat: '10,234'
    },
    {
      category: 'My Wishlist',
      stat: '12,543'
    },
    {
      category: 'Categories',
      stat: '2,543'
    }
  ];

  // const courses = [
  //   {
  //     id: 'fdjhvsdjvkdsjvhgs',
  //     title: 'Learn Philosophy Today',
  //     category: 'Philosophy',
  //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, recusandae explicabo. Velit molestiae repellendus laborum eveniet distinctio. Minima dolorum rem placeat odit fuga, tenetur at nesciunt quo reiciendis, soluta ab.',
  //     url: 'https://www.youtube.com/watch?v=vo4pMVb0R6M&list=PLGMVCsud2sqX1F5BkUp7yiIFcGtFjb1hZ',

  //   },
  //   {
  //     id: 'fdjhvsdjvkdsjvsss',
  //     title: 'Learn Mathematics Today',
  //     category: 'Mathematics',
  //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, recusandae explicabo. Velit molestiae repellendus laborum eveniet distinctio. Minima dolorum rem placeat odit fuga, tenetur at nesciunt quo reiciendis, soluta ab.',
  //     url: 'https://www.youtube.com/watch?v=JbhBdOfMEPs&list=PLybg94GvOJ9FoGQeUMFZ4SWZsr30jlUYK',

  //   },
  //   {
  //     id: 'fdjhvsdjvkdsdjbkhgs',
  //     title: 'Learn Chemistry Today',
  //     category: 'Chemistry',
  //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, recusandae explicabo. Velit molestiae repellendus laborum eveniet distinctio. Minima dolorum rem placeat odit fuga, tenetur at nesciunt quo reiciendis, soluta ab.',
  //     url: 'https://www.youtube.com/watch?v=-KfG8kH-r3Y&list=PL0o_zxa4K1BWziAvOKdqsMFSB_MyyLAqS',
  //   }
  // ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div style={{ marginBottom: 20 }}>
        <Title>Dashboard</Title>
        <Text>Welcome back Godfred</Text>
      </div>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Link
            href={`/${item.category.replace(/\s/g, '').toLowerCase()}`}
            key={item.category}
          >
            <Card>
              <Title>{item.category}</Title>
              <Flex
                justifyContent="start"
                alignItems="baseline"
                className="space-x-2"
              >
                <Metric>{item.stat}</Metric>
                {/* <Text>Total views</Text> */}
              </Flex>
              <Flex className="mt-6">
                <Text>Pages</Text>
                <Text className="text-right">Views</Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Grid>

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
    </main>
  );
}

export default CoursePlaceholder;
