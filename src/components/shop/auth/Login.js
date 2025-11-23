import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { useSnackbar } from "notistack";
import OTPVerification from "./OTPVerification";

const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
  });

  const [otpStep, setOtpStep] = useState(false);
  const [userId, setUserId] = useState(null);

  const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
        
        // Show notification for email verification needed
        if (responseData.needVerification) {
          enqueueSnackbar(responseData.error, {
            variant: "warning",
            autoHideDuration: 5000,
          });
        }
      } else if (responseData.requireOTP) {
        // OTP required - show OTP input
        setData({ ...data, loading: false, error: false });
        setUserId(responseData.userId);
        setOtpStep(true);
        enqueueSnackbar(responseData.success, {
          variant: "info",
          autoHideDuration: 4000,
        });
      } else if (responseData.token) {
        // Direct login (no OTP) - shouldn't happen with new flow
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        enqueueSnackbar("Login Completed Successfully..!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
    } catch (error) {
      console.log(error);
      setData({ ...data, loading: false });
      enqueueSnackbar("Something went wrong. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleOTPVerifySuccess = () => {
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const handleCancelOTP = () => {
    setOtpStep(false);
    setUserId(null);
    setData({ email: "", password: "", loading: false, error: false });
  };

  // If OTP step, show OTP verification component
  if (otpStep) {
    return (
      <OTPVerification
        userId={userId}
        onVerifySuccess={handleOTPVerifySuccess}
        onCancel={handleCancelOTP}
      />
    );
  }

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Login</div>
      {layoutData.loginSignupError ? (
        <div className="bg-red-200 py-2 px-4 rounded">
          You need to login for checkout. Haven't account? Create new one.
        </div>
      ) : (
        ""
      )}
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            Username or email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="text"
            id="name"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, password: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.password}
            type="password"
            id="password"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-gray-600" href="/">
            Lost your password?
          </a>
        </div>
        <div
          onClick={(e) => formSubmit()}
          style={{ background: "#303031" }}
          className={`font-medium px-4 py-2 text-white text-center cursor-pointer ${
            data.loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {data.loading ? "Loading..." : "Login"}
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
