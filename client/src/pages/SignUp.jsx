/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth1 } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";
import OtpInput from "react18-input-otp";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { red } from "@mui/material/colors";

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSignUp, SetshshowSignUp] = useState(false);
  const navigate = useNavigate();
  const [showSend, SetshowSend] = useState(true);
  const notify = () => toast.success("📤 Otp Sent Succesfully ! 📤");
  const notify1 = () =>
    toast("🫶 Otp Verified Succesfully ! 🫶 Please click on Signup Button");
  const notify2 = () => toast.error("😭 Otp verfication failed ! 😭");
  const notify3 = () => toast.error("😭 Failed In Registration ! 😭");

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth1,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          onSignup();
        },
        "expired-callback": () => {},
      }
    );
  }
  function onSignup() {
    SetshowSend(false);
    setLoading1(true);
    console.log("ghu");
    onCaptchVerify();
    console.log("5667");
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth1, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading1(false);
        setShowOTP(true);
        notify();
      })
      .catch((error) => {
        // SetshowSend(true);
        //notify2();
        console.log(error);
        setLoading1(false);
      });
  }
  function onOTPVerify() {
    setLoading1(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setShowOTP(false);
        notify1();
        SetshshowSignUp(true);
        setLoading1(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setShowOTP(false);
        notify2();
        SetshowSend(true);
        console.log(err);
        setLoading1(false);
      });
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hii1");
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      // // Wait until OTP verification is successful
      // console.log("byee");
      // //  onSignup();
      // console.log("HOOO");

      // Proceed with user registration after OTP verification
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        SetshshowSignUp(false);
        navigate("/sign-in");
      }
      SetshowSend(true);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      notify3();
      SetshowSend(true);
    }
  };

  return (
    <>
       <Backdrop 
            sx={{ color: 'green', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading1}
          >
            <CircularProgress color="inherit"  className="h-10 w-28 text-5xl"/>
            <CircularProgress color="inherit"  className="h-10 w-28 text-5xl"/>
            <CircularProgress color="inherit"  className="h-10 w-28 text-5xl"/>
            <CircularProgress color="inherit"  className="h-10 w-28 text-5xl"/>
      
          </Backdrop>
    <div className="min-h-screen mt-20">
      <ToastContainer position="top-center" autoClose={3000} />
      <div id="recaptcha-container"></div>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Swap
            </span>
            -Simple
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label value="Your password" />
              <TextInput
                type={open ? "text" : "password"}
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
              {open ? (
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer">
                  <FaEyeSlash
                    onClick={toggle}
                    className="mt-5 text-2xl font-bold hover:text-black-500 hover:scale-150"
                  />
                </div>
              ) : (
                <div className="mt-2.5 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer">
                  <FaEye
                    onClick={toggle}
                    className="text-2xl hover:text-black-500 hover:scale-150"
                  />
                </div>
              )}
            </div>

            <Label>Verify your phone number</Label>
            <PhoneInput
              country={"in"}
              value={ph}
              onChange={setPh}
              className="text-slate-950"
            />

            {/* OTP input section */}
            {showOTP && (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  separator={<span></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    width: "2rem",
                    height: "2rem",
                    margin: "rem",
                    fontSize: "2rem",
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 0, 0, 1)",
                  }}
                  className="mx-auto text-red-700   rounded-lg  "
                />

                <button
                  type="button"
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading1 && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            )}

            {/* Submit button */}
            {showSignUp && (
              <>
                <Button
                  gradientDuoTone="purpleToPink"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </>
            )}

            {showSend && (
              <>
                <Button
                  gradientDuoTone="purpleToPink"
                  type="button"
                  onClick={onSignup}
                  disabled={loading1}
                >
                  {loading1 && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </Button>
              </>
            )}

            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
