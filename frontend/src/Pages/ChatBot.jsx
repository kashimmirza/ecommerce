/** @format */

import React, { useState } from "react";
import { Box, TextField, IconButton, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const ChatBot = () => {
 const [messages, setMessages] = useState([
  { from: "bot", text: "Hi! How can I assist you today?" },
 ]);
 const [input, setInput] = useState("");
 const [loading, setLoading] = useState(false);

 const handleSend = async () => {
  if (!input.trim()) return;
  const userMessage = { from: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
   const response = await axios.post("/api/chat", { message: input });
   const botReply = { from: "bot", text: response.data.reply };
   setMessages((prev) => [...prev, botReply]);
  } catch (error) {
   setMessages((prev) => [
    ...prev,
    { from: "bot", text: "Sorry, something went wrong." },
   ]);
  } finally {
   setLoading(false);
  }
 };

 return (
  <Paper
   elevation={3}
   sx={{
    position: "fixed",
    bottom: 80,
    right: 20,
    width: 300,
    maxHeight: 400,
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
   }}
  >
   <Box sx={{ p: 2, overflowY: "auto", flexGrow: 1 }}>
    {messages.map((msg, idx) => (
     <Typography
      key={idx}
      align={msg.from === "user" ? "right" : "left"}
      sx={{
       mb: 1,
       backgroundColor: msg.from === "user" ? "#e0f7fa" : "#f1f8e9",
       p: 1,
       borderRadius: 1,
      }}
     >
      {msg.text}
     </Typography>
    ))}
   </Box>
   <Box sx={{ display: "flex", p: 1, borderTop: "1px solid #ccc" }}>
    <TextField
     fullWidth
     size="small"
     variant="outlined"
     value={input}
     onChange={(e) => setInput(e.target.value)}
     onKeyDown={(e) => {
      if (e.key === "Enter") handleSend();
     }}
     disabled={loading}
    />
    <IconButton onClick={handleSend} disabled={loading}>
     <SendIcon />
    </IconButton>
   </Box>
  </Paper>
 );
};

export default ChatBot;
