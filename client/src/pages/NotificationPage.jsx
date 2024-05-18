/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { NotificationCard } from "../components/NotificationCard";
import { useSelector } from "react-redux";

const NotificationPage = () => {
  // Fetching the user object from the Redux store
  const user = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noNotifications, setNoNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `/api/pnr/getAllNotifications/${user.currentUser._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
          if (data.notifications.length === 0) {
            setNoNotifications(true);
          }
        } else {
          setNoNotifications(true);
        }
      } catch (error) {
        setNoNotifications(true);
      } finally {
        setLoading(false);
      }
    };

    // Fetch notifications when the component mounts
    fetchNotifications();

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", fetchNotifications);
    };
  }, [user.currentUser._id]);

  if (loading) {
    return (
      <div className="text-center mt-40">
        <p className="font-serif text-2xl">Loading...</p>
      </div>
    );
  }

  if (noNotifications) {
    return (
      <div className="tex mt-40 w-full mb-96 red-600 font-bold text-2xl">
        <p className="text-center font-serif text-9xl">😭</p>
        <p className="text-center font-serif ">
          {" "}
          😒No Notification found. 😢
        </p>
        <p className="text-center font-serif">
          😊Please wait for SOMEONE FOR THE REQUEST. 😊
        </p>
        <p className="mt-4 text-center font-serif">
          {" "}
          Thank you for your patience! 😊
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 min-h-screen px-2 md:px-40 overflow-x-hidden ">
        {/* Mapping over notifications and rendering NotificationCard component */}
        {notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notificationId={notification._id}
            message={notification.message}
            subject={notification.subject}
            takeResponse={notification.takeResponse}
            active={notification.active}
            createdAt={notification.createdAt}
            seen={notification.seen}
            ownTravelId={notification.ownTravelId}
            otherTravelId={notification.otherTravelId}
          />
        ))}
      </div>
    </>
  );
};

export default NotificationPage;
