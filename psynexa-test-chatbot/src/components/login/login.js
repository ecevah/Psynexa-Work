// components/login/login.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { HOST_NAME } from "@/config/config";
import Image from "next/image";
import { LOGO } from "@/config/svg";

const Login = ({
  setToken,
  setClientId,
  setClientName,
  setShowLogin, // Receive the function to toggle to Register
}) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${HOST_NAME}/login`, {
        mail,
        password,
      });

      if (response.data.status) {
        const { access_token, client_id, name } = response.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("clientId", client_id);
        localStorage.setItem("clientName", name);
        setToken(access_token);
        setClientId(client_id);
        setClientName(name);
      } else {
        alert("Giriş başarısız: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Giriş sırasında bir hata oluştu.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-[100dvh]">
        <Image
          src={LOGO}
          width={200}
          height={100}
          className="mx-auto mb-[20px]"
          alt="logo"
        />
        <div className="login-container">
          <h2>Giriş Yap</h2>
          <input
            type="text"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="E-posta"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
          />
          <div className="text-center mb-[10px] text-red-600">{error}</div>
          <button onClick={handleLogin}>Giriş Yap</button>
          <p>
            Henüz hesabınız yok mu?{" "}
            <span onClick={() => setShowLogin(false)} className="link">
              Kayıt Ol
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
