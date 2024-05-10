/* eslint-disable no-unused-vars */
import React from "react";
import { NotificationCard } from "../components/NotificationCard";
import { useSelector } from "react-redux";

const NotificationPage = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            {user&&user.currentUser.notifications.map(notification=>(<NotificationCard key={notification._id} message={notification.message}></NotificationCard>))}
        </>
    );
}

export default NotificationPage;
