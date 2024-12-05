// components/register/register.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { HOST_NAME } from "@/config/config";
import Image from "next/image";
import { LOGO } from "@/config/svg";

const Register = ({ setToken, setClientId, setClientName, setShowLogin }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState(""); // If needed
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await axios.post(`${HOST_NAME}/register`, {
        name,
        mail,
        username,
        language: "Turkish",
        password,
      });

      if (response.data.status) {
        await handleLogin();
      } else {
        setError("Kayıt başarısız");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Kayıt sırasında bir hata oluştu.");
    }
  };

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
        setError("Login failed after registration");
      }
    } catch (error) {
      console.error("Error during login after registration:", error);
      setError("Login failed after registration");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100dvh]">
      <Image
        src={LOGO}
        width={200}
        height={100}
        className="mx-auto mb-[20px]"
        alt="logo"
      />
      <div className="register-container">
        {/* Your register form here */}
        <h2>Kayıt Ol</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="İsim"
        />
        <input
          type="text"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="E-posta"
        />
        {/* Include username field if required */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı Adı"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Şifre Tekrar"
        />
        <div className="text-center mb-[10px] text-red-600">{error}</div>
        <button onClick={handleRegister}>Kayıt Ol</button>
        <p>
          Zaten hesabınız var mı?{" "}
          <span onClick={() => setShowLogin(true)} className="link">
            Giriş Yap
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
