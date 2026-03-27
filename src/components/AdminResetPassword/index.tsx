"use client";
import axios from "axios";
import { useState } from "react";

export const AdminResetPassword = () => {
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    setMessage("");
    const emailInput = document.getElementById("field-email") as HTMLInputElement;
    if (emailInput) {
      const email = emailInput.value;
      try {
        const res = await axios.post("/next/reset-password", { email, collection: "administrators" });
        if (res.status === 200) {
          setMessage("Password reset email sent successfully.");
        }
      } catch {
        setMessage("Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <div className="twp">
      <a onClick={handleResetPassword} className="cursor-pointer text-foreground">
        Reset Password
      </a>
      <p className="mt-3 text-foreground opacity-85">{message}</p>
    </div>
  );
};

