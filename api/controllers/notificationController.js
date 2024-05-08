import mongoose from "mongoose";
import moment from "moment";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import Swap from "../models/swapModel.js";
import Travel from "../models/travelModel.js";

import 'dotenv/config';

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
export const sendNotification = async ({ userId1, userId2, message1, message2, travelId1, travelId2 }) => {
  try {
    const user1 = await User.findById(userId1);
    const user2 = await User.findById(userId2);

    if (!user1 || !user2) {
      console.error("User Not Found");
      return;
    }

    user1.notifications.push({ message: `${message1} (Travel ID: ${travelId1})` });
    user2.notifications.push({ message: `${message2} (Travel ID: ${travelId2})` });

    await user1.save();
    await user2.save();

    const emailOptions = {
      from: {
        name: "Your Name",
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
  const { requesterTravelId, accepterTravelId } = req.body;

  try {
    const requesterTravel = await Travel.findById(requesterTravelId);
    const accepterTravel = await Travel.findById(accepterTravelId);

    const requesterId = requesterTravel.user;
    const accepterId = accepterTravel.user;

    const PresentSeat = requesterTravel.passengerInfo;
    const WantedSeat = accepterTravel.passengerInfo;
    const messageToAccepter = `Someone with ${PresentSeat} is requesting to swap seats with you`;
    const messageToRequester = `You have successfully made a request to swap seats with seat ${WantedSeat}`;

    await sendNotification({
      userId1: requesterId,
      userId2: accepterId,
      message1: messageToRequester,
      message2: messageToAccepter,
      travelId1: requesterTravelId,
      travelId2: accepterTravelId
    });

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
  const { userId, travelId } = req.body;

  try {
    const swap = await Swap.findOne({
      $or: [{ travel1: travelId, user2: userId }, { travel2: travelId, user1: userId }]
    });

    if (!swap) {
      return res.status(404).json({ message: "Swap not found or not confirmed" });
    }

    if (swap.user1.equals(userId)) {
      swap.isConfirmedByUser1 = true;
    } else if (swap.travel1.equals(travelId)) {
      swap.isConfirmedByUser2 = true;
    }
    
    await swap.save();

    if (!(swap.isConfirmedByUser1 && swap.isConfirmedByUser2)) {
      return res.status(400).json({ message: "Swap not confirmed by both users" });
    }

    const travel1 = await Travel.findByIdAndDelete(swap.travel1);
    const travel2 = await Travel.findByIdAndDelete(swap.travel2);

    if (!travel1 || !travel2) {
      return res.status(404).json({ message: "Travel documents not found" });
    }

    const user1Message = `Your seat (${travel1.seatInfo.coach}-${travel1.seatInfo.berth}) is confirmed with ${travel2.user.name}'s seat (${travel2.seatInfo.coach}-${travel2.seatInfo.berth}).`;
    const user2Message = `Your seat (${travel2.seatInfo.coach}-${travel2.seatInfo.berth}) is confirmed with ${travel1.user.name}'s seat (${travel1.seatInfo.coach}-${travel1.seatInfo.berth}).`;

    await sendNotification({
      userId1: travel1.user._id,
      userId2: travel2.user._id,
      message1: user1Message,
      message2: user2Message,
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
};
