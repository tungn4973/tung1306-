import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const apiURL = process.env.REACT_APP_API_URL;

const OTPVerification = ({ userId, onVerifySuccess, onCancel }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const { enqueueSnackbar } = useSnackbar();

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      enqueueSnackbar("Please enter a valid 6-digit OTP", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiURL}/api/verify-otp`, {
        userId,
        otp,
      });

      if (res.data.token) {
        localStorage.setItem("jwt", JSON.stringify(res.data));
        enqueueSnackbar("Login Successful!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        onVerifySuccess();
      } else if (res.data.error) {
        enqueueSnackbar(res.data.error, {
          variant: "error",
        });
        setOtp("");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiURL}/api/resend-otp`, {
        userId,
      });

      if (res.data.success) {
        enqueueSnackbar(res.data.success, {
          variant: "success",
        });
        setTimeLeft(300); // Reset timer
        setOtp("");
      } else if (res.data.error) {
        enqueueSnackbar(res.data.error, {
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Failed to resend OTP. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Enter OTP</div>
      
      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <p className="text-sm text-blue-800">
          We've sent a 6-digit verification code to your email. Please check your inbox and enter the code below.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="otp" className="mb-2 font-medium">
            OTP Code<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={handleOtpChange}
            value={otp}
            type="text"
            id="otp"
            maxLength="6"
            placeholder="000000"
            className="px-4 py-3 focus:outline-none border text-center text-2xl tracking-widest font-mono"
            disabled={loading || timeLeft <= 0}
          />
          <div className="mt-2 text-center">
            {timeLeft > 0 ? (
              <span className="text-sm text-gray-600">
                Code expires in: <span className="font-semibold text-red-600">{formatTime(timeLeft)}</span>
              </span>
            ) : (
              <span className="text-sm text-red-600 font-semibold">
                OTP has expired. Please resend.
              </span>
            )}
          </div>
        </div>

        <div
          onClick={handleVerifyOTP}
          style={{ background: "#303031" }}
          className={`font-medium px-4 py-2 text-white text-center cursor-pointer ${
            loading || !otp || otp.length !== 6 || timeLeft <= 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <button
            onClick={handleResendOTP}
            disabled={loading || timeLeft > 240} // Can resend after 1 minute
            className={`text-sm text-blue-600 hover:text-blue-800 ${
              loading || timeLeft > 240 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Resend OTP
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Back to Login
          </button>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
          <p className="mb-1">📧 Didn't receive the code?</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Check your spam/junk folder</li>
            <li>Wait a few moments for the email to arrive</li>
            <li>Click "Resend OTP" to get a new code</li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default OTPVerification;
