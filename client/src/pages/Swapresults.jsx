/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import { Button } from "flowbite-react";
import CardList from "../components/CardList";

import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SwapResults = () => {
  const [matchType, SetMatchType] = useState("Perfect");
  const [travels, SetTravel] = useState([]);
  const { pnrNumber } = useParams();
  console.log({ pnrNumber });
  console.log("hii");
  const location = useLocation();
  
  useEffect(() => {
    SetMatchType("Perfect");
    const { result2 } = location.state;
   // console.log(location.state);
   // console.log(result2);
    SetTravel(result2);
  }, []);

  const handlePerfectMAtch = () => {
    SetMatchType("Perfect");
    const { result2 } = location.state;
   // console.log(location.state);
   // console.log(result2);
    SetTravel(result2);
  };
  const handlePartiallyMAtch = () => {
    SetMatchType("Partially");
    const { results1 } = location.state;
   // console.log(location.state);
   // console.log(results1);
    SetTravel(results1);
  };

  // const { results1 } = location.state;
  // console.log(location.state);
  // console.log(results1);
  // const travels=results1;

  // Check if travels is undefined or not an array
  if (!travels || !Array.isArray(travels)) {
    return (
      <>
       <div className="tex mt-40 w-full mb-96 red-600 font-bold text-2xl">
  <p className="text-center font-serif text-9xl">😭</p>
  <p className="text-center font-serif "> 😒No travelers found. 😢</p>
  <p className="text-center font-serif">😊Please wait for SOMEONE FOR THE REQUEST. 😊</p>

  <p className="mt-4 text-center font-serif">Your preference has been included in the request list. </p>

  <p className="mt-4 text-center font-serif">Once your preference matches with another traveler's, we'll notify you through email. Thank you for your patience! 😊<span role="img" aria-label="alert">🚨</span></p>
</div>

      </>
    ); // Or you can render an error message
  }

  return (
    <div className="">
      <div className="mt-6 flex flex-wrap justify-center gap-8">
        <p> </p>
        <Button
          onClick={handlePerfectMAtch}
          className="w-1/3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          outline
        >
          <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            PERFECT MATCH
          </span>
        </Button>
        <Button
          onClick={handlePartiallyMAtch}
          className="w-1/3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          outline
        >
          <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            PARTIALLY MATCH
          </span>
        </Button>
        {matchType === "Perfect" && (
          <>
        
            <div className="tex  w-full  red-600 font-bold text-2xl">
          
          <p className="text-center font-serif "><span className="text-4xl">🕵️‍♂️</span>You Are looking For Perfect Matching<span className="text-4xl">🕵️‍♂️</span></p>
          <p className="text-center font-serif"><span className="text-4xl">🚉</span>😊Boarding Station and Destination station Matched 😊<span className="text-4xl">🚉</span></p>
        </div>
           
          </>
        )}
        {matchType === "Partially" && (
          <>
             <>
        
        <div className="tex  w-full  red-600 font-bold text-2xl">
      
      <p className="text-center font-serif "><span className="text-4xl">🕵️‍♂️</span>You Are looking For Partially Matching<span className="text-4xl">🕵️‍♂️</span></p>
      <p className="text-center font-serif"><span className="text-4xl">🚉</span>😊Boarding Station and Destination station  <span className="text-red-700 font-bold text-2xl p-2 " >NOT</span> Matched 😊<span className="text-4xl">🚉</span></p>
    </div>
       
      </>
          </>
        )}
      </div>
      <div className="flex flex-row flex-wrap ">
        {travels.map((travel, index) => (
          // <CardList key={index} travel={travel} type="SwapResults" />
          <div className=" mt-5 gap-4  m p-3 mx-auto">
            <CardList key={index} travel={travel} pnr={pnrNumber} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwapResults;
