import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase-config";

import "../styles/Chat.css";

export const Chat = (props) => {
  const { roomId } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messsagesCollectionRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messsagesCollectionRef,
      where("room", "==", roomId),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      console.log("Messages updated:", messages);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      return; // Prevent sending empty messages
    }
    // Logic to send the message to Firestore
    await addDoc(messsagesCollectionRef, {
      text: newMessage,
      createdAt: new serverTimestamp(),
      user: auth.currentUser.displayName,
      room: roomId,
    });

    setNewMessage(""); // Clear the input field after sending the message
    console.log("Message sent:", newMessage);
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to {roomId.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          className="new-message-input"
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
