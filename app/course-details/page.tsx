'use client';

import { Card,Text, Title} from '@tremor/react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import SocialShare from '../elements/SocialShare';


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

return (
<main className="p-4 md:p-10 mx-auto max-w-7xl">
    <div  style={{marginBottom: 20}}>
    <div className="bg-white-200">
  <nav className="flex" aria-label="Breadcrumb">
    <ol className="bg-white rounded-md shadow px-3 py-2 flex space-x-2">
      <li>
        <a href="/" className="text-gray-500 hover:underline">Dashboard</a>
      </li>
      <li>
        <span className="text-gray-500">/</span>
      </li>
      {/* <li>
        <a href="#" className="text-gray-500 hover:underline">Courses</a>
      </li>
      <li>
        <span className="text-gray-500">/</span>
      </li> */}
      <li>
        <a href="#" className="text-gray-900 font-medium">{courseData.title}</a>
      </li>
    </ol>
  </nav>
</div>

    </div>
    <Card className="mt-8">
    {courseData && (
        <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Watch Course</h2>
        {hasWindow && (
          <div className="mx-auto max-w-full">
            <ReactPlayer
              controls={true}
              className="w-full"
              width={'100%'}
              height={500}
              url={courseData.url}
            />
          </div>
        )}
        <div className="mx-auto max-w-full text-left">
          <p className="text-lg font-semibold">Title: {courseData.title}</p>
          <p className="text-base text-gray-700">Description: {courseData.description}</p>
        </div>
      </div>
      
      )}
</Card>
</main>
);
}
