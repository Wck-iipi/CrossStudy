
import React from "react";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";

// EVERY MESSAGE MUST BE FROM USER OR BOT
export interface Message {
  text: string;
  sender: "user" | "bot";
}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
};

export default App;
