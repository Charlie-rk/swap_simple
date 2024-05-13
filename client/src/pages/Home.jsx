/* eslint-disable react/no-unescaped-entities */
import { Label, TextInput, Button } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import PnrCard from './../components/PnrCard';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import BackToTop from './../components/BackToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTravelID } from "../redux/user/userSlice";

export default function Home() {
 // const pnrSection=useRef();
 const { currentUser } = useSelector((state) => state.user);
 const {theme}=useSelector((state)=>state.theme);
  const [pnr, setPnr] = useState('');
  const [success, setSuccess] = useState(false);
  const [travel, setTravel] = useState({});
  const [loading, setLoading] = useState(false);
  const pnrCardRef = useRef(); // Create a ref for the PnrCard section
  
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setPnr(e.target.value);
  }

  const scrollUp=()=>{
    window.scrollTo({
        top:420,
        behavior:"smooth"
    })
}
    useEffect(()=>{
      AOS.init({duration:2000});
    },[]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      setSuccess(false);
      // const res = await fetch(`/api/pnr/${pnr}?user=${encodeURIComponent(JSON.stringify(currentUser))}`, {
        console.log(currentUser);
        const res = await fetch(`/api/pnr/${pnr}?userId=currentUser._id`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.ok) {
        const data = await res.json();
        setSuccess(true);
        setLoading(false);
        setTravel(data.travel);
        console.log(data.travel._id);
        // Scroll to the section where PnrCard is displayed
        dispatch(setTravelID({ travel__Id: data.travel._id }));
        scrollUp();
       
      } else {
        setLoading(false);
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error:', error);
    }
  };

  return (
    <>
    <div className="overflow-x-hidden">
   
      <div className=" ">
      
          
          {/* <img src="railway (1).png" alt="" /> */}
          {/* <img src="railway (2).png" alt="" /> */}
      
        <div className="h-[400px] w-auto bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1515165562839-978bbcf18277?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
          <div className=" flex flex-col gap-5  justify-center items-center h-full bg-gray-900 bg-opacity-55">
            <div className="p-2  md:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            <div className="flex flex-col items-center">
  <Label value="Your PnrInput" className="text-lg mb-2 mx-auto w-full md:w-[500px] text-center" />
  <div className="relative w-full md:w-[500px]">
    <TextInput
      type="text"
      placeholder="pnr input..."
      id="pnr"
      name="pnr"
      className="border-gray-300 rounded-md px-4 py-2 w-full h-16 text-center mt-2 focus:outline-none"
      onChange={handleChange}
      value={pnr}
    />
  </div>
</div>
            </div>
            <Button  
  gradientDuoTone="purpleToPink"
  type="submit" 
  onClick={
    handleSubmit}
  outline
   disabled={currentUser?false:true}
>
 {currentUser?"Know your PNR. Status":"Please Log-in"} 
</Button>
          </div>
        </div>
        {loading ?  
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop> :
          <div className=" flex flex-row  justify-center items-center ">
            {success && <div  ref={pnrCardRef} className="mx-auto"><PnrCard travel={travel} type='PnrConfirm'/></div> }
          </div>
        }
      </div>
      <div>
        
      </div>
      <div className="min-h-screen mt-56 w-full ">
      <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
          <h1 className="mb-8 h-6  text-3xl">Check PNR Status</h1>
          <p>Train journeys are a regular aspect of life for many Indians, whether it’s for vacations or business trips. With one of the largest rail networks in the world, the Indian railways ferry over a million passengers on a daily basis. The PNR number system plays a crucial role in managing this vast network efficiently. If you are planning to travel, it's essential to understand how the PNR number works. Read on to learn more about the PNR no. and how to check PNR status on redRail. </p>
        </div>
        <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
          <h2 className="mb-8 h-6  text-3xl">What is PNR Status?</h2>
          <p>PNR, which stands for Passenger Name Record, is a unique and critical number. It is a 10-digit number automatically generated by the IRCTC on booking train ticket. The PNR is like a digital certificate that encompasses the journey details of one or more passengers. To know or check any travel details, you must know the IRCTC PNR status.  </p>
        </div>
        <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
          <h2 className="mb-8 h-6  text-3xl">Facts about Railway PNR Status</h2>
          <p>Below are some quick facts about PNR status that passengers must be familiar with. </p>
          <ul>
            <li>PNR stands for Passenger Name Record, containing a 10-digit alphanumeric code.</li>
            <li>The PNR number consists of three digits known as PRS (Passenger Reservation System) followed by seven system-generated digits.</li>
            <li>The PNR number has a validity period of 9 months.</li>
            <li>PNR status is subject to change due to cancellations, reflecting real-time updates.</li>
            <li>Passengers can conveniently check their PNR status online through authorized IRCTC platforms</li>
            <li>PNR status is crucial for travellers to plan their journey effectively.</li>
            <li>PNR status indicates whether a passenger's seat is confirmed or on the waiting list.</li>
          </ul>
        </div>
        <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
          <h2 className="mb-8 h-6  text-3xl">PNR Status Enquiry and IRCTC Train PNR Status Predict</h2>
          <br /><br />
          <p>A database is run by the Centre of Railway Information Systems or CRIS containing all the information of train tickets, including the PNR number. By conducting a PNR Status Enquiry, passengers can access their train PNR status and related information.The 10-digit PNR Number is located at the top of the ticket which is essential for checking
          <br /><br />
          Note that, even if you use some other platform to book train tickets, you can check the 10 digit PNR status on redRail. Additionally, redRail offers a user-friendly interface for PNR enquiry, ensuring an easy and hassle-free process. That’s not all, the IRCTC PNR Status Prediction gives you a fair prediction of the chances of ticket confirmation, adding another layer of convenience for all passengers.
        </p>
      </div>
      <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
  
      <h2 className="mb-8 h-6  text-3xl"> Key Features of redRail PNR Status Ch</h2>
      <p>Train journeys are a regular aspect of life for many Indians, whether it’s for vacations or business trips. With one of the largest rail networks in the world, the Indian railways ferry over a million passengers on a daily basis. The PNR number system plays a crucial role in managing this vast network efficiently. If you are planning to travel, it's essential to understand how the PNR number works. Read on to learn more about the PNR no. and how to check PNR status on redRail. </p>
      </div>
    </div>
    </div>
</>
);

}
