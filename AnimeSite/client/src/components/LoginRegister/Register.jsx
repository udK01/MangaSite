import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { useState } from "react";

import axios from "axios";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("Username");
  const [password, setPassword] = useState("Password");
  const [passwordConfirm, setPasswordConfirm] = useState("Password");
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  function validatePassword() {
    if (password !== passwordConfirm) {
      setPasswordError("Passwords do not match!");
      return false;
    }

    if (password.length <= 8) {
      setPasswordError("Password must be longer than 8 characters!");
      return false;
    }

    if (!/(?=.*\d)(?=.*[A-Z])/.test(password)) {
      setPasswordError(
        "Password must include at least one digit and one uppercase letter."
      );
      return false;
    }

    return true;
  }

  function handleRegister() {
    setUsernameError("");
    setPasswordError("");

    if (username === `Username` || password === `Password`) {
      setUsernameError(`You must fill in all fields!`);
      return null;
    }

    if (!validatePassword()) {
      return null;
    }

    axios
      .post(
        "/api/createUser",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) =>
        response.data.length > 0
          ? setUsernameError(response.data)
          : navigate("/login")
      )
      .catch((error) => console.error(`Failed to create user:`, error));
  }

  return (
    <section className="w-auto h-auto min-w-[400px] min-h-[300px] max-w-[800px] max-h-[600px] flex justify-center border-2 border-primary font-poppins py-1 bg-quaternary rounded-sm">
      <div className="flex flex-col justify-center mx-4 text-white items-center">
        <div className="text-[20px]">Register an account.</div>
        {customInputField("text", "Username", username, setUsername, 2)}
        <div className="text-red-500 text-[14px] mt-1">{usernameError}</div>
        {customInputField("password", "Password", password, setPassword, 2)}
        <div className="text-red-500 text-[14px] mt-1">{passwordError}</div>
        {customInputField(
          "password",
          "Password",
          passwordConfirm,
          setPasswordConfirm,
          2
        )}
        <div className="w-[250px] mt-3 flex justify-between items-center text-white">
          <button
            className="flex items-center bg-quinary p-1 pr-3 rounded-md hover:bg-primary"
            onClick={() => navigate("/login")}
          >
            {<FaAngleLeft />}Login
          </button>
          <button
            className="bg-primary p-1 px-2 rounded-md hover:bg-purple-700"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
}
