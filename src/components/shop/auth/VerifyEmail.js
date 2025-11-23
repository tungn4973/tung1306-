import React, { Fragment, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const apiURL = process.env.REACT_APP_API_URL;

const VerifyEmail = () => {
  const { token } = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${apiURL}/api/verify-email/${token}`);
        
        if (res.data.success) {
          setStatus("success");
          enqueueSnackbar(res.data.success, {
            variant: "success",
            autoHideDuration: 3000,
          });
          
          // Redirect to home after 3 seconds
          setTimeout(() => {
            history.push("/");
          }, 3000);
        } else if (res.data.error) {
          setStatus("error");
          enqueueSnackbar(res.data.error, {
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      } catch (error) {
        console.log(error);
        setStatus("error");
        enqueueSnackbar("Something went wrong. Please try again.", {
          variant: "error",
        });
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, enqueueSnackbar, history]);

  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Email Verification
            </h2>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8">
            {status === "verifying" && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Verifying your email...</p>
              </div>
            )}
            
            {status === "success" && (
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Email Verified Successfully!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your email has been verified. You can now login to your account.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to home page...
                </p>
              </div>
            )}
            
            {status === "error" && (
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16 text-red-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Verification Failed
                </h3>
                <p className="text-gray-600 mb-4">
                  The verification link is invalid or has expired.
                </p>
                <button
                  onClick={() => history.push("/")}
                  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
                >
                  Go to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyEmail;
