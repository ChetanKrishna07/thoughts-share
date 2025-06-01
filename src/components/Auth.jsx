import { useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "../styles/Auth.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuthenticated } = props;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valError, setValError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inValidPassword, setInValidPassword] = useState(false);

  const handleDefaultLogin = async (e) => {
    e.preventDefault();
    setValError(false);
    setEmailError(false);
    setInValidPassword(false);
    console.log("Default login clicked");
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      !email.includes("@") ||
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      setValError(username === "" || email === "" || password === "");
      setEmailError(!email.includes("@"));
      setInValidPassword(
        password.length < 6 ||
          !/\d/.test(password) ||
          !/[a-zA-Z]/.test(password)
      );
    } else {
      try {
        console.log("Creating user with email and password...");
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User created successfully:", result.user);
        result.user.displayName = username; // Set the username
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuthenticated(result.user.refreshToken);
      } catch (error) {
        console.error("Error creating user:", error);
        if (error.code === "auth/email-already-in-use") {
          alert("Email already in use. Please try logging in.");
        } else {
          alert("Error creating account. Please try again.");
        }
      }
    }
  };

  const signInWithGoogle = async () => {
    // Logic for signing in with Google
    try {
      console.log("Signing in with Google...");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Sign in result:", result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuthenticated(result.user.refreshToken);
      console.log("User signed in successfully:", result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2>Sign Up</h2>
      <form
        onSubmit={handleDefaultLogin}
        className="flex flex-col justify-center items-center"
      >
        <div className="my-4 flex flex-col gap-3">
          <label>
            Username <br />
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
          <label>
            Email <br />
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label>
            Password <br />
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        {valError && (
          <div className="text-red-500 flex">
            Please enter all the details to sign up.
          </div>
        )}
        {emailError && (
          <div className="text-red-500 flex">
            Please enter a valid email address.
          </div>
        )}
        {inValidPassword && (
          <div className="text-red-500 flex">
            Password must be at least 6 characters long, and contain at least
            one letter and one number.
          </div>
        )}
        <button className="btn my-3" type="submit">
          Sign Up
        </button>
      </form>
      <div className="my-4 flex gap-5">
        <FcGoogle className="login-icon-btn" onClick={signInWithGoogle} />
        <FaGithub
          className="login-icon-btn"
          onClick={() => alert("GitHub login not implemented yet")}
        />
        <FaSquareXTwitter
          className="login-icon-btn"
          onClick={() => alert("Twitter login not implemented yet")}
        />
      </div>
    </div>
  );
};
