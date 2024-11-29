// pages/index.js (or app/page.js, depending on your setup)
"use client";
import React, { useState, useEffect } from "react";
import ChatBot from "@/components/chatbot/chatbot";
import { Sidebar } from "@/components/chatbot/sidebar";
import axios from "axios";
import Login from "@/components/login/login";
import { HOST_NAME } from "@/config/config";
import Register from "@/components/register/register";

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [clientId, setClientId] = useState(
    typeof window !== "undefined" ? localStorage.getItem("clientId") : null
  );
  const [clientName, setClientName] = useState(
    typeof window !== "undefined" ? localStorage.getItem("clientName") : ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (token && clientId) {
      // Verify the token
      axios
        .get(`${HOST_NAME}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsAuthenticated(true);
          fetchSessions(clientId, token);
        })
        .catch((error) => {
          console.error("Token is invalid or expired", error);
          localStorage.clear();
          setToken(null);
          setClientId(null);
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
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
          id: Date.now() + Math.random(),
          backendSessionId: session._id,
          name: session.Title || "Yeni Sohbet",
          messages: [],
        }));

        setSessions(sessionsData);

        if (sessionsData.length > 0) {
          setCurrentSessionId(sessionsData[0].id);
        } else {
          addNewSession();
        }
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const addNewSession = () => {
    const newSessionId = Date.now() + Math.random();
    const newSession = {
      id: newSessionId,
      name: "Yeni Sohbet",
      messages: [],
      backendSessionId: null,
    };
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newSessionId);
  };

  const clearAllSessions = async () => {
    for (const session of sessions) {
      if (session.backendSessionId) {
        await axios.delete(`${HOST_NAME}/session/${session.backendSessionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    const newSession = {
      id: Date.now() + Math.random(),
      name: "Yeni Sohbet",
      messages: [],
      backendSessionId: null,
    };
    setSessions([newSession]);
    setCurrentSessionId(newSession.id);
  };

  const deleteSession = async (sessionId) => {
    const sessionToDelete = sessions.find((s) => s.id === sessionId);
    if (sessionToDelete && sessionToDelete.backendSessionId) {
      await axios.delete(
        `${HOST_NAME}/session/${sessionToDelete.backendSessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.filter(
        (session) => session.id !== sessionId
      );

      if (updatedSessions.length === 0) {
        const newSession = {
          id: Date.now() + Math.random(),
          name: "Yeni Sohbet",
          messages: [],
          backendSessionId: null,
        };
        setCurrentSessionId(newSession.id);
        return [newSession];
      } else {
        return updatedSessions;
      }
    });

    setCurrentSessionId((prevCurrentSessionId) => {
      if (prevCurrentSessionId === sessionId) {
        if (sessions.length > 0) {
          return sessions[0].id;
        } else {
          return null;
        }
      } else {
        return prevCurrentSessionId;
      }
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setClientId(null);
    setClientName("");
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="w-full h-[100vh] bg-[#F3F6FB] flex flex-row md1368:flex-col justify-start items-start p-[15px] relative">
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
          setShowLogin={setShowLogin} // Pass the function to toggle to Register
        />
      ) : (
        <Register
          setToken={setToken}
          setClientId={setClientId}
          setClientName={setClientName}
          setShowLogin={setShowLogin} // Pass the function to toggle back to Login
        />
      )}
    </>
  );
}
