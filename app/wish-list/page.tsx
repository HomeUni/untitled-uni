"use client"

import React, {useState, useEffect} from 'react'
import { Card, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import Link from 'next/link';
import getAllCourses from "../../fauna/getLessons";

interface Course {
    id: string;
    title: string;
    description: string;
    category: string | string[]; 
  }

function CoursePlaceholder() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const coursesPerPage: number = 6; 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const allCourses = await getAllCourses();
      const reformedCollection = allCourses.map((course: any) => {
        return { ...course.data, id: course.ref.id } as Course;
      });
      setCourses(reformedCollection);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Extract unique categories from courses (account for arrays)
    const uniqueCategories = [...new Set(
      courses.flatMap((course) =>
        Array.isArray(course.category) ? course.category : [course.category]
      )
    )];
    setCategories(uniqueCategories);
  }, [courses]);

  // Filter courses by selected category
  const filteredCourses: Course[] = selectedCategory
    ? courses.filter((course) => {
        const categoriesArray = Array.isArray(course.category)
          ? course.category
          : [course.category];
        return categoriesArray.includes(selectedCategory);
      })
    : courses;

  const indexOfLastCourse: number = currentPage * coursesPerPage;
  const indexOfFirstCourse: number = indexOfLastCourse - coursesPerPage;
  const currentCourses: Course[] = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">

      <div  style={{marginBottom: 20, marginTop: 20}}>
          <Title>All Courses</Title>
      <Text>
        List of your current courses
      </Text>
      </div>

      <div className="mt-4">
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category: any) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Grid numItemsSm={2} numItemsLg={3} style={{marginTop: 20}} className="gap-6">
      {currentCourses.map((item: any) => (
          <Card key={item.id}>
            <Title>{item.title}</Title>
            <br />
            <Text>{item?.description}
            </Text>
            <Flex className="mt-6">
              <Text>{item?.category}</Text>
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
