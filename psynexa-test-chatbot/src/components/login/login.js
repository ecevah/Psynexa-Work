// components/login/login.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { HOST_NAME } from "@/config/config";
import Image from "next/image";
import { LOGO } from "@/config/svg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = ({ setToken, setClientId, setClientName, setShowLogin }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
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
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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
        <div className="login-container" onKeyDown={handleKeyDown}>
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
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`flex items-center justify-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0A6EBD]"
            } text-white rounded-full px-4 py-2`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters
                className="animate-spin text-white"
                size={20}
              />
            ) : (
              "Giriş Yap"
            )}
          </button>
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
