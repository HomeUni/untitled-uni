'use client';
import React from 'react';
import SocialShare from "./elements/SocialShare";

export default function Footer() {
    const currentYear = new Date().getFullYear();

  return (
    <>
    
    <div style={{ marginTop: 20 }} className=" rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
          <div className="rounded-[14px] w-full h-full bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
              <p className="text-black text-[13px] font-mono w-[304px] h-10 flex items-center justify-center p-3">
              © {currentYear}, Untitled Learning
              </p>
              <a
                  className="text-white text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center whitespace-nowrap"
                  href=""
                  target="_blank"
                  rel="noreferrer"
              >
                  Visit HomePage
              </a>
          </div>
      </div><br />
      </>
  );
}
