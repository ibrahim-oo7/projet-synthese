import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    site_name: "FormInnova",
    admin_email: "",
  });

  // 📥 fetch settings from DB
  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      setSettings(res.data || {});
    } catch (err) {
      console.error("Settings fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);