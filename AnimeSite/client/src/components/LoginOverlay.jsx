import React, { useContext, useEffect } from "react";
import Login from "./LoginRegister/Login";
import UserContext from "./UserContext";

const LoginOverlay = () => {
  const { setLoginRequest } = useContext(UserContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLoginRequest(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-poppins">
        <div
          className="absolute hover:text-primary hover:cursor-pointer translate-x-48 -translate-y-32 flex justify-end mr-8 text-[32px]"
          onClick={() => setLoginRequest(false)}
        >
          x
        </div>
        <Login />
      </div>
    </>
  );
};

export default LoginOverlay;
