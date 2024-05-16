/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import { Button } from "flowbite-react";
import CardList from "../components/CardList";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const SwapResults = () => {
  const { travel__Id } = useSelector((state) => state.user);
  const {currentUser}=useSelector((state)=>state.user);
  const [matchType, SetMatchType] = useState("Perfect");
  const [travels, SetTravel] = useState([]);
  const [requestMade, setRequestMade] = useState(false);
  const { pnrNumber } = useParams();
  const navigate = useNavigate();
  console.log({ pnrNumber });
  console.log("hii");
  const location = useLocation();
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    SetMatchType("Perfect");
    const { result2 } = location.state;
    console.log("Location status ");
    console.log(location.state);
   // console.log(result2);
    SetTravel(result2);
  }, [currentUser]);

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
  const { results1 } = location.state;
  console.log(results1);
  if (!travels || results1.length===0) {
    if (requestMade) {
      // Ensure the request is made only once
      const addRequest = async () => {
        try {
          const res = await fetch(`/api/req/${currentUser._id}/${travel__Id}/add_request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          });

          const data = await res.json();
          if (data.status === '202' && data.success === 'false') {
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "You are not allowed for multiple requests for a single PNR number.",
            });
            navigate("/");
          }
          if (data.success === 'true') {
            MySwal.fire({
              title: "Swap - Simple",
              html: `
                <div style="text-align: center;">
                  <p style="font-size: 18px; font-weight: bold; color: green;">Your request has been <span style="color: green;">successfully</span> pulled in the All Requests section!</p>
                  <p style="font-size: 16px;">Please check your <span style="color: red;">email</span> for further updates or visit the <span style="color: red;">Notification</span> section.</p>
                </div>
              `,
              icon: "success"
            });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      addRequest(); 
      navigate('/request');
      // Call the async function
   //   setRequestMade(true); // Update state to indicate request has been made
    }
    return (
      <>
        <div className="tex mt-40 w-full mb-96 red-600 font-bold text-2xl">
          <p className="text-center font-serif text-9xl">😭</p>
          <p className="text-center font-serif "> 😒No travelers found. 😢</p>
          <p className="text-center font-serif">😊Please wait for SOMEONE FOR THE REQUEST. 😊</p>
          <p className="mt-4 text-center font-serif">Your preference has been included in the request list. </p>
          
          <p className="mt-4 text-center font-serif">Once your preference matches with another traveler's, we'll notify you through email. Thank you for your patience! 😊<span role="img" aria-label="alert">🚨</span></p>
               <div>  <Button outline className="mx-auto mt-4 w-1/2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm   " onClick={() => { setRequestMade(true); }}>Add to Request </Button> </div>

        </div>
      </>
    );
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
