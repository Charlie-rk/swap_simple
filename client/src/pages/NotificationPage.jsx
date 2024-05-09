import React from "react";
import { NotificationCard } from "../components/NotificationCard";
import { useSelector } from "react-redux";

const NotificationPage = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            {user.currentUser.notifications.map(notification=>(<NotificationCard key={notification._id} message={notification.message}></NotificationCard>))}
        </>
    );
}

export default NotificationPage;
