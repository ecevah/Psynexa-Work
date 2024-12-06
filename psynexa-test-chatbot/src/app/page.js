"use client";
import React, { useState, useEffect } from "react";
import ChatBot from "@/components/chatbot/chatbot";
import { Sidebar } from "@/components/chatbot/sidebar";
import axios from "axios";
import Login from "@/components/login/login";
import { HOST_NAME } from "@/config/config";
import Register from "@/components/register/register";
import Image from "next/image";

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [token, setToken] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [clientName, setClientName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("clientId");
    localStorage.removeItem("clientName");

    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedClientId = localStorage.getItem("clientId");
      const storedClientName = localStorage.getItem("clientName");

      if (storedToken && storedClientId) {
        setToken(storedToken);
        setClientId(storedClientId);
        setClientName(storedClientName);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  useEffect(() => {
    const authenticate = async () => {
      if (token && clientId) {
        try {
          const response = await axios.get(`${HOST_NAME}/protected`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status) {
            setIsAuthenticated(true);
            await fetchSessions(clientId, token);
            if (!currentSessionId) {
              await addNewSession();
            }
          } else {
            throw new Error("Invalid token");
          }
        } catch (error) {
          console.error("Token is invalid or expired", error);
          localStorage.clear();
          setToken(null);
          setClientId(null);
          setClientName("");
          setIsAuthenticated(false);
        }
      }
    };

    authenticate();
  }, [token, clientId]);

  const fetchSessions = async (clientId, token) => {
    try {
      const response = await axios.get(
        `${HOST_NAME}/sessions/client/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        const sessionsData = response.data.data.map((session) => ({
          id: session._id,
          backendSessionId: session._id,
          name: session.Title || "Yeni Sohbet",
          messages: [],
        }));

        setSessions(sessionsData);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const addNewSession = async () => {
    try {
      const response = await axios.post(
        `${HOST_NAME}/session`,
        {
          Client_ID: clientId,
          Device: "web",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        const newBackendSessionId = response.data.data._id;
        const newSession = {
          id: newBackendSessionId,
          backendSessionId: newBackendSessionId,
          name: "Yeni Sohbet",
          messages: [],
        };
        setSessions((prevSessions) => [newSession, ...prevSessions]);
        setCurrentSessionId(newBackendSessionId);
      } else {
        console.error("Failed to create a new session");
      }
    } catch (error) {
      console.error("Error adding new session:", error);
    }
  };

  const clearAllSessions = async () => {
    for (const session of sessions) {
      if (session.backendSessionId) {
        try {
          await axios.delete(
            `${HOST_NAME}/session/${session.backendSessionId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error(
            `Error deleting session ${session.backendSessionId}:`,
            error
          );
        }
      }
    }

    await addNewSession();
  };

  const deleteSession = async (sessionId) => {
    const sessionToDelete = sessions.find((s) => s.id === sessionId);
    if (sessionToDelete && sessionToDelete.backendSessionId) {
      try {
        await axios.delete(
          `${HOST_NAME}/session/${sessionToDelete.backendSessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(
          `Error deleting session ${sessionToDelete.backendSessionId}:`,
          error
        );
      }
    }

    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.filter(
        (session) => session.id !== sessionId
      );

      if (updatedSessions.length === 0) {
        addNewSession();
        return [];
      } else {
        if (sessionId === currentSessionId) {
          setCurrentSessionId(updatedSessions[0].id);
        }
        return updatedSessions;
      }
    });
  };

  const endSession = async (session_id, client_id) => {
    if (!session_id || !client_id || !token) return;
    const payload = { session_id, client_id };

    // fetch ile istek atarken keepalive: true kullanıyoruz.
    // Bu sayede sayfa kapanırken bile istek gönderilmeye çalışılır.
    try {
      await fetch(`${HOST_NAME}/end_session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token'ı ekliyoruz
        },
        body: JSON.stringify(payload),
        keepalive: true, // Sayfa kapansa bile isteğin gönderilmeye çalışmasını sağlar
      });
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  const handleLogout = async () => {
    // Çıkış yaparken end_session'i tetikle
    await endSession(currentSessionId, clientId);

    localStorage.clear();
    setToken(null);
    setClientId(null);
    setClientName("");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleBeforeUnload = () => {
        endSession(currentSessionId, clientId);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [currentSessionId, clientId, token]);

  return (
    <>
      {isAuthenticated === null ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <div className="loader mb-[10px]"></div>
          <Image src="/logo.svg" width={200} height={80} alt="logo" />
        </div>
      ) : isAuthenticated ? (
        <div className="w-full h-screen bg-[#F3F6FB] flex flex-row md1368:flex-col justify-start items-start p-4 relative">
          <Sidebar
            sessions={sessions}
            currentSessionId={currentSessionId}
            setCurrentSessionId={setCurrentSessionId}
            addNewSession={addNewSession}
            clearAllSessions={clearAllSessions}
            deleteSession={deleteSession}
            clientName={clientName}
            onLogout={handleLogout}
          />
          <div className="flex-1 h-full w-full">
            {currentSessionId && token && clientId && (
              <ChatBot
                sessions={sessions}
                setSessions={setSessions}
                currentSessionId={currentSessionId}
                token={token}
                clientId={clientId}
                clientName={clientName}
              />
            )}
          </div>
        </div>
      ) : showLogin ? (
        <Login
          setToken={setToken}
          setClientId={setClientId}
          setClientName={setClientName}
          setShowLogin={setShowLogin}
        />
      ) : (
        <Register
          setToken={setToken}
          setClientId={setClientId}
          setClientName={setClientName}
          setShowLogin={setShowLogin}
        />
      )}
    </>
  );
}
