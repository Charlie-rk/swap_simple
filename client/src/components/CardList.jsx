/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CardList = ({ travel,pnr }) => {
 // const data=useSelector((state))
  const { travel__Id } = useSelector((state) => state.user);
  const {currentUser}=useSelector((state)=>state.user);
  console.log(currentUser);
  console.log("Global-===");
  console.log(travel__Id);
  console.log({pnr});
  const travelId=travel._id;
  console.log(travelId);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const handleSwap = () => {
    //   console.log("Hiia ams ");
    MySwal.fire({
      title: '<p class="text-black ">Are you sure for SWAP?</p>  ',
      icon: 'question',
      showCancelButton: true,
      showDenyButton: true,
      // confirmButtonText: '<span  class="text-black" >Save As</span>',
      confirmButtonText: '<button class="font-bold" >Request User </button>',
      cancelButtonText: '<button class="font-bold">Cancel</button>',
      denyButtonText: '<button class="font-bold">Pull in Queue</button>',
      allowEscapeKey: false,
      customClass: {
        popup: 'my-popup',
        actions: 'flex '
      },
      didOpen: (popup) => {
        //  console.log(popup);
        popup.querySelector('.swal2-icon').classList.add('font-bold');
      }
    }).then(async (result) => { // Marking the function as async here
      if (result.isConfirmed) {
        console.log("hi--1");
        // go for email router --
        const res = await fetch(`/api/pnr/swapRequestNotification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requesterTravelId:travel__Id,
            accepterTravelId: travelId,
          })
        });
  
        const data = await res.json();
        console.log(data);
        if(data.success==='true'){
          MySwal.fire({
            title: "Swap - Simple",
            html: `
              <div style="text-align: center;">
                <p style="font-size: 18px; font-weight: bold; color: green;">Your request has been <span style="color: green;">successfully</span> sent!</p>
                <p style="font-size: 16px;">Please check your <span style="color: red;">email</span> for further updates or visit the <span style="color: red;">Notification</span> section.</p>
              </div>
            `,
            icon: "success"
          });
        }
        else{
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        navigate("/notification");
  
      } else if (result.isDenied) {
        // Handle deny action
        console.log("hi--2");
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
        navigate("/request");
        // go for pull request 
      } else {
        // Handle cancel action
        // cancel case no action 
        console.log("hi--3");
      }
    });
  };
  
    
  return (
    <Card className="max-w-sm bg-slate-100">
      <div>
        <img
          className="h-48 mx-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter  hover:scale-110"
          src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"
          alt="image description"
        />
      </div>
      <p className="text-2xl font- tracking-tight text-gray-900 dark:text-white">
        Preferences:
      </p>
      {travel.preferences.map((pref, index) => (
        <div key={index}>
          Coach: {pref.coach}, Seat No: {pref.seatNo}
        </div>
      ))}

      <div className="flex justify-between my-3 ">
        <p className="mr-10 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
          Train Name:
        </p>
        <p className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
          {travel.trainInfo.name}({travel.trainInfo.trainNo})
        </p>
      </div>
      <div className="flex justify-between my-3 ">
        <p className="text-blue-700 text-1xl font-bold tracking-tight  dark:text-white">
          Boarding: <br /> {travel.trainInfo.boarding}
        </p>
        <p className="text-blue-700 text-1xl font-bold tracking-tight  dark:text-white">
          Destination: <br />
          {travel.trainInfo.destination}
        </p>
      </div>
      <div className="text-center my-3">
        <p>
          {" "}
          <b>Date:{travel.trainInfo.dt}</b>
        </p>
      </div>

      <div className="border-solid border-2 border-blue-500  hover:rounded-md hover:border-purple-600-800 hover:scale-110 duration-1000 hover:bg-gradient-to-r from-purple-500 via-purple-200 to-blue-500 hover:font-semibold  hover:text-black rounded-sm py-8 px-4">
        <p>
          {" "}
          Passenger Info:
          {travel.passengerInfo.map((passenger, index) => (
            <p key={index}>
              Passenger {index + 1}: Coach {passenger.currentCoach}, Berth No.{" "}
              {passenger.currentBerthNo}
            </p>
          ))}
        </p>
      </div>

      <button  onClick={handleSwap}
        type="button"
        className="text-black font-bold bg-gradient-to-r from-purple-500 via-purple-200 to-blue-500 hover:scale-110 duration-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >  
         <span className='mx-auto h-'>
    <img className='mx-auto' style={{ maxWidth: '25px', maxHeight: '50px' }} src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/64/external-Namaste-pongal-icongeek26-glyph-icongeek26.png" alt="external-Namaste-pongal-icongeek26-glyph-icongeek26"/>
  </span>


        <span className="mx-auto"  >Ask for Swap </span>
        <svg
          className=" rtl:rotate-180 w-12 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </Card>
  );
};

export default CardList;
