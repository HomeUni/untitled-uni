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
              © {currentYear}, <svg width="103" height="15" viewBox="0 0 143 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0479 25.42C10.0645 25.42 8.54785 24.8367 7.49785 23.67C6.47119 22.48 5.95785 20.835 5.95785 18.735V3.475H0.357852V0.289999H9.98285V18.945C9.98285 20.1117 10.2745 20.94 10.8579 21.43C11.4645 21.8967 12.1995 22.13 13.0629 22.13C13.5062 22.13 13.9612 22.0833 14.4279 21.99C14.8945 21.8733 15.4195 21.6983 16.0029 21.465L16.9479 24.44C16.1312 24.72 15.3612 24.9533 14.6379 25.14C13.9379 25.3267 13.0745 25.42 12.0479 25.42ZM30.5842 25.42C28.8342 25.42 27.2475 25.07 25.8242 24.37C24.4008 23.6467 23.2692 22.62 22.4292 21.29C21.5892 19.9367 21.1692 18.3033 21.1692 16.39C21.1692 14.5233 21.5892 12.925 22.4292 11.595C23.2692 10.2417 24.3658 9.20333 25.7192 8.48C27.0725 7.75667 28.5192 7.395 30.0592 7.395C31.7625 7.395 33.1975 7.745 34.3642 8.445C35.5542 9.145 36.4525 10.1133 37.0592 11.35C37.6892 12.5633 38.0042 13.9633 38.0042 15.55C38.0042 15.9467 37.9808 16.3317 37.9342 16.705C37.9108 17.055 37.8758 17.3467 37.8292 17.58H24.0742V14.71H35.2392L34.4692 15.62C34.4692 13.9167 34.0842 12.645 33.3142 11.805C32.5675 10.9417 31.5175 10.51 30.1642 10.51C29.2075 10.51 28.3442 10.7317 27.5742 11.175C26.8275 11.6183 26.2325 12.2833 25.7892 13.17C25.3458 14.0333 25.1242 15.1067 25.1242 16.39C25.1242 17.72 25.3692 18.8167 25.8592 19.68C26.3725 20.5433 27.0725 21.1967 27.9592 21.64C28.8692 22.0833 29.9192 22.305 31.1092 22.305C32.0192 22.305 32.8592 22.1767 33.6292 21.92C34.3992 21.6633 35.1692 21.3133 35.9392 20.87L37.3042 23.39C36.3942 23.9733 35.3675 24.4633 34.2242 24.86C33.0808 25.2333 31.8675 25.42 30.5842 25.42ZM43.1705 25V0.289999H47.2305V15.76H47.3705L55.1055 7.815H59.5855L47.2305 20.52V25H43.1705ZM55.9105 25L50.0655 16.53L52.4105 14.01L60.3205 25H55.9105Z" fill="#6D61F5"/>
                            <path d="M74.6918 25.42C72.9418 25.42 71.5535 25.1167 70.5268 24.51C69.5002 23.88 68.7652 23.0167 68.3218 21.92C67.8785 20.8233 67.6568 19.5517 67.6568 18.105V11H63.0718V7.99L67.8318 7.815L68.3568 2.425H71.6818V7.815H79.5218V11H71.6818V18.07C71.6818 19.0033 71.8102 19.785 72.0668 20.415C72.3235 21.0217 72.7435 21.4767 73.3268 21.78C73.9102 22.06 74.6802 22.2 75.6368 22.2C76.3835 22.2 77.0602 22.1417 77.6668 22.025C78.2735 21.9083 78.8568 21.745 79.4168 21.535L80.1868 24.44C79.4168 24.6967 78.5885 24.9183 77.7018 25.105C76.8152 25.315 75.8118 25.42 74.6918 25.42ZM90.1832 25.42C88.1765 25.42 86.7182 24.8133 85.8082 23.6C84.8982 22.3867 84.4432 20.6717 84.4432 18.455V7.815H88.4682V17.93C88.4682 19.3067 88.7015 20.3217 89.1682 20.975C89.6582 21.6283 90.4982 21.955 91.6882 21.955C92.4815 21.955 93.2048 21.7683 93.8582 21.395C94.5348 20.9983 95.2465 20.3333 95.9932 19.4V7.815H100.018V25H96.7282L96.4132 22.27H96.2732C95.4565 23.2033 94.5582 23.9617 93.5782 24.545C92.5982 25.1283 91.4665 25.42 90.1832 25.42ZM107.529 25V7.815H110.854L111.204 11.7H111.309C112.173 10.3 113.234 9.23833 114.494 8.515C115.778 7.76833 117.154 7.395 118.624 7.395C119.324 7.395 119.931 7.45333 120.444 7.57C120.958 7.68667 121.459 7.86167 121.949 8.095L121.109 11.49C120.549 11.3033 120.048 11.175 119.604 11.105C119.184 11.0117 118.648 10.965 117.994 10.965C116.828 10.965 115.684 11.3033 114.564 11.98C113.468 12.6567 112.476 13.835 111.589 15.515V25H107.529ZM135.516 25.42C133.766 25.42 132.179 25.07 130.756 24.37C129.332 23.6467 128.201 22.62 127.361 21.29C126.521 19.9367 126.101 18.3033 126.101 16.39C126.101 14.5233 126.521 12.925 127.361 11.595C128.201 10.2417 129.297 9.20333 130.651 8.48C132.004 7.75667 133.451 7.395 134.991 7.395C136.694 7.395 138.129 7.745 139.296 8.445C140.486 9.145 141.384 10.1133 141.991 11.35C142.621 12.5633 142.936 13.9633 142.936 15.55C142.936 15.9467 142.912 16.3317 142.866 16.705C142.842 17.055 142.807 17.3467 142.761 17.58H129.006V14.71H140.171L139.401 15.62C139.401 13.9167 139.016 12.645 138.246 11.805C137.499 10.9417 136.449 10.51 135.096 10.51C134.139 10.51 133.276 10.7317 132.506 11.175C131.759 11.6183 131.164 12.2833 130.721 13.17C130.277 14.0333 130.056 15.1067 130.056 16.39C130.056 17.72 130.301 18.8167 130.791 19.68C131.304 20.5433 132.004 21.1967 132.891 21.64C133.801 22.0833 134.851 22.305 136.041 22.305C136.951 22.305 137.791 22.1767 138.561 21.92C139.331 21.6633 140.101 21.3133 140.871 20.87L142.236 23.39C141.326 23.9733 140.299 24.4633 139.156 24.86C138.012 25.2333 136.799 25.42 135.516 25.42Z" fill="black"/>
                            </svg>

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
