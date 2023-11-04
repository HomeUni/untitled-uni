"use client"

import React, {useState, useEffect} from 'react'
import { Card, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import Link from 'next/link';
import getCollections from "../../fauna/getCollections";
import { ToastContainer, toast } from "react-toastify";
import  createUserCourse  from "../../fauna/createUserCourse"
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import Loading from '../loading';
import getLessons from '../../fauna/getLessons';

interface Course {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string | string[]; 
  }


function CoursePlaceholder() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const coursesPerPage: number = 8; 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (typeof window !== 'undefined') {
        const user =  JSON.parse(localStorage.getItem('user' || {}) as any);
        if(user?.sid){setUserLoggedIn(true);}
        setUser(user);
      }
      const allCourses = await getCollections();
      const allLessons = await getLessons();
      const reformedLessons = allLessons.map((course: any) => {
        return { ...course.data, id: course.ref.id } as Course;
      });
      setLessons(reformedLessons);
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


  const countCourses = (category:string) => {
    const matchingCourses = lessons.filter((course) => course.category === category);
    return matchingCourses.length;
  }

  if(loading){
    return (
      <Loading/>
    )
  }

  return (

    <>
    <ToastContainer />
    <main className="p-4 md:p-10 mx-auto max-w-7xl">

          <div style={{ marginBottom: 20, marginTop: 20 }}>
              <Title>All Syllabuses</Title>
              <Text>
                  List of your current courses
              </Text>
          </div>

          <div className="mt-4 text-right">
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

          <Grid numItemsSm={2} numItemsLg={4} style={{ marginTop: 20 }} className="gap-4">
              {currentCourses.map((item: any) => (
                <><div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden sm:col-span-1 md:col-span-1 lg:col-span-1"
                >
                  <div className="relative h-52" style={{ height: 300 }}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        layout="fill"
                           />
                    ) : (
                      <Image
                        src={'https://static.vecteezy.com/system/resources/thumbnails/004/844/749/original/icon-loading-round-gradient-angle-loop-out-animation-with-dark-background-gradient-line-style-for-game-animation-and-others-free-video.jpg'}
                        alt={item.title}
                        layout="fill"
                         />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl text-black font-semibold mb-2">{item.title}</h3>
                    
                    <p style={{color: '#6D61F5'}} className="text-blue-300 text-sm">
                    {item?.category ?? 'Others'}
                    </p>
                    
                    <p className="text-gray-500 text-sm" style={{wordWrap: 'break-word', marginBottom: 10}}>{item.description ?? ' Learn'}</p>

                    <div >
                      <span style={{fontSize: 14}}>{countCourses(item.category)} Total Courses</span>
                    <Link
                      style={{float: 'right', backgroundColor: '#6D61F5'}}
                      className="bg-blue-500 text-white px-2 py-1 text-right text-sm sm rounded"
                      href={{
                        pathname: 'courses',
                      }}
                      onClick={() => {
                          localStorage.setItem('categoryData', JSON.stringify(item));
                      } }
                    >
                      View
                    </Link>
                    </div>
                  </div>
                </div>
                  </>
              ))}
          </Grid>

          <div className="flex  justify-center ">
            <div className="flex flex-wrap">
              {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
                  <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      style={{marginTop: 50,
                        backgroundColor: i + 1 === currentPage ? '#B1ABF4' : '#6D61F5' }}
                      className={`bg-blue-500 text-white px-4 py-2 rounded mx-1 ${i + 1 === currentPage ? 'bg-blue-700' : ''}`}
                  >
                      {i + 1}
                  </button>
              ))}
              </div>
          </div>
      </main></>
  );
}

export default CoursePlaceholder;
