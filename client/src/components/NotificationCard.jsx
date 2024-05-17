/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Banner, BannerCollapseButton, Button } from "flowbite-react";
import { FaBookOpen } from "react-icons/fa";
import { HiArrowRight, HiX } from "react-icons/hi";
import { MdExpandMore } from "react-icons/md";
import { BsChevronCompactDown } from "react-icons/bs";
import { BsChevronCompactUp } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaCircle } from "react-icons/fa";

export function NotificationCard(props) {
  const user = useSelector((state) => state.user);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [seen, setSeen] = useState(props.seen);
  const [active, setActive] = useState(props.active);
  // const toggleMessageVisibility = () => {
  //   setShowFullMessage(!showFullMessage);
  // };
  const toggleMessageVisibility = async () => {
    setShowFullMessage(!showFullMessage);
    if (!seen) {
      await markNotificationAsSeen();
    }
  };

  const markNotificationAsSeen = async () => {
    try {
      console.log("Marking notification as seen");
      console.log(props.notificationId);

      const res = await fetch(
        `/api/pnr/markNotificationAsSeen/${user.currentUser._id}/${props.notificationId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ seen: true }),
        }
      );

      if (res.ok) {
        console.log("Notification marked as seen successfully");
        // Perform any action if needed
      } else {
        console.error("Failed to mark notification as seen");
        // Handle failure appropriately
      }
    } catch (error) {
      console.error("Error marking notification as seen:", error);
      // Handle error appropriately
    }
    console.log("Checking props", seen);
    // props.seen=true;
    setSeen(true);
    console.log("Checking props", seen);
  };

  const deactivateNotification = async () => {
    try {
      console.log("Deactivating notification frontend frontend");
      console.log(props.notificationId);

      const res = await fetch(
        `/api/pnr/deactivateNotification/${user.currentUser._id}/${props.notificationId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: false }),
        }
      );
      if (res.ok) {
        console.log("Notification deactivated successfully");
      } else {
        console.error("Failed to mark notification as seen");
      }
    } catch (error) {
      console.error("Error deactivating notification", error);
    }
    console.log("Checking useState", active);
    setActive(false);
    console.log("Checking useState", active);
  };

  const handleSuccess = async () => {
    try {
      console.log("I am inside handleSuccess");
      if (props.subject === "AcceptSeatSwap") {
        const res = await fetch("/api/pnr/acceptSwap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            travelId1: props.ownTravelId,
            travelId2: props.otherTravelId,
          }),
        });

        if (res.ok) {
          console.log("Swap request accepted successfully");
          // If you want to perform any action after successful acceptance, you can do it here
        } else {
          console.error("Failed to accept swap request");
          // Handle error appropriately
        }
      } else if (props.subject === "ConfirmYourSwap") {
        const res = await fetch("/api/pnr/confirmSwap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.currentUser._id,
            ownTravelId: props.ownTravelId,
            otherTravelId: props.otherTravelId,
          }),
        });

        if (res.ok) {
          console.log("Swap confirmed successfully");
          // If you want to perform any action after successful confirmation, you can do it here
        } else {
          console.error("Failed to confirm swap");
          // Handle error appropriately
        }
      }
    } catch (error) {
      console.error("Error handling success:", error);
      // Handle error appropriately
    }
    window.location.reload();
  };



  const handleFailure = async () => {
    try {
      console.log("Inside handleFailure");
      const res = await fetch("/api/pnr/rejectSwapRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterTravelId: props.otherTravelId,
          rejecterTravelId: props.ownTravelId
        }),
      });

      if (res.ok) {
        console.log("Swap request rejected successfully");
        // If you want to perform any action after successful rejection, you can do it here
      } else {
        console.error("Failed to reject swap request");
        // Handle error appropriately
      }
    } catch (error) {
      console.error("Error handling failure:", error);
      // Handle error appropriately
    }
    window.location.reload();
  };

  const handleDelete = async () => {
    try {
      console.log("Inside handleDelete in frontend");
      if(props.takeResponse && props.active){
        window.location.reload();
        window.alert("You have some unanswered query in the message. Please complete it before deleting");
        return;
      }
      const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
      if (!confirmDelete) {
        window.location.reload();
        return; // If the user cancels the confirmation, exit the function
      }
      const res = await fetch('/api/pnr/deleteNotification', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notificationId: props.notificationId
        })
      });

      if (res.ok) {
        console.log("Notification deleted successfully");
        // If you want to perform any action after successful deletion, you can do it here
      } else {
        console.error("Failed to delete notification successfully");
        // Handle error appropriately
      }
    } catch (error) {
      console.log("Error deleting notification", error);
    }
  }


  return (
    <div className="my-2 ">
      <Banner className="rounded-lg ">
        <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            {/* <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">{props.subject}</h2> */}
            <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white flex items-center">
              {!seen && <FaCircle className="text-green-400 mr-2" />}
              {props.subject}
            </h2>
            {/* <p className={`flex items-center text-sm ${seen?:'font-normal':'font-bold'} text-gray-500 dark:text-gray-400`}> */}
            <p
              className={`flex items-center text-sm ${seen ? "font-normal" : "font-bold"
                } text-gray-500 dark:text-gray-400`}
            >
              {showFullMessage
                ? props.message
                : props.message.slice(0, 50) + "..."}
            </p>
          </div>
          <br />
          <div className="flex mt-3 flex-col sm:flex-row shrink-0 items-center">
            <div className="w-full mt-2 sm:mt-0">
              <a
                href="#"
                className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onClick={toggleMessageVisibility}
              >
                {/* <FaBookOpen className="mr-2 h-4 w-4" /> */}
                {/* <MdExpandMore /> */}
                {!showFullMessage ? (
                  <BsChevronCompactDown />
                ) : (
                  <BsChevronCompactUp />
                )}
                {/* {showFullMessage?'Show less' : 'Show more'} */}
              </a>
            </div>
            <div className="sm:mr-2 mt-2 sm:mt-0">
              <a
                href="#"
                className=" w-full mr-2 inline-flex flex-row items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Get started
                <HiArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            {/* <div className="w-full sm:mr-2 mt-2 sm:mt-0 "> */}
            <div className={`w-full sm:mr-2 mt-2 sm:mt-0 ${!props.takeResponse ? "hidden" : ""}`}>

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
              <Button
                className="w-full rounded-lg"
                color="success"
                outline
                onClick={() => {
                  handleSuccess();
                  markNotificationAsSeen();
                  deactivateNotification();
                }}
                disabled={!active}
              >
                Success({props.subject})
              </Button>{" "}
            </div>
            <div className={`w-full sm:mr-2 mt-2 sm:mt-0 ${!props.takeResponse ? "hidden" : ""}`}>
              <Button
                className="w-full rounded-lg"
                color="failure"
                outline
                onClick={() => {
                  handleFailure();
                  markNotificationAsSeen();
                  deactivateNotification();
                }}
                disabled={!active}
              >
                Reject
              </Button>
            </div>
            {/* )} */}

            {/* 
      <Button color="warning" pill>
        Warning
      </Button>
      <Button color="purple" pill>
        Purple
      </Button> */}
          </div>

          <BannerCollapseButton
            color="gray"
            className="border-0 bg-transparent text-gray-500 dark:text-gray-400"

          >
            <HiX className="h-4 w-4" onClick={handleDelete} />
          </BannerCollapseButton>
          {/* </div> */}
        </div>
      </Banner>
    </div>
  );
}
