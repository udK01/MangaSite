import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { useContext, useState } from "react";

import UserContext from "../UserContext";
import axios from "axios";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { setUser, setLoginRequest } = useContext(UserContext);
  const [username, setUsername] = useState("Username");
  const [password, setPassword] = useState("Password");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function toggleSignedIn() {
    setKeepSignedIn(!keepSignedIn);
  }

  function customInputField(type, placeholder, value, func, mt = 0) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const commonProps = {
      placeholder: placeholder,
      value: value,
      onChange: (e) => func(e.target.value),
      onFocus: (e) => {
        if (e.target.value === placeholder) {
          func("");
        }
      },
      onBlur: (e) => {
        if (e.target.value === "") {
          func(placeholder);
        }
      },
      className: `w-full min-h-[34px] px-4 mt-${mt} rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary`,
    };

    return (
      <div className="relative">
        <input
          {...commonProps}
          type={type === "password" && showPassword ? "text" : type}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer outline-none"
          >
            {showPassword ? (
              <FaEye className="mt-[5px]" />
            ) : (
              <FaEyeSlash className="mt-[5px]" />
            )}
          </button>
        )}
      </div>
    );
  }

  function handleLogin() {
    if (username === "Username" || password === "Password") {
      setErrorMessage(`You must fill in all fields!`);
      return null;
    }

    axios
      .post(
        "/api/login",
        {
          username: username,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        switch (response.data) {
          case "2":
            setErrorMessage(`Wrong username or password!`);
            break;
          default:
            setUser(response.data);
            keepSignedIn &&
              localStorage.setItem(
                "username",
                JSON.stringify(response.data[0].username)
              );
            setLoginRequest(false);
            navigate("/");
        }
      })
      .catch((error) => console.error(`Failed to login:`, error));
  }

  return (
    <section className="w-auto h-auto min-w-[400px] min-h-[300px] max-w-[800px] max-h-[600px] flex justify-center border-2 border-primary font-poppins py-1 bg-quaternary rounded-sm">
      <div className="flex flex-col justify-center mx-4 text-white items-center">
        <div className="text-[20px]">Please login.</div>
        <div className="text-red-500 text-[14px] mt-1">{errorMessage}</div>
        {customInputField("text", "Username", username, setUsername, 2)}
        {customInputField("password", "Password", password, setPassword, 2)}
        <div className="w-full ml-4 mt-2 text-[12px]">
          <label
            htmlFor="stayLoggedIn"
            className="cursor-pointer flex items-center"
          >
            <input
              type="checkbox"
              id="stayLoggedIn"
              onChange={toggleSignedIn}
            />
            <span className="ml-2 text-sm text-dimWhite">
              Keep me signed in.
            </span>
          </label>
        </div>
        <div className="w-[250px] mt-3 flex justify-between items-center text-white">
          <button
            className="flex items-center bg-quinary p-1 pr-3 rounded-md hover:bg-primary"
            onClick={() => {
              navigate("/register");
              setLoginRequest(false);
            }}
          >
            {<FaAngleLeft />}Register
          </button>
          <button
            className="bg-primary p-1 px-2 rounded-md hover:bg-purple-700"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
