//It is new one
import mongoose from "mongoose";
import moment from "moment";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import Swap from "../models/swapModel.js";
import Travel from "../models/travelModel.js";

import 'dotenv/config';

export const getAllNotifications = async (req, res) => {
  console.log("RKSAN");
  try {
    // Extract userId from the request parameters
    const { userId } = req.params;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log(`Received request for fetching notifications for user ${userId}`);

    // Find the user by userId
    const user = await User.findById(userId);
    console.log(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user has notifications
    if (!user.notifications || user.notifications.length === 0) {
      console.log("NO notification for the user");
      return res.status(404).json({ error: 'No notifications found for this user' });
    }

    // Sort notifications by createdAt in descending order (-1)
    console.log("OH notfiy him");
    const sortedNotifications = user.notifications.sort((a, b) => b.createdAt - a.createdAt);

    // Send the sorted notifications
    res.status(200).json({ notifications: sortedNotifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const markNotificationAsSeen = async (req, res) => {
  try {
    // Extract the userId and notificationId from the request parameters
    const { userId, notificationId } = req.params;
    console.log("userId", userId);
    console.log("notificationId", notificationId);

    // Check if userId and notificationId are provided
    if (!userId || !notificationId) {
      return res.status(400).json({ error: 'User ID and Notification ID are required' });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the notification in the user's notifications array
    const notification = user.notifications.find(n => n._id.toString() === notificationId);

    // Check if notification exists
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Update the 'seen' property of the notification to true
    notification.seen = true;

    // Save the changes to the user object
    await user.save();

    // Send a success response
    res.status(200).json({ message: 'Notification marked as seen successfully' });
  } catch (error) {
    console.error('Error marking notification as seen:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deactivateNotification = async (req, res) => {
  try {
    const { userId, notificationId } = req.params;
    console.log(userId);
    console.log(notificationId);
    if (!userId || !notificationId) {
      return res.status(400).json({ error: 'User ID and Notification ID are required' });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // const notification = user.notifications.find(n => n._id.toString() === notificationId);
    const notification = user.notifications.find(n => n._id.toString() === notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.active = false;
    await user.save();
    res.status(200).json({ message: 'Notification deactivated successfully' });


  } catch (error) {
    console.log('Error deactivating notification', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent successfully");
  } catch (error) {
    console.error("Error sending email", error);
    // Logging and returning instead of throwing error
  }
};

export const sendNotification = async ({ user1, user2, message1, message2, subject1, subject2, takeResponse1, takeResponse2, travelId1, travelId2 }) => {
  try {
    console.log(user1);
    console.log(user2);
    // const user1 = await User.findById(userId1);
    // const user2 = await User.findById(userId2);

    if (!user1 || !user2) {
      console.error("User Not Found");
      return;
    }

    user1.notifications.push({ message: `${message1}`, subject: `${subject1}`, takeResponse: takeResponse1, ownTravelId: `${travelId1}`, otherTravelId: `${travelId2}` });
    user2.notifications.push({ message: `${message2}`, subject: `${subject2}`, takeResponse: takeResponse2, ownTravelId: `${travelId2}`, otherTravelId: `${travelId1}` });

    await user1.save();
    await user2.save();

    const emailOptions = {
      from: {
        name: "sangam kumar mishra",
        address: process.env.USER,
      },
      to: [user1.email, user2.email],
      subject: "You have some new notifications",
      text: "You have some new notifications.",
      cc: ["sangamkr.mishra@gmail.com"], // Corrected cc field to be an array
    };

    await sendMail(emailOptions);

    console.log("Notifications sent successfully");
  } catch (error) {
    console.error("Error sending Notification", error);
    // Logging and returning instead of throwing error
  }
};

export const swapRequestNotification = async (req, res) => {
  console.log("Swap request notification");
  console.log(req.body);

  //const {requesterId,accepterTravelId}=req.body;
  const { requesterTravelId, accepterTravelId } = req.body;


  try {
    const requesterTravel = await Travel.findById(requesterTravelId).populate('user');
    const accepterTravel = await Travel.findById(accepterTravelId).populate('user');


    console.log(requesterTravel);
    console.log(accepterTravel);
    const requesterUser = requesterTravel.user;
    const accepterUser = accepterTravel.user;

    console.log(requesterUser);
    console.log(accepterUser);
    const PresentSeat = requesterTravel.passengerInfo;
    const WantedSeat = accepterTravel.passengerInfo;
    const messageToAccepter = `Someone with ${PresentSeat} is requesting to swap seats with you`;
    const messageToRequester = `You have successfully made a request to swap seats with seat ${WantedSeat}`;

    const subjectforRequester = "RequestSeatSwap";
    const subjectforAccepter = "AcceptSeatSwap";

    await sendNotification({
      user1: requesterUser,
      user2: accepterUser,
      message1: messageToRequester,
      message2: messageToAccepter,
      subject1: subjectforRequester,
      subject2: subjectforAccepter,
      takeResponse1: false,
      takeResponse2: true,
      travelId1: requesterTravelId,
      travelId2: accepterTravelId
    });
    console.log("Notify him succeed");
    return res
      .status(200)
      .json({ message: "Swap request notification sent successfully" });
  } catch (error) {
    console.error("Error sending swap request notification", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const acceptSwapRequest = async (req, res) => {
  const { travelId1, travelId2 } = req.body;

  try {

    console.log("I am inside acceptSwapRequest");
    const travel1 = await Travel.findById(travelId1);
    const travel2 = await Travel.findById(travelId2);

    const userId1 = travel1.user;
    const userId2 = travel2.user;

    const user1 = await User.findById(userId1);
    const user2 = await User.findById(userId2);

    if (!user1 || !user2 || !travel1 || !travel2) {
      return res.status(404).json({ message: "User or Travel Not Found" });
    }

    const message1 = `You can confirm your swaps. You may communicate with your swapping partners through ${user2.name} (${user2.email}, ${user2.phone}).`;
    const message2 = `You can confirm your swaps. You may communicate with your swapping partners through ${user1.name} (${user1.email}, ${user1.phone}).`;

    const subject1 = "ConfirmYourSwap";
    const subject2 = "ConfirmYourSwap";

    const newSwap = new Swap({
      user1: userId1,
      user2: userId2,
      travel1: travel1._id,
      travel2: travel2._id,
    });

    await newSwap.save();

    await sendNotification({
      userId1: userId1,
      userId2: userId2,
      message1: message1,
      message2: message2,
      subject1: subject1,
      subject2: subject2,
      takeResponse1: true,
      takeResponse2: true,
      travelId1: travel1._id,
      travelId2: travel2._id
    });

    return res
      .status(200)
      .json({ message: "Contact information swapped successfully" });
  } catch (error) {
    console.error("Error accepting swap request", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const confirmSwapSeat = async (req, res) => {
  const { userId, ownTravelId, otherTravelId } = req.body;
  try {
    const swap = await Swap.findOne({
      $or: [{ user1: userId, travel1: ownTravelId, travel2: otherTravelId }, { user2: userId, travel1: otherTravelId, travel2: ownTravelId }]
    });

    if (!swap) {
      return res.status(404).json({ message: "Swap not found or not confirmed" });
    }

    // if(swap.travel1.equals(ownTravelId))
    if (swap.user1.equals(userId)) {
      swap.isConfirmedByUser1 = true;
    }
    else if (swap.user2.equals(userId)) {
      swap.isConfirmedByUser2 = true;
    }
    await swap.save();

    if (!(swap.isConfirmedByUser1 && swap.isConfirmedByUser2)) {
      return res.status(400).json({ message: "Swap not confirmed by both users" });
    }
    const travel1 = await Travel.findByIdAndDelete(ownTravelId);
    const travel2 = await Travel.findByIdAndDelete(otherTravelId);
    if (!travel1 || !travel2) {
      return res.status(404).json({ message: "Travel documents not found" });

    }
    const user1Message = `Your seat (${travel1.seatInfo.coach}-${travel1.seatInfo.berth}) is confirmed with ${travel2.user.name}'s seat (${travel2.seatInfo.coach}-${travel2.seatInfo.berth}).`;
    const user2Message = `Your seat (${travel2.seatInfo.coach}-${travel2.seatInfo.berth}) is confirmed with ${travel1.user.name}'s seat (${travel1.seatInfo.coach}-${travel1.seatInfo.berth}).`;

    const subject1 = "SeatSwapConfirmed";
    const subject2 = "SeatSwapConfirmed";
    await sendNotification({
      userId1: travel1.user._id,
      userId2: travel2.user._id,
      message1: user1Message,
      message2: user2Message,
      subject1: subject1,
      subject2: subject2,
      takeResponse1: false,
      takeResponse2: false,
      travelId1: travel1._id,
      travelId2: travel2._id
    });

    return res.status(200).json({
      message: "Travel schemas deleted successfully and notifications sent",
    });

  } catch (error) {
    console.error("Error confirming swap seat", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}