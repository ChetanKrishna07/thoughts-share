import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";

import Cookies from "universal-cookie";
import { useRef } from "react";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase-config";

const cookies = new Cookies();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    cookies.get("auth-token")
  );
  const [roomId, setRoomId] = useState(null);
  const roomInputRef = useRef(null);
  console.log("Current Auth Token:", isAuthenticated);
  
  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuthenticated(null);
      setRoomId(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <>
      {!isAuthenticated ? (
        <Auth setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <h1>Authenticated</h1>
      )}
    </>
  );
};

export default App;
