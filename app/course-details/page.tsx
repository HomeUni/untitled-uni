'use client';

import { Card,Text, Title} from '@tremor/react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function CourseDetails() {
    const [courseData, setCourseData] = React.useState({} as any);

    const [hasWindow, setHasWindow] = React.useState(false);

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);

    React.useEffect(() => {
      // Retrieve the data from local storage
      const storedData = localStorage.getItem('courseData');
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCourseData(parsedData);
      }
    }, []);

    console.log('course', courseData)
return (
<main className="p-4 md:p-10 mx-auto max-w-7xl">
    <div  style={{marginBottom: 20}}>
    <Link 
        className="bg-blue-500 font-200 text-white px-2 py-1 rounded mr-1"
        href={{pathname: '/'}}>{'<- '}back</Link>
        <Title>Dashboard/Courses/{courseData.title}</Title>
    </div>
    <Card className="mt-8">
    {courseData && (
        <div>
          <h2>Watch Course</h2>
          {hasWindow && <ReactPlayer controls={false} width={'100%'} height={500} url={courseData.url} />}
        
          <p>Title: {courseData.title}</p>
          <p>Description: {courseData.description}</p>
        </div>
      )}
</Card>
</main>
);
}
