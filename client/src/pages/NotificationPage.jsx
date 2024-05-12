/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { NotificationCard } from "../components/NotificationCard";
import { useSelector } from "react-redux";

const NotificationPage = () => {
    // Fetching the user object from Redux store
    const user = useSelector(state => state.user);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`/api/pnr/getAllNotifications/${user.currentUser._id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data.notifications);
                } else {
                    console.error('Failed to fetch notifications');
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Fetch notifications when the component mounts
        fetchNotifications();

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('beforeunload', fetchNotifications);
        };
    }, [user.currentUser._id]);

    return (
        <>
        <div className="mt-8 min-h-screen px-2 md:px-40 overflow-x-hidden ">
            
            {/* Mapping over notifications and rendering NotificationCard component */}
            {notifications.map(notification => (
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
}

export default NotificationPage;
