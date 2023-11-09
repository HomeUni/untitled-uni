/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
'use client';
import React, {useState, useEffect} from 'react';
import './Loading.css'; 
import Image from 'next/image';

export default  function Loading() {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="loading-container">
      <div className="centered-content">
      <Image
        className={`logo ${blink ? 'blink' : ''}`}
        src={'https://ucarecdn.com/5317c6ae-bf0f-402c-83aa-af80f13a533b/lekture2.png'}
        height={300}
        width={300}
        alt={`Lekture Loading...`}
      />
        {/* <p>Loading.....</p> */}
      </div>
    </div>
      <div className="tremor-base tr-relative tr-w-full tr-mx-auto tr-text-left tr-ring-1 tr-mt-6 tr-max-w-none tr-bg-white tr-shadow tr-border-blue-400 tr-ring-gray-200 tr-pl-6 tr-pr-6 tr-pt-6 tr-pb-6 tr-rounded-lg h-[360px]" />
    </main>
  );
}
