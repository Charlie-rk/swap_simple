/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import { theme } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function About() {
  const { theme } = useSelector((state) => state.theme);
  const notify = () => toast.success("Wow so easy!");
  return (
    <div className="overflow-x-hidden min-h-screen">
      <div className=" flex items-center justify-center overflow-x-hidden">
        <div className="max-w-2xl mx-auto p-3 text-center">
          <div>
            <h1 className="text-3xl font font-semibold text-center my-4 font-serif ">
              SWAP-SIMPLE <hr />
            </h1>
      <hr className="text-black bg-black"/>
      <hr className="text-black bg-black"/>
      <hr className="text-black bg-black"/>
            <p className="text-2xl font-semibold font-serif ">swap your seat</p>
            <br />
            <div className="text-md text-gray-500 flex flex-col gap-6">
              <div className="text-md text-gray-500 flex flex-col gap-6">
                <p className="text-1xl text-green-700 font-semibold font-serif ">
                  Welcome to the 🚈 Railway Service 🚈 Project! This innovative
                  initiative was conceived by Rustam Kumar and Sangam Kumar
                  Mishra, two students from IIT Bhuvaneshwar, with invaluable
                  guidance from Professor Srikant Gollapudi and Professor
                  Srinivas Penisetty. We express our heartfelt appreciation for
                  their unwavering support and mentorship throughout this
                  endeavor.
                </p>
              
                <p
                  className={`text-1xl ${
                    theme === "light" ? "text-black" : "text-white"
                  } font-semibold font-serif`}
                >
                  Our project is dedicated to enhancing the travel🚈 experience
                  for passengers, especially groups, by offering a unique seat
                  swapping feature. It empowers travelers who find 🕵️‍♂️ themselves
                  dissatisfied with their allocated seats to seamlessly exchange
                  them with others if those seats better suit their preferences.
                  This service is designed with a strong emphasis on public
                  welfare, aiming to address the common inconvenience faced by
                  passengers when assigned random seats. By fostering a sense of
                  community and cooperation, we strive to contribute positively
                  to society's well-being.🤗
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-black bg-black"/>
      <hr className="text-black bg-black"/>
      <hr className="text-black bg-black"/>
      <hr className="text-black bg-black"/>
      <hr className="text-black bg-black"/>
     
      <p className=" font-serif text-2xl text-red-700 text-left w-screen  p-20 mt-[-50px] overflow-x-hidden border-double shadow-2xl">
       🙏 We urge all users to utilize this service responsibly and ethically,
        keeping in mind the collective benefit of the community 😊. It is essential
        to refrain from engaging in any form of malpractice, as all activities
        within the system are meticulously monitored and traced. Let's join
        hands to make train travel not only convenient but also enjoyable and
        inclusive for all passengers! 🫶🫶
      </p>
    </div>
  );
}
