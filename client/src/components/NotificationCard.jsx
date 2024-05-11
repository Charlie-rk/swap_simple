import React, { useState } from "react";
import { Banner, BannerCollapseButton, Button } from "flowbite-react";
import { FaBookOpen } from "react-icons/fa";
import { HiArrowRight, HiX } from "react-icons/hi";
import { MdExpandMore } from "react-icons/md";
import { BsChevronCompactDown } from "react-icons/bs";
import { BsChevronCompactUp } from "react-icons/bs";
import { useSelector } from "react-redux";



export function NotificationCard(props) {

  const user = useSelector(state => state.user);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const toggleMessageVisibility = () => {
    setShowFullMessage(!showFullMessage);
  };

  // const handleSuccess=async(req, res)=>{
  //   // console.log('h');
  //   console.log('I am inside handleSuccess');
  //   const res=await fetch('/api/pnr/acceptSwapRequest', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'}

  //   })
  //   // const res = await fetch('/api/auth/signin', {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify(formData),
  //   // });
  //   // if(props.)
  // }
  const handleSuccess = async () => {
    try {
      console.log('I am inside handleSuccess');
      if (props.subject === "AcceptSeatSwap") {
        const res = await fetch('/api/pnr/acceptSwap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            travelId1: props.ownTravelId,
            travelId2: props.otherTravelId
          })
        });
  
        if (res.ok) {
          console.log('Swap request accepted successfully');
          // If you want to perform any action after successful acceptance, you can do it here
        } else {
          console.error('Failed to accept swap request');
          // Handle error appropriately
        }
      } else if (props.subject === "ConfirmYourSwap") {
        const res = await fetch('/api/pnr/confirmSwap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.currentUser._id,
            ownTravelId: props.ownTravelId,
            otherTravelId: props.otherTravelId
          })
        });
  
        if (res.ok) {
          console.log('Swap confirmed successfully');
          // If you want to perform any action after successful confirmation, you can do it here
        } else {
          console.error('Failed to confirm swap');
          // Handle error appropriately
        }
      }
    } catch (error) {
      console.error('Error handling success:', error);
      // Handle error appropriately
    }
  };
  
  const handleFailure = () => {
    console.log('i am inside handleFailure');
  }

  return (
    <Banner>
      <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row">
        <div className="mb-4 md:mb-0 md:mr-4">
          <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">{props.subject}</h2>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            {showFullMessage ? props.message : props.message.slice(0, 50) + "..."}
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <a
            href="#"
            className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700" onClick={toggleMessageVisibility}
          >
            {/* <FaBookOpen className="mr-2 h-4 w-4" /> */}
            {/* <MdExpandMore /> */}
            {!showFullMessage ? <BsChevronCompactDown /> :
              <BsChevronCompactUp />}
            {/* {showFullMessage?'Show less' : 'Show more'} */}
          </a>
          <a
            href="#"
            className="mr-2 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Get started
            <HiArrowRight className="ml-2 h-4 w-4" />
          </a>

          <div className="flex flex-wrap gap-2">
            {/* <Button pill>Default</Button>
      <Button color="blue" pill>
        Blue
      </Button>
      <Button color="gray" pill>
        Gray
      </Button>
      <Button color="dark" pill>
        Dark
      </Button>
      <Button color="light" pill>
        Light
      </Button> */}
            {/* {!props.takeResponse && !props.active && ( */}
            <>
              <Button color="success" pill onClick={handleSuccess}>
                Success({props.subject})
              </Button>{" "}
              <Button color="failure" pill onClick={handleFailure}>
                Reject
              </Button>
            </>
            {/* )} */}

            {/* 
      <Button color="warning" pill>
        Warning
      </Button>
      <Button color="purple" pill>
        Purple
      </Button> */}
          </div>

          <BannerCollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </BannerCollapseButton>
        </div>
      </div>
    </Banner>
  );
}
