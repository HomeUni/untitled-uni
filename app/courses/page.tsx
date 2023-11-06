"use client"

import React, {useState, useEffect} from 'react'
import { Card, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import Link from 'next/link';
import getAllCourses from "../../fauna/getLessons";
import { ToastContainer, toast } from "react-toastify";
import  createUserCourse  from "../../fauna/createUserCourse"
import "react-toastify/dist/ReactToastify.css";
import EmptyState from '../elements/EmptyState';
import Loading from '../loading';

interface Course {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string | string[]; 
  }


function CoursePlaceholder() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [category, setCategory] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const coursesPerPage: number = 6; 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (typeof window !== 'undefined') {
        const user =  JSON.parse(localStorage.getItem('user' || {}) as any);
        if(user?.sid){setUserLoggedIn(true);}
        setUser(user);
      }
      const storedData = localStorage.getItem('categoryData') as any;
      
      const parsedData = JSON.parse(storedData);

      setCategory(parsedData)

      const allCourses = await getAllCourses();

      const reformedCollection = allCourses.map((course: any) => {
        return { ...course.data, id: course.ref.id } as Course;
      });


      const matchingCourses = reformedCollection.filter((course:any) => course.category[0] === parsedData.title);

      setCourses(matchingCourses);
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


  const handleSubmit = async (course: Course) => {
    try {
      const newCollection = {
        title: course.title,
        description: course.description,
        category: course.category,
        url: course.url,
        userId: user?.sid,
      };
  
      const response = await createUserCourse(newCollection) as any;
  
      if (response.ts) {
        toast.success("Course added successfully");
      } else {
        toast.error("Failed to add the course"); // Handle the error case
      }
    } catch (error:any) {
      console.error("An error occurred:", error);
      if(error.message === 'instance not unique'){
        toast.warning("You already have this course on your list");
        return;
      }
      toast.error("An error occurred while adding the course");
    }
  };

  const isLoggedIn = () => !!userLoggedIn;


  if(loading){
    return (
      <Loading/>
    )
  }

  console.log('course', courses)

  return (

    <>
    <ToastContainer />
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="bg-white-200">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="bg-white rounded-md shadow px-3 py-2 flex space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:underline">Dashboard</a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <a href="/syllabus" className="text-gray-500 hover:underline">Syllabus</a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <a href="#" className="text-gray-900 font-medium">{category.title}</a>
            </li>
          </ol>
        </nav>
      </div>
          <div style={{ marginBottom: 20, marginTop: 20 }} className='mt-4 text-right'>
              <Text>All courses included in {category.title}</Text>
              {/* <Text>
                  List of your current courses
              </Text> */}
          </div>

          {/* <div className="mt-4 text-right">
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
          </div> */}

          {!loading && currentCourses.length === 0 ? (
        <EmptyState />
      ) : (
          <Grid numItemsSm={2} numItemsLg={3} style={{ marginTop: 20 }} className="gap-6">
              {currentCourses.map((item: any) => (
                  <Card key={item.id}>
                      <Title>{item.title}</Title>

                      <br />
                      <Text >{item?.description}
                      </Text>
                      <br/>
                      <div>
                          <Text><span className="bg-gray-300 text-white rounded-full px-2 py-1">{item?.category}</span></Text>
                          <br />
                          <div className='text-right'>
                              <Link
                              style={{float: 'right', backgroundColor: '#6D61F5'}}
                                  className="bg-blue-500 text-size-10 text-sm  text-white px-2 py-1 rounded mr-1"
                                  href={{
                                      pathname: 'course-details',
                                  }}
                                  onClick={() => {
                                      localStorage.setItem('courseData', JSON.stringify(item));
                                  } }
                              >
                                  Take Lekture
                              </Link>

                              {isLoggedIn() ? (
                                <button
                                  className="bg-black text-size-10 text-sm text-white px-2 py-1 rounded mr-1"
                                  onClick={() => {
                                    handleSubmit(item);
                                  }}
                                >
                                  + My Course
                                </button>
                              ) : (
                                <><br/>
                                  <small>Please sign in to add the course to your collection.</small><br/>
                                  <a
                                    className="bg-black text-size-10 text-sm text-white px-2 py-1 rounded mr-1"
                                    href='/api/auth/login'
                                  >
                                    Sign In
                                  </a>
                                </>
                              )}

                          </div>

                      </div>
                  </Card>
              ))}
          </Grid>
          )}

          <div className="mt-4 flex justify-center">
              {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
                  <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`bg-blue-500 text-white px-4 py-2 rounded mx-1 ${i + 1 === currentPage ? 'bg-blue-700' : ''}`}
                  >
                      {i + 1}
                  </button>
              ))}
          </div>
      </main></>
  );
}

export default CoursePlaceholder;
